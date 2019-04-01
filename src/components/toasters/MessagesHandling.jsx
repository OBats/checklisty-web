import React from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

export const ErrorHandling = (msg, timeout = 2000) => {
  if (!toast.isActive(toastId)) {
    toastId = toast.error(msg, {
      toastId,
      position: 'bottom-center',
      autoClose: timeout,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      preventDuplicates: true,
    });
  }
};

export const SuccessHandling = msg => toast.success(msg, {
  position: 'bottom-center',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export const InfoToaster = msg => toast.info(msg, {
  position: 'bottom-center',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

export const MessageContainer = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnVisibilityChange
    draggable
    transition={Zoom}
    preventDuplicates
  />
);
