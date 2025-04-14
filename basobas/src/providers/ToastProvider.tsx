"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * Toast types
 */
export type ToastType = "success" | "error" | "info" | "warning";

/**
 * Toast message interface
 */
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

/**
 * Toast context interface
 */
interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
}

// Create context with default values
const ToastContext = createContext<ToastContextType>({
  toasts: [],
  showToast: () => {},
  hideToast: () => {},
});

/**
 * Hook to use the toast context
 */
export const useToast = () => useContext(ToastContext);

/**
 * Toast provider component
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Show a new toast
  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now().toString();

    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      hideToast(id);
    }, 5000);
  }, []);

  // Hide a toast by ID
  const hideToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg p-4 shadow-md transition-all duration-300 ${getToastStyles(
              toast.type
            )}`}
            role="alert"
          >
            <div className="flex items-center">
              <div className="mr-2">{getToastIcon(toast.type)}</div>
              <div className="flex-1">{toast.message}</div>
              <button
                onClick={() => hideToast(toast.id)}
                className="ml-4 text-sm font-medium opacity-70 hover:opacity-100"
                aria-label="Close"
              >
                <XIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * Get toast styles based on type
 */
const getToastStyles = (type: ToastType): string => {
  switch (type) {
    case "success":
      return "bg-[var(--color-success)] text-white";
    case "error":
      return "bg-[var(--color-error)] text-white";
    case "warning":
      return "bg-[var(--color-warning)] text-white";
    case "info":
      return "bg-[var(--color-accent)] text-white";
    default:
      return "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100";
  }
};

/**
 * Get toast icon based on type
 */
const getToastIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon />;
    case "error":
      return <XCircleIcon />;
    case "warning":
      return <AlertCircleIcon />;
    case "info":
      return <InfoIcon />;
    default:
      return null;
  }
};

// Toast icons
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
