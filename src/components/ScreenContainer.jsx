// src/components/ScreenContainer.jsx
import React from "react";

const ScreenContainer = ({ title, children, subtitle }) => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white pb-20">
    <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 shadow-lg sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-sm text-gray-800 mt-1">{subtitle}</p>}
    </div>
    <div className="p-4 space-y-4">{children}</div>
  </div>
);

export default ScreenContainer;
