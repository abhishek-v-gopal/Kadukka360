import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Toast as ToastType } from '../../hooks/useToast';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'bg-success text-white',
  error: 'bg-error text-white',
  warning: 'bg-warning text-black',
  info: 'bg-primary text-white',
};

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const Icon = iconMap[toast.type];

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg ${colorMap[toast.type]} animate-slide-up`}>
      <Icon size={20} />
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="opacity-75 hover:opacity-100 transition-opacity"
      >
        <X size={18} />
      </button>
    </div>
  );
};