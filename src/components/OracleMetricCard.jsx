// src/components/OracleMetricCard.jsx
import React from "react";

const OracleMetricCard = ({ label, value, unit, projected, Icon, trend }) => {
  const isEfficient = projected
    ? unit.includes("%")
      ? value > projected
      : value < projected
    : false;
  const colorClass = isEfficient
    ? "text-green-400"
    : projected
    ? "text-yellow-400"
    : "text-blue-400";
  const bgColor = isEfficient
    ? "bg-green-900/20"
    : projected
    ? "bg-yellow-900/20"
    : "bg-blue-900/20";

  return (
    <div
      className={`p-4 rounded-lg border border-gray-700 transition-all duration-300 hover:shadow-lg ${bgColor} mt-2`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-400 flex items-center mb-2">
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </p>
          <p className={`text-2xl font-bold ${colorClass}`}>
            {value.toFixed(2)}{" "}
            <span className="text-sm text-gray-400">{unit}</span>
          </p>
          {trend !== undefined && (
            <p className="text-xs text-gray-500 mt-1">
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}% vs ayer
            </p>
          )}
        </div>
        {projected && (
          <div className="text-right">
            <p className="text-xs text-gray-500">Proyectado</p>
            <p className="text-lg font-semibold text-gray-400">
              {projected.toFixed(2)}
            </p>
            {isEfficient && (
              <p className="text-xs text-green-400 mt-1">✓ Eficiente</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OracleMetricCard;
