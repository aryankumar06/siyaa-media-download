import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Share2,
  ExternalLink,
  Film,
  Music,
} from 'lucide-react';
import { useDownloadStore } from '@/store/downloadStore';
import { extractYouTubeId } from '@/services/api';

export function MediaPlayerModal() {
  const activeItem = useDownloadStore((s) => s.activePlayingItem);
  const setActivePlayingItem = useDownloadStore((s) => s.setActivePlayingItem);
  const quickDownload = useDownloadStore((s) => s.quickDownloadRecommendation);
  const addToast = useDownloadStore((s) => s.addToast);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (activeItem) {
      setIsPlaying(true);
      setProgress(0);
    }
  }, [activeItem]);

  if (!activeItem) return null;

  const ytId = extractYouTubeId(activeItem.url);
  const isVideo = !('format' in activeItem) || activeItem.format === 'video';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeItem.url);
      addToast('URL copied to clipboard', 'info');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-neutral-800 text-red-500">
                {isVideo ? <Film size={16} /> : <Music size={16} />}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {isVideo ? 'Video Player' : 'Audio Player'}
              </span>
            </div>
            <button
              onClick={() => setActivePlayingItem(null)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Player Media Container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {ytId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                title={activeItem.title || 'YouTube Media Preview'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <img
                  src={activeItem.thumbnail || ''}
                  alt={activeItem.title || 'Media thumbnail'}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-xs"
                />
                <div className="relative z-10 space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                    {isVideo ? <Film size={32} /> : <Music size={32} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white max-w-md line-clamp-1">
                      {activeItem.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {activeItem.author || 'Universal Media Player'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Details & Action Bar */}
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {activeItem.title || 'Universal Media Item'}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
                  <span>{activeItem.author || 'Creator'}</span>
                  <span>•</span>
                  <span>{activeItem.duration || 'Full duration'}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>

                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>Open URL</span>
                </a>

                {'tags' in activeItem && (
                  <button
                    type="button"
                    onClick={() => {
                      quickDownload(activeItem as any);
                      setActivePlayingItem(null);
                    }}
                    className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
