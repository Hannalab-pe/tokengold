// src/screens/ExtractionScreen.jsx
import React from "react";
import { Activity, Scale, Truck, Mountain, Clock } from "lucide-react";
import ScreenContainer from "../components/ScreenContainer";
import TradingPanel from "../components/TradingPanel";
import EfficiencyBanner from "../components/EfficiencyBanner";
import OracleMetricCard from "../components/OracleMetricCard";
import { generatePriceHistory } from "../data/constants";

const ExtractionScreen = ({
  data,
  setShowNotification,
  setNotificationMessage,
}) => {
  const token = data["MINE-OPEX"];
  const history = generatePriceHistory(token.current_price);

  return (
    <ScreenContainer
      title="Extracción Minera"
      subtitle="Tokenización de OPEX - Fase 1 (40% del AISC)"
    >
      <TradingPanel
        {...token}
        history={history}
        setShowNotification={setShowNotification}
        setNotificationMessage={setNotificationMessage}
      />
      <EfficiencyBanner tokenData={token} />

      <div>
        <h2 className="text-lg font-semibold text-gray-300 mb-3 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-yellow-500" />
          Datos en Vivo del Oráculo (Socavón)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(token.sensor_data).map((sensor, idx) => (
            <OracleMetricCard
              key={idx}
              label={sensor.label}
              value={sensor.value}
              unit={sensor.unit}
              projected={sensor.projected}
              Icon={[Scale, Truck, Mountain, Clock, Activity][idx % 5]}
              trend={Math.random() * 10 - 5}
            />
          ))}
        </div>
      </div>

      <div className="bg-red-900/20 p-4 rounded-lg border border-red-800">
        <p className="text-sm font-semibold text-red-400 mb-1">
          ⚠️ Nivel de Riesgo: {token.risk_level}
        </p>
        <p className="text-xs text-gray-400">
          Mayor exposición a variables operativas. Potencial de retorno:{" "}
          <span className="text-green-400 font-bold">
            {token.return_potential}
          </span>
        </p>
      </div>
    </ScreenContainer>
  );
};

export default ExtractionScreen;
