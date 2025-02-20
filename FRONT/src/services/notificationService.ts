import { toast } from 'react-toastify';

export const NotificationService = {
  success: (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });
  },
  error: (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
    });
  },
  warning: (message: string) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 3000,
    });
  },
};
