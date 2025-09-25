"use client";

import toast, { ToastOptions } from "react-hot-toast";

export type ToastType = "success" | "error" | "alert";

export const useToast = () => {
  const showToast = (message: string, type: ToastType = "success") => {
    if (!message) return;

    const baseOptions: ToastOptions = {
      duration: 2000,
      style: {
        fontFamily: "sans-serif",
        fontWeight: 500,
        padding: "12px 16px",
        borderRadius: "8px",
        color: "black",
        zIndex: 99999
      },
    };

    switch (type) {
      case "success":
        toast.success(message, { ...baseOptions, className: "bg-green-500" });
        break;
      case "error":
        toast.error(message, { ...baseOptions, className: "bg-red-500" });
        break;
      case "alert":
        toast(message, { ...baseOptions, className: "bg-yellow-500 text-black" });
        break;
    }
  };

  return { showToast }; 
};
