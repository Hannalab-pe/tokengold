// src/components/NotificationToast.jsx
import React, { useEffect } from "react";
import { TrendingUp, X } from "lucide-react";

const NotificationToast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Se esconde después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-xl flex items-center max-w-xs transition-opacity duration-300">
        <TrendingUp className="w-5 h-5 mr-3" />
        <p className="text-sm font-medium flex-grow">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-white/80 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
