import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ErrorHandling = msg => toast.error(msg, {
  position: 'bottom-center',
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export const ErrorContainer = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={8000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnVisibilityChange
    draggable
  />
);
