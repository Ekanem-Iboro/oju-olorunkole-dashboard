import { AlertTriangle, Loader, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title = 'Confirm Delete',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
      onClick={() => {
        if (!isPending) onCancel();
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 text-[#EF4444] p-2 rounded-full flex-shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#374151]">{title}</h3>
            <p className="text-sm text-[#6B7280] mt-1">{message}</p>
          </div>
          <button
            onClick={onCancel}
            disabled={isPending}
            className="text-[#6B7280] hover:text-[#374151] transition-colors disabled:opacity-50"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isPending}
            className="px-4 py-2 border border-[#E2E8F0] text-[#6B7280] rounded-lg hover:bg-[#F8FAFC] transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isPending && <Loader className="h-4 w-4 animate-spin" />}
            <span>{isPending ? 'Deleting...' : confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
