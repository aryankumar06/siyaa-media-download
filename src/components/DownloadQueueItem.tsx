import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  CheckCircle2,
  XCircle,
  X,
  Film,
  Music,
  Download,
  Server,
  ArrowDownToLine,
  Play,
  RotateCw,
} from 'lucide-react';
import type { DownloadItem } from '@/types';
import { ProgressBar } from './ProgressBar';
import { useDownloadStore } from '@/store/downloadStore';

interface DownloadQueueItemProps {
  item: DownloadItem;
}

const statusConfig: Record<
  DownloadItem['status'],
  { label: string; icon: typeof Download }
> = {
  idle: { label: 'Queued', icon: Download },
  fetching: { label: 'Resolving YouTube Stream', icon: Loader2 },
  processing: { label: 'Encoding Media Track', icon: Server },
  downloading: { label: 'Saving to Storage', icon: ArrowDownToLine },
  success: { label: 'Downloaded & Ready', icon: CheckCircle2 },
  error: { label: 'Download Failed', icon: XCircle },
};

export function DownloadQueueItem({ item }: DownloadQueueItemProps) {
  const removeDownload = useDownloadStore((s) => s.removeDownload);
  const setActivePlayingItem = useDownloadStore((s) => s.setActivePlayingItem);
  const addDownload = useDownloadStore((s) => s.addDownload);

  const config = statusConfig[item.status];
  const Icon = config.icon;
  const isAnimated = item.status === 'fetching' || item.status === 'processing' || item.status === 'downloading';
  const showProgress =
    item.status === 'processing' ||
    item.status === 'downloading' ||
    item.status === 'success';
  const FormatIcon = item.format === 'video' ? Film : Music;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xs transition-all"
    >
      {/* Thumbnail or Format Icon */}
      <div className="relative flex-shrink-0 mt-0.5 w-16 h-12 rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center border border-neutral-200/60">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title || 'Thumbnail'}
            className="w-full h-full object-cover"
          />
        ) : (
          <FormatIcon size={20} className="text-neutral-500" strokeWidth={2} />
        )}

        {/* Play overlay if completed */}
        {item.status === 'success' && (
          <button
            type="button"
            onClick={() => setActivePlayingItem(item)}
            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            title="Play downloaded media"
          >
            <Play size={16} fill="white" className="ml-0.5" />
          </button>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-neutral-900 truncate">
            {item.title ?? extractDomain(item.url)}
          </p>
          {item.quality && (
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
              {item.quality}
            </span>
          )}
        </div>

        {item.author && (
          <p className="text-xs text-neutral-400 font-medium truncate mt-0.5">
            {item.author} {item.duration ? `• ${item.duration}` : ''}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1.5">
          <Icon
            size={13}
            className={`${isAnimated ? 'animate-spin' : ''} ${
              item.status === 'success'
                ? 'text-emerald-600'
                : item.status === 'error'
                  ? 'text-red-500'
                  : 'text-amber-500'
            }`}
            strokeWidth={2}
          />
          <span
            className={`text-xs font-medium ${
              item.status === 'success'
                ? 'text-emerald-600'
                : item.status === 'error'
                  ? 'text-red-500'
                  : 'text-neutral-600'
            }`}
          >
            {item.status === 'error' && item.errorMessage
              ? item.errorMessage
              : config.label}
          </span>
          {showProgress && item.status !== 'success' && (
            <span className="text-xs text-neutral-400 font-mono">
              {Math.round(item.progress)}%
            </span>
          )}
          {item.fileSize && item.status === 'success' && (
            <span className="text-xs text-neutral-400 font-mono">
              • {item.fileSize}
            </span>
          )}
        </div>

        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <ProgressBar
                progress={item.progress}
                className={`mt-2.5 ${item.status === 'success' ? 'bg-emerald-100' : ''}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-1">
        {item.status === 'success' && (
          <button
            type="button"
            onClick={() => setActivePlayingItem(item)}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-red-600 hover:bg-neutral-100 transition-colors"
            title="Play / Preview"
          >
            <Play size={16} />
          </button>
        )}

        {item.status === 'error' && (
          <button
            type="button"
            onClick={() => {
              removeDownload(item.id);
              addDownload(item.url, item.format, item.quality);
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            title="Retry download"
          >
            <RotateCw size={15} />
          </button>
        )}

        <button
          onClick={() => removeDownload(item.id)}
          className="p-1.5 rounded-lg text-neutral-300 hover:text-neutral-700 hover:bg-neutral-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Remove from queue"
          title="Remove"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}

function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace('www.', '');
  } catch {
    return url;
  }
}
