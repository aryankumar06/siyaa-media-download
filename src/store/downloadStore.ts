import { create } from 'zustand';
import type {
  DownloadFormat,
  DownloadItem,
  RecommendedVideo,
  Toast,
  VideoCategory,
} from '@/types';
import { fetchMetadata, requestDownload } from '@/services/api';

const STORAGE_KEY = 'universal_yt_downloads_v1';

function loadPersistedItems(): DownloadItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore error
  }
  return [];
}

function savePersistedItems(items: DownloadItem[]) {
  try {
    // Save items, omit large blob references from localStorage
    const storable = items.map((i) => ({
      ...i,
      fileBlobUrl: null,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storable));
  } catch {
    // Ignore error
  }
}

let idCounter = 0;
const nextId = () => `dl-${++idCounter}-${Date.now()}`;

interface DownloadStore {
  items: DownloadItem[];
  toasts: Toast[];
  selectedFormat: DownloadFormat;
  selectedQuality: string;
  selectedCategory: VideoCategory;
  isProcessing: boolean;
  activePlayingItem: DownloadItem | RecommendedVideo | null;
  activeTab: 'downloader' | 'recommendations' | 'library';

  setSelectedFormat: (format: DownloadFormat) => void;
  setSelectedQuality: (quality: string) => void;
  setSelectedCategory: (category: VideoCategory) => void;
  setActiveTab: (tab: 'downloader' | 'recommendations' | 'library') => void;
  setActivePlayingItem: (item: DownloadItem | RecommendedVideo | null) => void;

  addDownload: (url: string, format?: DownloadFormat, quality?: string) => Promise<string>;
  quickDownloadRecommendation: (video: RecommendedVideo) => void;
  removeDownload: (id: string) => void;
  clearCompleted: () => void;
  addToast: (message: string, type: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

export const useDownloadStore = create<DownloadStore>((set, get) => ({
  items: loadPersistedItems(),
  toasts: [],
  selectedFormat: 'video',
  selectedQuality: '1080p',
  selectedCategory: 'All',
  isProcessing: false,
  activePlayingItem: null,
  activeTab: 'downloader',

  setSelectedFormat: (format) => {
    const defaultQuality = format === 'video' ? '1080p' : '320kbps';
    set({ selectedFormat: format, selectedQuality: defaultQuality });
  },
  setSelectedQuality: (quality) => set({ selectedQuality: quality }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActivePlayingItem: (item) => set({ activePlayingItem: item }),

  addDownload: async (url: string, customFormat?: DownloadFormat, customQuality?: string) => {
    const format = customFormat ?? get().selectedFormat;
    const quality = customQuality ?? get().selectedQuality;
    const id = nextId();

    const item: DownloadItem = {
      id,
      url,
      title: null,
      thumbnail: null,
      author: null,
      duration: null,
      format,
      quality,
      status: 'fetching',
      progress: 0,
      errorMessage: null,
      createdAt: Date.now(),
    };

    set((state) => {
      const nextItems = [item, ...state.items];
      savePersistedItems(nextItems);
      return { items: nextItems, isProcessing: true };
    });

    void processDownload(id, url, format, quality, set, get);
    return id;
  },

  quickDownloadRecommendation: (video: RecommendedVideo) => {
    const format = get().selectedFormat;
    const quality = get().selectedQuality;
    const id = nextId();

    const item: DownloadItem = {
      id,
      url: video.url,
      title: video.title,
      thumbnail: video.thumbnail,
      author: video.author,
      duration: video.duration,
      category: video.category,
      format,
      quality,
      status: 'fetching',
      progress: 0,
      errorMessage: null,
      createdAt: Date.now(),
    };

    set((state) => {
      const nextItems = [item, ...state.items];
      savePersistedItems(nextItems);
      return {
        items: nextItems,
        isProcessing: true,
        activeTab: 'downloader', // switch to downloader to see progress
      };
    });

    get().addToast(`Added "${video.title.slice(0, 30)}..." to queue`, 'info');
    void processDownloadWithMetadata(id, video.url, format, quality, video, set, get);
  },

  removeDownload: (id) =>
    set((state) => {
      const nextItems = state.items.filter((i) => i.id !== id);
      savePersistedItems(nextItems);
      return { items: nextItems };
    }),

  clearCompleted: () =>
    set((state) => {
      const nextItems = state.items.filter(
        (i) => i.status !== 'success' && i.status !== 'error',
      );
      savePersistedItems(nextItems);
      return { items: nextItems };
    }),

  addToast: (message, type) => {
    const id = nextId();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => get().dismissToast(id), 4000);
  },

  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

type SetFn = (
  partial:
    | Partial<DownloadStore>
    | ((state: DownloadStore) => Partial<DownloadStore>),
) => void;
type GetFn = () => DownloadStore;

async function processDownload(
  id: string,
  url: string,
  format: DownloadFormat,
  quality: string,
  set: SetFn,
  get: GetFn,
) {
  const updateItem = (patch: Partial<DownloadItem>) =>
    set((state) => {
      const nextItems = state.items.map((i) =>
        i.id === id ? { ...i, ...patch } : i,
      );
      savePersistedItems(nextItems);
      return { items: nextItems };
    });

  try {
    // 1. Fetch metadata
    updateItem({ status: 'fetching' });
    const metadata = await fetchMetadata(url);
    updateItem({
      title: metadata.title,
      thumbnail: metadata.thumbnail,
      author: metadata.author,
      duration: metadata.duration,
      category: metadata.category,
    });

    // 2. Download media
    const result = await requestDownload(url, format, quality, metadata, (info) => {
      updateItem({
        status: info.status,
        progress: info.progress,
      });
    });

    // 3. Trigger browser download
    triggerBrowserDownload(result.blob, result.filename);

    updateItem({
      status: 'success',
      progress: 100,
      fileBlobUrl: result.blobUrl,
      fileSize: result.fileSize,
    });

    get().addToast(`"${metadata.title.slice(0, 25)}..." downloaded!`, 'success');
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Something went wrong';
    updateItem({ status: 'error', errorMessage: message });
    get().addToast(message, 'error');
  } finally {
    set({ isProcessing: false });
  }
}

async function processDownloadWithMetadata(
  id: string,
  url: string,
  format: DownloadFormat,
  quality: string,
  video: RecommendedVideo,
  set: SetFn,
  get: GetFn,
) {
  const updateItem = (patch: Partial<DownloadItem>) =>
    set((state) => {
      const nextItems = state.items.map((i) =>
        i.id === id ? { ...i, ...patch } : i,
      );
      savePersistedItems(nextItems);
      return { items: nextItems };
    });

  try {
    const result = await requestDownload(
      url,
      format,
      quality,
      {
        title: video.title,
        thumbnail: video.thumbnail,
        author: video.author,
        duration: video.duration,
        category: video.category,
      },
      (info) => {
        updateItem({
          status: info.status,
          progress: info.progress,
        });
      },
    );

    triggerBrowserDownload(result.blob, result.filename);

    updateItem({
      status: 'success',
      progress: 100,
      fileBlobUrl: result.blobUrl,
      fileSize: result.fileSize,
    });

    get().addToast(`Saved "${video.title.slice(0, 25)}..." to storage`, 'success');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to download';
    updateItem({ status: 'error', errorMessage: message });
    get().addToast(message, 'error');
  } finally {
    set({ isProcessing: false });
  }
}

function triggerBrowserDownload(blob: Blob, filename: string) {
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  } catch {
    // Non-fatal if simulated
  }
}
