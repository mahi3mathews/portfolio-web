import { useEffect } from 'react';

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};
export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="toast-container">
      <div className="toast">{message}</div>
    </div>
  );
}
