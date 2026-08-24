export type DownloadFormat = 'video' | 'audio';

export type VideoQuality = '1080p' | '720p' | '480p' | '360p';
export type AudioQuality = '320kbps' | '256kbps' | '128kbps';

export type DownloadStatus =
  | 'idle'
  | 'fetching'
  | 'processing'
  | 'downloading'
  | 'success'
  | 'error';

export interface DownloadItem {
  id: string;
  url: string;
  title: string | null;
  thumbnail: string | null;
  author?: string | null;
  duration?: string | null;
  format: DownloadFormat;
  quality?: string;
  status: DownloadStatus;
  progress: number;
  errorMessage: string | null;
  createdAt: number;
  category?: VideoCategory;
  fileBlobUrl?: string | null;
  fileSize?: string;
}

export type VideoCategory =
  | 'All'
  | 'Music'
  | 'Lo-Fi & Chill'
  | 'Tech & AI'
  | 'Coding'
  | 'Gaming'
  | 'Podcasts'
  | 'Nature & 4K';

export interface RecommendedVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  author: string;
  duration: string;
  views: string;
  category: VideoCategory;
  tags: string[];
  matchReason?: string;
  matchScore?: number;
}

export interface MediaMetadata {
  title: string;
  thumbnail: string;
  author: string;
  duration: string;
  category?: VideoCategory;
  views?: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

