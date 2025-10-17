// src/components/TradingPanel.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import PriceChart from "./PriceChart";

const TradingPanel = ({
  token_name,
  full_name,
  current_price,
  daily_change,
  volume_24h,
  market_cap,
  history,
  setShowNotification,
  setNotificationMessage,
}) => {
  const [amount, setAmount] = useState("100");
  const [activeTab, setActiveTab] = useState("buy");
  const [showModal, setShowModal] = useState(false);

  const isPositive = daily_change.startsWith("+");
  const price = parseFloat(current_price);

  const handleConfirm = () => setShowModal(true);

  const handleFinalizeTransaction = () => {
    setShowModal(false);
    setNotificationMessage(
      `Transacción simulada: Has ${
        activeTab === "buy" ? "comprado" : "vendido"
      } ${(parseFloat(amount) / price).toFixed(4)} ${token_name}.`
    );
    setShowNotification(true);
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700 transition-all duration-300 hover:shadow-yellow-500/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-yellow-500">{token_name}</h3>
          <p className="text-sm text-gray-400">{full_name}</p>
        </div>
        <div
          className={`text-lg font-bold px-3 py-1 rounded-lg ${
            isPositive
              ? "bg-green-900/30 text-green-400"
              : "bg-red-900/30 text-red-400"
          }`}
        >
          {daily_change}
        </div>
      </div>

      <p className="text-4xl font-extrabold text-white mb-2">
        ${price.toFixed(2)} <span className="text-lg text-gray-400">USD</span>
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-900/50 p-2 rounded">
          <p className="text-xs text-gray-500">Volumen 24h</p>
          <p className="text-sm font-semibold text-white">${volume_24h}</p>
        </div>
        <div className="bg-gray-900/50 p-2 rounded">
          <p className="text-xs text-gray-500">Cap. Mercado</p>
          <p className="text-sm font-semibold text-white">${market_cap}</p>
        </div>
      </div>

      <PriceChart data={history} />

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setActiveTab("buy")}
          className={`flex-1 py-2 rounded-lg font-semibold transition duration-200 ${
            activeTab === "buy"
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-400 hover:bg-gray-600"
          }`}
        >
          Comprar
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`flex-1 py-2 rounded-lg font-semibold transition duration-200 ${
            activeTab === "sell"
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-400 hover:bg-gray-600"
          }`}
        >
          Vender
        </button>
      </div>

      <div className="mb-3">
        <label className="text-xs text-gray-400 block mb-1">Monto (USD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500 transition"
          placeholder="100"
        />
        <p className="text-xs text-gray-500 mt-1">
          ≈ {(parseFloat(amount) / price).toFixed(4)} {token_name}
        </p>
      </div>

      <button
        onClick={handleConfirm}
        className={`w-full font-bold py-3 rounded-lg transition duration-200 ${
          activeTab === "buy"
            ? "bg-green-600 hover:bg-green-500"
            : "bg-red-600 hover:bg-red-500"
        } text-white`}
      >
        {activeTab === "buy" ? "Confirmar Compra" : "Confirmar Venta"}
      </button>

      {/* MODAL DE CONFIRMACIÓN */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full shadow-2xl border border-gray-700">
            <h3 className="text-xl font-bold text-yellow-500 mb-4 flex justify-between items-center">
              Confirmar Transacción
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </h3>
            <p className="text-gray-300 mb-5">
              Estás a punto de **{activeTab === "buy" ? "COMPRAR" : "VENDER"}**{" "}
              <span className="font-bold text-white">
                {(parseFloat(amount) / price).toFixed(4)} {token_name}
              </span>{" "}
              utilizando ${amount} USD.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleFinalizeTransaction}
                className="flex-1 py-3 bg-yellow-500 text-gray-900 rounded-lg font-bold hover:bg-yellow-400 transition"
              >
                Ejecutar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingPanel;
