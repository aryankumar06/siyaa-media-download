import { Clipboard, Sparkles } from 'lucide-react';
import { SAMPLE_MEDIA_URLS } from '@/services/recommendationEngine';

interface QuickPasteBarProps {
  onSelectUrl: (url: string) => void;
}

export function QuickPasteBar({ onSelectUrl }: QuickPasteBarProps) {
  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onSelectUrl(text.trim());
        }
      }
    } catch {
      // Clipboard permissions or not available
    }
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
          <Sparkles size={13} className="text-red-500" />
          <span>Quick Sample Links / Try Now</span>
        </span>
        <button
          type="button"
          onClick={handlePasteClipboard}
          className="text-xs font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors px-2 py-0.5 rounded-md hover:bg-neutral-100"
        >
          <Clipboard size={12} />
          <span>Paste Clipboard</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SAMPLE_MEDIA_URLS.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectUrl(sample.url)}
            className="text-xs bg-white border border-neutral-200/90 hover:border-neutral-400 hover:bg-neutral-50 text-neutral-700 font-medium px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 shadow-2xs group"
          >
            <span>{sample.badge}</span>
            <span className="text-neutral-400 group-hover:text-neutral-600 font-normal">
              {sample.title.split('(')[0].trim()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
