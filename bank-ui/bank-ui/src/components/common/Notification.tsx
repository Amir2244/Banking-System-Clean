import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 right-4 z-50 rounded-lg p-4 shadow-lg ${
          type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-4 rounded-full p-1 hover:bg-black hover:bg-opacity-10"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
