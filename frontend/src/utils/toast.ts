import { toast } from 'sonner';

export function showSuccess(message: string) {
  toast.success(message, { duration: 3000 });
}

export function showError(message: string) {
  toast.error(message, { duration: 4000 });
}

export function showInfo(message: string) {
  toast(message, { duration: 3000 });
}

export function showWarning(message: string) {
  toast.warning(message, { duration: 4000 });
}
