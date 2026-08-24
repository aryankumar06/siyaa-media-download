import { useState, useCallback, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Trash2,
  Inbox,
  Sparkles,
  Layers,
  Search,
  HardDrive,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FormatSelector } from '@/components/FormatSelector';
import { DownloadQueueItem } from '@/components/DownloadQueueItem';
import { ToastContainer } from '@/components/ToastContainer';
import { RecommendationSection } from '@/components/RecommendationSection';
import { QuickPasteBar } from '@/components/QuickPasteBar';
import { MediaPlayerModal } from '@/components/MediaPlayerModal';
import { useDownloadStore } from '@/store/downloadStore';
import { isValidMediaUrl } from '@/services/api';

export default function App() {
  const [url, setUrl] = useState('');
  const [touched, setTouched] = useState(false);
  const [searchLibrary, setSearchLibrary] = useState('');

  const items = useDownloadStore((s) => s.items);
  const selectedFormat = useDownloadStore((s) => s.selectedFormat);
  const setSelectedFormat = useDownloadStore((s) => s.setSelectedFormat);
  const addDownload = useDownloadStore((s) => s.addDownload);
  const addToast = useDownloadStore((s) => s.addToast);
  const clearCompleted = useDownloadStore((s) => s.clearCompleted);
  const activeTab = useDownloadStore((s) => s.activeTab);
  const setActiveTab = useDownloadStore((s) => s.setActiveTab);

  const trimmed = url.trim();
  const isValid = isValidMediaUrl(trimmed);
  const showError = touched && trimmed.length > 0 && !isValid;

  const completedItems = items.filter((i) => i.status === 'success');
  const activeItems = items.filter((i) => i.status !== 'success' && i.status !== 'error');
  const hasCompleted = completedItems.length > 0 || items.some((i) => i.status === 'error');

  const filteredLibraryItems = items.filter((item) => {
    if (!searchLibrary) return true;
    const query = searchLibrary.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.author?.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query)
    );
  });

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setTouched(true);
      if (!isValid) {
        addToast('Please enter a valid YouTube or media URL', 'error');
        return;
      }
      addDownload(trimmed);
      setUrl('');
      setTouched(false);
      addToast('Download started', 'info');
    },
    [isValid, trimmed, addDownload, addToast],
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-red-500 selection:text-white flex flex-col justify-between">
      {/* Background glow effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Container */}
      <div className="relative max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Download size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-white">
                  Universal Media DL
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  v2.0 Pro
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">
                Universal YouTube & Media Extractor + AI Recommendations
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span className="text-white font-semibold">{completedItems.length}</span> Saved
            </div>
            <span className="text-neutral-700">|</span>
            <div className="flex items-center gap-1.5">
              <Zap size={13} className="text-amber-400" />
              <span className="text-white font-semibold">{activeItems.length}</span> Active
            </div>
          </div>
        </header>

        {/* Tab Navigation Controls */}
        <div className="flex items-center p-1.5 mb-8 bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('downloader')}
            className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'downloader' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {activeTab === 'downloader' && (
              <motion.div
                layoutId="nav-tab-pill"
                className="absolute inset-0 bg-neutral-800 rounded-xl shadow-xs border border-neutral-700/60"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <Download size={16} className="relative z-10" />
            <span className="relative z-10">Downloader</span>
            {activeItems.length > 0 && (
              <span className="relative z-10 text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full">
                {activeItems.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recommendations')}
            className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'recommendations' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {activeTab === 'recommendations' && (
              <motion.div
                layoutId="nav-tab-pill"
                className="absolute inset-0 bg-neutral-800 rounded-xl shadow-xs border border-neutral-700/60"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <Sparkles size={16} className="relative z-10 text-red-400" />
            <span className="relative z-10">Recommended</span>
            <span className="relative z-10 text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.2 rounded-full border border-red-500/30">
              AI
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'library' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {activeTab === 'library' && (
              <motion.div
                layoutId="nav-tab-pill"
                className="absolute inset-0 bg-neutral-800 rounded-xl shadow-xs border border-neutral-700/60"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <Layers size={16} className="relative z-10" />
            <span className="relative z-10">Library</span>
            <span className="relative z-10 text-[10px] bg-neutral-700 text-neutral-300 px-1.5 py-0.2 rounded-full">
              {items.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Downloader */}
        {activeTab === 'downloader' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Input card */}
            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onBlur={() => setTouched(true)}
                    invalid={showError}
                    placeholder="Paste YouTube, Shorts, Music or video link…"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className="bg-neutral-950 border-neutral-700 text-white placeholder:text-neutral-500 h-13 pl-4 pr-12 text-sm sm:text-base rounded-2xl focus:border-red-500 focus:ring-red-500/20"
                  />
                  <AnimatePresence>
                    {showError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs font-semibold text-red-400 mt-1.5 pl-1"
                      >
                        Please enter a supported media URL (YouTube, Vimeo, SoundCloud, etc.)
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <FormatSelector
                  value={selectedFormat}
                  onChange={setSelectedFormat}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold h-12 rounded-2xl shadow-lg shadow-red-600/25 transition-all text-sm sm:text-base"
                  disabled={!isValid}
                >
                  <Download size={18} strokeWidth={2.5} />
                  <span>Start High-Speed Download</span>
                </Button>
              </form>

              {/* Sample link helper */}
              <QuickPasteBar onSelectUrl={(sampleUrl) => setUrl(sampleUrl)} />
            </div>

            {/* Queue section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Live Download Queue
                  </h2>
                  <span className="text-xs text-neutral-500">
                    ({items.length} total)
                  </span>
                </div>
                {hasCompleted && (
                  <button
                    onClick={clearCompleted}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={13} strokeWidth={2} />
                    Clear finished
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-3xl bg-neutral-900/50 border border-neutral-800/80">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-3 text-neutral-400">
                    <Inbox size={22} strokeWidth={2} />
                  </div>
                  <p className="text-sm font-semibold text-neutral-300">
                    No active downloads
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                    Paste a link above or pick from AI Recommendations to download instantly.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <DownloadQueueItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </section>

            {/* Teaser for Recommendations */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Looking for more videos?
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Check out recommendations tailored to your recent downloads.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('recommendations')}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-all whitespace-nowrap"
              >
                View Recommendations →
              </button>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Smart Recommendation System */}
        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <RecommendationSection />
          </motion.div>
        )}

        {/* Tab 3: Saved Library */}
        {activeTab === 'library' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Library Header & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HardDrive size={18} className="text-red-500" />
                  <span>Media Library & History</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {completedItems.length} media files stored and ready for playback.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-3 text-neutral-500" />
                <input
                  type="text"
                  value={searchLibrary}
                  onChange={(e) => setSearchLibrary(e.target.value)}
                  placeholder="Search downloads..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-red-500"
                />
              </div>
            </div>

            {/* List */}
            {filteredLibraryItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-3xl bg-neutral-900/50 border border-neutral-800">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-3 text-neutral-400">
                  <Inbox size={22} />
                </div>
                <p className="text-sm font-semibold text-neutral-300">
                  {searchLibrary ? 'No matches found' : 'Your library is empty'}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Downloaded files will be stored here for instant playback.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLibraryItems.map((item) => (
                  <DownloadQueueItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>Universal YouTube Media Downloader & Smart Recommendation System</p>
      </footer>

      {/* In-App Media Player Modal */}
      <MediaPlayerModal />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}
