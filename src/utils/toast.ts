import toast from 'react-hot-toast';

export function showSuccess(message: string) {
  toast.success(message, {
    duration: 3000,
    position: 'bottom-right',
    style: {
      background: 'var(--card)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
    },
  });
}

export function showError(message: string) {
  toast.error(message, {
    duration: 4000,
    position: 'bottom-right',
    style: {
      background: 'var(--card)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
    },
  });
}

export function showInfo(message: string) {
  toast(message, {
    duration: 3000,
    position: 'bottom-right',
    icon: 'ℹ️',
    style: {
      background: 'var(--card)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
    },
  });
}

export function showWarning(message: string) {
  toast(message, {
    duration: 4000,
    position: 'bottom-right',
    icon: '⚠️',
    style: {
      background: 'var(--card)',
      color: 'var(--foreground)',
      border: '1px solid var(--warning)',
    },
  });
}
