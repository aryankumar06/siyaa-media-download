import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import type { Toast } from '@/types';
import { useDownloadStore } from '@/store/downloadStore';

const toastConfig: Record<
  Toast['type'],
  { icon: typeof Info; className: string }
> = {
  success: { icon: CheckCircle2, className: 'text-emerald-600' },
  error: { icon: XCircle, className: 'text-red-500' },
  info: { icon: Info, className: 'text-neutral-700' },
};

export function ToastContainer() {
  const toasts = useDownloadStore((s) => s.toasts);
  const dismissToast = useDownloadStore((s) => s.dismissToast);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = toastConfig[toast.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="pointer-events-auto flex items-center gap-3 pl-4 pr-3 py-3 rounded-xl bg-white border border-neutral-200 shadow-lg max-w-sm"
            >
              <Icon size={18} className={config.className} strokeWidth={2} />
              <span className="text-sm font-medium text-neutral-800 flex-1">
                {toast.message}
              </span>
              <button
                onClick={() => dismissToast(toast.id)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
