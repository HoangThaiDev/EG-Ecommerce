// Import Modules
import React, { createContext, useContext } from "react";

// Import File CSS
import "./css/toastCustom.css";

// Import components
import { message } from "antd";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const toast = {
    success: (content, className) =>
      messageApi.open({
        type: "success",
        content,
        duration: 3,
        className: className,
      }),
    warning: (content, className) =>
      messageApi.open({
        type: "warning",
        content,
        duration: 3,
        className: className,
      }),
    error: (content, className) =>
      messageApi.open({
        type: "error",
        content,
        duration: 3,
        className: className,
      }),
    // Add other methods like info, warning if needed
  };

  return (
    <ToastContext.Provider value={toast}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
