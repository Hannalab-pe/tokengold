// src/screens/RefineAndIGCScreen.jsx
import React from "react";
import {
  Activity,
  Coins,
  Shield,
  DollarSign,
  Zap,
  Clock,
  Scale,
} from "lucide-react";
import ScreenContainer from "../components/ScreenContainer";
import TradingPanel from "../components/TradingPanel";
import PriceChart from "../components/PriceChart";
import OracleMetricCard from "../components/OracleMetricCard";
import { generatePriceHistory } from "../data/constants";

const RefineAndIGCScreen = ({
  data,
  setShowNotification,
  setNotificationMessage,
}) => {
  const refineToken = data["REFINE-OPEX"];
  const igc = data["IGC"];
  const refineHistory = generatePriceHistory(refineToken.current_price);
  const igcHistory = generatePriceHistory(parseFloat(igc.current_price));

  return (
    <ScreenContainer
      title="Reserva y Refinación"
      subtitle="IGC + Token de Refinación (25% del AISC)"
    >
      {/* IGC Section */}
      <div className="bg-gradient-to-br from-yellow-600 to-yellow-500 p-5 rounded-xl shadow-2xl border-2 border-yellow-400 transition-all duration-300 hover:shadow-yellow-300/30">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center mb-2">
          <Coins className="w-6 h-6 mr-2" /> Inka Gold Coin (IGC)
        </h3>
        <p className="text-sm text-gray-800 mb-4">{igc.description}</p>

        <div className="bg-black/20 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-sm text-gray-800">Tu Balance</p>
              <p className="text-4xl font-extrabold text-white">
                {igc.user_balance.toFixed(2)}
              </p>
              <p className="text-sm text-gray-800">gramos de oro</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-800">Valor/gramo</p>
              <p className="text-2xl font-bold text-white">
                ${igc.current_price}
              </p>
              <p
                className={`text-sm font-semibold ${
                  igc.daily_change.startsWith("+")
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                {igc.daily_change}
              </p>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-xs text-gray-300">Valor Total en USD</p>
            <p className="text-3xl font-bold text-yellow-200">
              {(igc.user_balance * parseFloat(igc.current_price)).toFixed(2)}
            </p>
          </div>
        </div>

        <PriceChart data={igcHistory} color="#FFFFFF" />

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-black/20 p-2 rounded">
            <p className="text-xs text-gray-800">Volumen 24h</p>
            <p className="text-sm font-semibold text-white">
              ${igc.volume_24h}
            </p>
          </div>
          <div className="bg-black/20 p-2 rounded">
            <p className="text-xs text-gray-800">Market Cap</p>
            <p className="text-sm font-semibold text-white">
              ${igc.market_cap}
            </p>
          </div>
        </div>

        <button className="w-full bg-gray-900 text-yellow-400 font-bold py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center">
          <Shield className="w-5 h-5 mr-2" />
          Ver Certificado de Custodia
        </button>
      </div>

      {/* T-REF Section */}
      <h2 className="text-xl font-bold text-yellow-500 mb-3">
        Token de Refinación ($REFINE-OPEX)
      </h2>
      <TradingPanel
        {...refineToken}
        history={refineHistory}
        setShowNotification={setShowNotification}
        setNotificationMessage={setNotificationMessage}
      />

      <div>
        <h2 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-yellow-500" />
          Datos en Vivo del Oráculo (Refinería)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(refineToken.sensor_data).map((sensor, idx) => (
            <OracleMetricCard
              key={idx}
              label={sensor.label}
              value={sensor.value}
              unit={sensor.unit}
              projected={sensor.projected}
              Icon={[DollarSign, Shield, Scale, Zap, Clock][idx % 5]}
              trend={Math.random() * 3 - 1.5}
            />
          ))}
        </div>
      </div>

      <div className="bg-green-900/20 p-4 rounded-lg border border-green-800">
        <p className="text-sm font-semibold text-green-400 mb-1">
          ✓ Nivel de Riesgo: {refineToken.risk_level}
        </p>
        <p className="text-xs text-gray-400">
          Menor exposición. Potencial de retorno:{" "}
          <span className="text-green-400 font-bold">
            {refineToken.return_potential}
          </span>
        </p>
      </div>
    </ScreenContainer>
  );
};

export default RefineAndIGCScreen;
