import { toast } from 'react-toastify';

// eslint-disable-next-line import/prefer-default-export
export const toastVerificacion = (toastId, message) => {
  const isActive = toast.isActive(toastId);
  if (isActive) {
    toast.update(toastId, {
      render: message,
      type: toast.TYPE.SUCCESS,
    });
  } else {
    toast.success(message, { toastId });
  }
};
