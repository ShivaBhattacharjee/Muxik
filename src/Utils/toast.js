// ErrorNotify.jsx
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const ErrorNotify = ({ message }) => {
  const toastIdRef = useRef(null);

  useEffect(() => {
    const toastId = toast.error(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration: 2000,
      id: new Date().getTime().toString(), // Unique key based on timestamp
    });

    toastIdRef.current = toastId;

    return () => {
      toast.dismiss(toastIdRef.current);
    };
  }, [message]);

  return null;
};

export { ErrorNotify };

// SuccessNotify.jsx
const SuccessNotify = ({ message }) => {
  const toastIdRef = useRef(null);

  useEffect(() => {
    const toastId = toast.success(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration: 2000,
      id: new Date().getTime().toString(), // Unique key based on timestamp
    });

    toastIdRef.current = toastId;

    return () => {
      toast.dismiss(toastIdRef.current);
    };
  }, [message]);

  return null;
};

export { SuccessNotify };
