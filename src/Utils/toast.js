// ErrorNotify.jsx
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const ErrorNotify = ({ message }) => {
  useEffect(() => {
    const toastId = toast.error(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration: 2000,
    });

    return () => {
      toast.dismiss(toastId);
    };
  }, [message]);

  return null;
};

export { ErrorNotify };

// SuccessNotify.jsx
const SuccessNotify = ({ message }) => {
  useEffect(() => {
    const toastId = toast.success(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration: 2000,
    });

    return () => {
      toast.dismiss(toastId);
    };
  }, [message]);

  return null;
};

export { SuccessNotify };
