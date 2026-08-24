import { motion } from 'framer-motion';
import { Film, Music, Sparkles } from 'lucide-react';
import type { DownloadFormat } from '@/types';
import { useDownloadStore } from '@/store/downloadStore';

interface FormatSelectorProps {
  value: DownloadFormat;
  onChange: (format: DownloadFormat) => void;
}

const formatOptions = [
  {
    value: 'video' as DownloadFormat,
    label: 'Video (MP4)',
    icon: Film,
    qualities: [
      { id: '1080p', label: '1080p FHD', badge: 'Best' },
      { id: '720p', label: '720p HD', badge: 'Fast' },
      { id: '480p', label: '480p SD', badge: 'Lite' },
    ],
  },
  {
    value: 'audio' as DownloadFormat,
    label: 'Audio (MP3)',
    icon: Music,
    qualities: [
      { id: '320kbps', label: '320k HQ', badge: 'Studio' },
      { id: '256kbps', label: '256k AAC', badge: 'High' },
      { id: '128kbps', label: '128k Lite', badge: 'Compact' },
    ],
  },
];

export function FormatSelector({ value, onChange }: FormatSelectorProps) {
  const selectedQuality = useDownloadStore((s) => s.selectedQuality);
  const setSelectedQuality = useDownloadStore((s) => s.setSelectedQuality);

  const activeFormatConfig = formatOptions.find((f) => f.value === value)!;

  return (
    <div className="space-y-3">
      {/* Format Toggle */}
      <div className="flex gap-2 p-1.5 bg-neutral-900/5 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200/80">
        {formatOptions.map((opt) => {
          const active = value === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className="relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              {active && (
                <motion.div
                  layoutId="format-pill-bg"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm border border-neutral-200/50"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 transition-colors ${
                  active ? 'text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Icon size={16} strokeWidth={2.2} />
                <span>{opt.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Quality Pills */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1">
          <Sparkles size={12} className="text-amber-500" />
          Quality:
        </span>
        <div className="flex flex-wrap gap-1.5 flex-1">
          {activeFormatConfig.qualities.map((q) => {
            const isSelected = selectedQuality === q.id;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setSelectedQuality(q.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <span>{q.label}</span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded ${
                    isSelected ? 'bg-neutral-800 text-amber-300' : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {q.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
