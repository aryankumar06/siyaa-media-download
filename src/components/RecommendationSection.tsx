import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Download,
  Play,
  RotateCw,
  TrendingUp,
  Clock,
  Eye,
  Check,
  Zap,
} from 'lucide-react';
import type { RecommendedVideo, VideoCategory } from '@/types';
import { useDownloadStore } from '@/store/downloadStore';
import { getRecommendedVideos } from '@/services/recommendationEngine';

const CATEGORIES: VideoCategory[] = [
  'All',
  'Lo-Fi & Chill',
  'Music',
  'Tech & AI',
  'Coding',
  'Nature & 4K',
  'Podcasts',
  'Gaming',
];

export function RecommendationSection() {
  const items = useDownloadStore((s) => s.items);
  const selectedCategory = useDownloadStore((s) => s.selectedCategory);
  const setSelectedCategory = useDownloadStore((s) => s.setSelectedCategory);
  const quickDownload = useDownloadStore((s) => s.quickDownloadRecommendation);
  const setActivePlayingItem = useDownloadStore((s) => s.setActivePlayingItem);
  const addToast = useDownloadStore((s) => s.addToast);

  const [refreshKey, setRefreshKey] = useState(0);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const recommendations = useMemo(() => {
    return getRecommendedVideos(items, selectedCategory, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, selectedCategory, refreshKey]);

  const recentDownloadTitle = items.length > 0 ? items[0].title || 'recent downloads' : null;

  const handleDownload = (video: RecommendedVideo) => {
    setDownloadingId(video.id);
    quickDownload(video);
    setTimeout(() => setDownloadingId(null), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              <Sparkles size={12} />
              AI Recommendation Engine
            </span>
            {items.length > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                <Zap size={11} className="text-amber-400" />
                Adaptive to {items.length} download{items.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Recommended For You
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
            {recentDownloadTitle ? (
              <span>
                Personalized suggestions tailored to{' '}
                <strong className="text-white font-semibold">"{recentDownloadTitle.slice(0, 35)}..."</strong>
              </span>
            ) : (
              'Trending videos and popular tracks ready for high-speed download.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <button
            type="button"
            onClick={() => {
              setRefreshKey((k) => k + 1);
              addToast('Refreshed smart recommendations', 'info');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-xs"
          >
            <RotateCw size={13} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {recommendations.map((video, idx) => (
            <motion.div
              key={video.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="group relative flex flex-col justify-between rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all overflow-hidden"
            >
              {/* Card Image Header */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-mono font-medium backdrop-blur-xs flex items-center gap-1">
                  <Clock size={10} />
                  <span>{video.duration}</span>
                </div>

                {/* Category Chip */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-semibold backdrop-blur-xs">
                  {video.category}
                </div>

                {/* Match Score Badge */}
                {video.matchScore && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                    <TrendingUp size={10} />
                    <span>{video.matchScore}% Match</span>
                  </div>
                )}

                {/* Hover Play Action */}
                <button
                  type="button"
                  onClick={() => setActivePlayingItem(video)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-neutral-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 hover:bg-red-600"
                  aria-label="Preview video"
                >
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Match Reason */}
                  {video.matchReason && (
                    <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-500 mb-1 flex items-center gap-1">
                      <span>{video.matchReason}</span>
                    </p>
                  )}

                  <h4 className="text-sm font-bold text-neutral-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 mt-2">
                    <span className="font-medium text-neutral-700">{video.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {video.views}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setActivePlayingItem(video)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-all"
                  >
                    <Play size={13} />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(video)}
                    disabled={downloadingId === video.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-red-600 text-white text-xs font-semibold transition-all shadow-xs"
                  >
                    {downloadingId === video.id ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span>Queued</span>
                      </>
                    ) : (
                      <>
                        <Download size={13} />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
