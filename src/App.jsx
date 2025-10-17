import React, { useState, useEffect } from "react";
import {
  BarChart2,
  Mountain,
  Zap,
  Coins,
  Settings,
  Monitor,
  Smartphone,
} from "lucide-react";

// Importar componentes
import ScreenContainer from "./components/ScreenContainer";
import OracleMetricCard from "./components/OracleMetricCard";
import PriceChart from "./components/PriceChart";
import TradingPanel from "./components/TradingPanel";
import NotificationToast from "./components/NotificationToast";
import EfficiencyBanner from "./components/EfficiencyBanner";

// Importar pantallas
import DashboardScreen from "./screens/DashboardScreen";
import ExtractionScreen from "./screens/ExtractionScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import RefineAndIGCScreen from "./screens/RefineAndIGCScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Importar datos y constantes
import {
  MOCK_OPEX_DATA_INITIAL,
  simulateOracleUpdate,
  globalData,
} from "./data/constants";

// --- APLICACIÓN PRINCIPAL ---
const InkaGoldMobileApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [opexData, setOpexData] = useState(MOCK_OPEX_DATA_INITIAL);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isMobileView, setIsMobileView] = useState(true);

  useEffect(() => {
    // Función para obtener el precio del oro real (usando CoinGecko como proxy)
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd"
        );
        const data = await response.json();

        // Actualiza la variable global y el margen
        globalData.GOLD_SPOT_PRICE_USD_PER_OZ = data["pax-gold"].usd;
        globalData.MARGEN_BRUTO_POR_OZ =
          globalData.GOLD_SPOT_PRICE_USD_PER_OZ -
          globalData.AISC_PROYECTADO_PER_OZ;

        // Actualiza el estado de los datos con el nuevo precio de IGC (Precio/Oz / 31.1 gramos/Oz)
        setOpexData((prev) => ({
          ...prev,
          IGC: {
            ...prev.IGC,
            current_price: (
              globalData.GOLD_SPOT_PRICE_USD_PER_OZ / 31.1
            ).toFixed(2),
          },
        }));
      } catch (error) {
        console.error("Error fetching gold price, using fallback data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldPrice();

    // Simula updates oracle cada 30 segundos
    const oracleTimer = setInterval(
      () => setOpexData(simulateOracleUpdate),
      30000
    );

    return () => {
      clearInterval(oracleTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Cargando datos RWA en tiempo real...
      </div>
    );
  }

  const tabs = [
    {
      id: "dashboard",
      label: "Panel",
      Icon: BarChart2,
      component: DashboardScreen,
    },
    {
      id: "extraction",
      label: "$MINE",
      Icon: Mountain,
      component: ExtractionScreen,
    },
    {
      id: "processing",
      label: "$PROC",
      Icon: Zap,
      component: ProcessingScreen,
    },
    {
      id: "refining",
      label: "IGC/$REF",
      Icon: Coins,
      component: RefineAndIGCScreen,
    },
    {
      id: "settings",
      label: "Ajustes",
      Icon: Settings,
      component: SettingsScreen,
    },
  ];

  const CurrentComponent = tabs.find((tab) => tab.id === activeTab).component;

  const renderComponent = (Component) => {
    // Pasa los handlers de notificación a las pantallas de trading
    if (["extraction", "processing", "refining"].includes(activeTab)) {
      return (
        <Component
          data={opexData}
          setShowNotification={setShowNotification}
          setNotificationMessage={setNotificationMessage}
        />
      );
    }
    return <Component data={opexData} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Botón para alternar vista */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileView(!isMobileView)}
          className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full text-white shadow-lg transition-colors duration-200"
          title={isMobileView ? "Cambiar a vista PC" : "Cambiar a vista móvil"}
        >
          {isMobileView ? (
            <Monitor className="w-6 h-6" />
          ) : (
            <Smartphone className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        className={`w-full ${
          isMobileView ? "max-w-md mx-auto shadow-2xl" : "max-w-7xl mx-auto"
        } bg-gray-900 min-h-screen relative`}
      >
        {/* Contenido principal de la pantalla activa */}
        {renderComponent(CurrentComponent)}

        {/* Notificación Toast */}
        <NotificationToast
          message={notificationMessage}
          show={showNotification}
          onClose={() => setShowNotification(false)}
        />

        {/* Navegación Inferior (Footer Fijo) */}
        <div
          className={`fixed bottom-0 left-0 right-0 ${
            isMobileView ? "max-w-md mx-auto" : "max-w-7xl mx-auto"
          } bg-gray-800 border-t border-gray-700 shadow-3xl flex justify-around p-2`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-yellow-500 bg-gray-700 shadow-inner"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <tab.Icon className="w-6 h-6" />
              <span className="text-xs mt-1 font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InkaGoldMobileApp;
