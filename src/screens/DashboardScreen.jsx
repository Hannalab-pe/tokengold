// src/screens/DashboardScreen.jsx
import React from "react";
import { BarChart2, TrendingUp, DollarSign, Scale } from "lucide-react";
import ScreenContainer from "../components/ScreenContainer";
import PriceChart from "../components/PriceChart";
import { generatePriceHistory, globalData } from "../data/constants";

const DashboardScreen = ({ data }) => {
  const totalValue = (
    data.IGC.user_balance * parseFloat(data.IGC.current_price)
  ).toFixed(2);
  const goldHistory = generatePriceHistory(
    globalData.GOLD_SPOT_PRICE_USD_PER_OZ
  );

  return (
    <ScreenContainer
      title="Panel General"
      subtitle="Resumen de tu portafolio RWA"
    >
      <div className="bg-gradient-to-br from-yellow-600 to-orange-600 p-6 rounded-xl shadow-xl">
        <p className="text-sm text-gray-900 font-semibold mb-1">
          Valor Total del Portafolio
        </p>
        <p className="text-5xl font-extrabold text-white mb-2">${totalValue}</p>
        <p className="text-sm text-gray-900">+8.2% este mes</p>
      </div>

      <PriceChart data={goldHistory} color="#FFD700" />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Precio Oro Spot</p>
          <p className="text-xl font-bold text-yellow-400">
            ${globalData.GOLD_SPOT_PRICE_USD_PER_OZ.toFixed(2)}
          </p>
          <p className="text-xs text-green-400">+0.82% hoy</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">AISC Promedio</p>
          <p className="text-xl font-bold text-blue-400">
            ${globalData.AISC_PROYECTADO_PER_OZ.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">/oz troy</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-300 mb-3">
        Tokens OPEX Disponibles
      </h2>

      {Object.keys(data)
        .filter((key) => key !== "IGC")
        .map((key) => {
          const token = data[key];
          return (
            <div
              key={key}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {token.token_name}
                  </h3>
                  <p className="text-sm text-gray-400">{token.full_name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Ponderación: {token.ponderation} del AISC
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-400">
                    ${token.current_price.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      token.daily_change.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {token.daily_change}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <div
                  className={`flex-1 text-center py-1 rounded text-xs font-semibold ${
                    token.risk_level === "ALTO"
                      ? "bg-red-900/30 text-red-400"
                      : token.risk_level === "MEDIO"
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-green-900/30 text-green-400"
                  }`}
                >
                  Riesgo: {token.risk_level}
                </div>
                <div className="flex-1 text-center py-1 rounded text-xs font-semibold bg-blue-900/30 text-blue-400">
                  ROI: {token.return_potential}
                </div>
              </div>
            </div>
          );
        })}

      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-xl border border-gray-600">
        <h3 className="text-sm font-semibold text-yellow-500 mb-2">
          💡 Información del Sistema
        </h3>
        <p className="text-xs text-gray-300 mb-2">
          Margen Bruto por Onza:{" "}
          <span className="text-green-400 font-bold">
            ${globalData.MARGEN_BRUTO_POR_OZ.toFixed(2)}
          </span>
        </p>
        <p className="text-xs text-gray-400">
          Los retornos se distribuyen proporcionalmente al completarse el ciclo
          de producción, verificado por oráculos.
        </p>
      </div>
    </ScreenContainer>
  );
};

export default DashboardScreen;
