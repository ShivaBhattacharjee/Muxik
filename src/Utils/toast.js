// ErrorNotify.jsx
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const ErrorNotify = ({ message, key }) => { // Added key prop
  const toastIdRef = useRef(null);

  useEffect(() => {
    const toastId = toast.error(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration: 7000,
      id: key || new Date().getTime().toString(), // Use the provided key or generate one based on timestamp
    });

    toastIdRef.current = toastId;

    return () => {
      toast.dismiss(toastIdRef.current);
    };
  }, [message, key]); // Added key to the dependencies array

  return null;
};

export { ErrorNotify };

// SuccessNotify.jsx
const SuccessNotify = ({ message, key }) => { // Added key prop
  const toastIdRef = useRef(null);

  useEffect(() => {
    const toastId = toast.success(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      duration: 7000,
      id: key || new Date().getTime().toString(), // Use the provided key or generate one based on timestamp
    });

    toastIdRef.current = toastId;

    return () => {
      toast.dismiss(toastIdRef.current);
    };
  }, [message, key]); // Added key to the dependencies array

  return null;
};

export { SuccessNotify };
