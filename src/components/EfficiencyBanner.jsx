// src/components/EfficiencyBanner.jsx
import React from "react";
import { TrendingUp } from "lucide-react";

const EfficiencyBanner = ({ tokenData }) => {
  const calculateEfficiency = () => {
    const sensorData = Object.values(tokenData.sensor_data);
    let totalEfficiency = 0;
    let count = 0;

    sensorData.forEach((sensor) => {
      if (sensor.projected) {
        // La eficiencia se calcula como (Real - Proyectado) / Proyectado * 100
        // Para variables positivas (recuperación, ley), valor > proyectado es bueno.
        // Para variables negativas (costo, consumo), valor < proyectado es bueno.
        const difference =
          sensor.unit.includes("%") ||
          sensor.unit.includes("g/Tn") ||
          sensor.unit.includes("unidades")
            ? sensor.value - sensor.projected
            : sensor.projected - sensor.value;

        // Evitamos división por cero o por un proyectado negativo/cero
        const base = sensor.projected !== 0 ? sensor.projected : 1;
        const efficiency = (difference / base) * 100;

        totalEfficiency += efficiency;
        count++;
      }
    });

    // Se calcula la eficiencia promedio
    return count > 0 ? (totalEfficiency / count).toFixed(1) : "0.0";
  };

  const efficiency = calculateEfficiency();
  const efficiencyNum = parseFloat(efficiency);
  // Fórmula mejorada para ROI adicional (basado en la eficiencia)
  const additionalROI = (
    efficiencyNum > 0 ? efficiencyNum * 1.5 : efficiencyNum * 0.5
  ).toFixed(1);

  return (
    <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 p-4 rounded-xl border-2 border-yellow-600/50 transition-all duration-300 hover:scale-[1.01]">
      <p className="text-sm font-semibold text-yellow-400 flex items-center mb-2">
        <TrendingUp className="w-4 h-4 mr-2" /> Prima por Eficiencia Operativa
      </p>
      <p className="text-sm text-gray-300 mb-3">{tokenData.description}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/30 p-3 rounded-lg">
          <p className="text-xs text-gray-400">Eficiencia vs Proyección</p>
          <p
            className={`text-2xl font-bold ${
              efficiencyNum >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {efficiencyNum >= 0 ? "+" : ""}
            {efficiency}%
          </p>
        </div>
        <div className="bg-black/30 p-3 rounded-lg">
          <p className="text-xs text-gray-400">ROI Adicional Estimado</p>
          <p className="text-2xl font-bold text-yellow-400">
            {additionalROI >= 0 ? "+" : ""}
            {additionalROI}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyBanner;
