// src/screens/SettingsScreen.jsx
import React from "react";
import { Settings } from "lucide-react";
import ScreenContainer from "../components/ScreenContainer";

const SettingsScreen = () => (
  <ScreenContainer
    title="Configuraciones"
    subtitle="Personaliza tu experiencia"
  >
    <div className="space-y-4">
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">Tema</h3>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-yellow-600 text-white rounded-lg">
            Oscuro (Default)
          </button>
          <button className="flex-1 py-2 bg-gray-700 text-gray-400 rounded-lg">
            Claro
          </button>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">
          Conectar Wallet
        </h3>
        <button className="w-full py-2 bg-green-600 text-white rounded-lg font-bold">
          Simular Conexión MetaMask
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Conecta tu wallet para transacciones reales (simulado).
        </p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">
          Notificaciones
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-300">Alertas de Precio</p>
          <input
            type="checkbox"
            className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded"
            defaultChecked
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-300">Actualizaciones Oracle</p>
          <input
            type="checkbox"
            className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded"
          />
        </div>
      </div>
    </div>
  </ScreenContainer>
);

export default SettingsScreen;
