// src/screens/ProcessingScreen.jsx
import React from "react";
import { Activity, Zap, Droplet, Scale, Truck } from "lucide-react";
import ScreenContainer from "../components/ScreenContainer";
import TradingPanel from "../components/TradingPanel";
import EfficiencyBanner from "../components/EfficiencyBanner";
import OracleMetricCard from "../components/OracleMetricCard";
import { generatePriceHistory } from "../data/constants";

const ProcessingScreen = ({
  data,
  setShowNotification,
  setNotificationMessage,
}) => {
  const token = data["PROCESS-OPEX"];
  const history = generatePriceHistory(token.current_price);

  return (
    <ScreenContainer
      title="Procesamiento Metalúrgico"
      subtitle="Tokenización de OPEX - Fase 2 (35% del AISC)"
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
          Datos en Vivo del Oráculo (Planta)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(token.sensor_data).map((sensor, idx) => (
            <OracleMetricCard
              key={idx}
              label={sensor.label}
              value={sensor.value}
              unit={sensor.unit}
              projected={sensor.projected}
              Icon={[Zap, Droplet, Scale, Zap, Truck][idx % 5]}
              trend={Math.random() * 8 - 4}
            />
          ))}
        </div>
      </div>

      <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800">
        <p className="text-sm font-semibold text-yellow-400 mb-1">
          ⚖️ Nivel de Riesgo: {token.risk_level}
        </p>
        <p className="text-xs text-gray-400">
          Riesgo moderado. Potencial de retorno:{" "}
          <span className="text-green-400 font-bold">
            {token.return_potential}
          </span>
        </p>
      </div>
    </ScreenContainer>
  );
};

export default ProcessingScreen;
