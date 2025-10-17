// src/data/constants.js

// Configuración de datos (Oráculo y precios)
// NOTA: Estas variables deben ser mutables para ser actualizadas por el fetch
export const globalData = {
  GOLD_SPOT_PRICE_USD_PER_OZ: 4262.3, // Fallback value
  AISC_PROYECTADO_PER_OZ: 1892.0, // Updated based on realistic averages from sources (around $1500-1900 in 2025)
};

globalData.MARGEN_BRUTO_POR_OZ =
  globalData.GOLD_SPOT_PRICE_USD_PER_OZ - globalData.AISC_PROYECTADO_PER_OZ;

export const MOCK_OPEX_DATA_INITIAL = {
  "MINE-OPEX": {
    token_name: "$MINE-OPEX",
    full_name: "Token Extracción",
    current_price: 1.05,
    daily_change: "+3.5%",
    volume_24h: "2.4M",
    market_cap: "8.9M",
    roi_factor: "Eficiencia en Combustible y Ley de Mineral",
    sensor_data: {
      ley_mineral: {
        value: 4.8,
        unit: "g/Tn",
        projected: 4.5,
        label: "Ley de Mineral",
      },
      consumo_combustible: {
        value: 460.1,
        unit: "US$/h-m",
        projected: 461.65,
        label: "Costo Combustible",
      },
      tonelaje_procesado: {
        value: 12500,
        unit: "Tn",
        label: "Tonelaje Extraído",
      },
      horas_maquina: {
        value: 1847,
        unit: "h-m",
        projected: 1920,
        label: "Horas-Máquina",
      },
      trabajadores_activos: {
        value: 42,
        unit: "personas",
        label: "Personal Activo",
      },
    },
    risk_level: "ALTO",
    return_potential: "280%",
    ponderation: "40%",
    description:
      "Financia la extracción de mineral en socavón: maquinaria pesada, combustible, mano de obra y sostenimiento, con verificación via IoT y oráculos.",
  },
  "PROCESS-OPEX": {
    token_name: "$PROCESS-OPEX",
    full_name: "Token Procesamiento",
    current_price: 1.52,
    daily_change: "-1.2%",
    volume_24h: "1.8M",
    market_cap: "6.2M",
    roi_factor: "Tasa de Recuperación y Uso de Reactivos",
    sensor_data: {
      tasa_recuperacion: {
        value: 91.8,
        unit: "%",
        projected: 90.0,
        label: "Recuperación Metalúrgica",
      },
      consumo_cal: {
        value: 1.6,
        unit: "Kg/Tn",
        projected: 2.0,
        label: "Consumo Cal Viva",
      },
      ph_lixiviacion: {
        value: 10.9,
        unit: "pH",
        projected: 11.0,
        label: "pH Lixiviación",
      },
      consumo_reactivo: {
        value: 18.2,
        unit: "% peso",
        projected: 19.0,
        label: "Dosificación YX500",
      },
      energia_consumida: {
        value: 245,
        unit: "kWh/Tn",
        projected: 260,
        label: "Energía Planta",
      },
    },
    risk_level: "MEDIO",
    return_potential: "150%",
    ponderation: "35%",
    description:
      "Financia la transformación metalúrgica: reactivos ecológicos, cal viva, energía y operación de planta, optimizado para ESG.",
  },
  "REFINE-OPEX": {
    token_name: "$REFINE-OPEX",
    full_name: "Token Refinación",
    current_price: 2.1,
    daily_change: "+0.1%",
    volume_24h: "980K",
    market_cap: "4.5M",
    roi_factor: "Comisiones de Refinación y Costos de Custodia",
    sensor_data: {
      tarifa_refinacion: {
        value: 1.5,
        unit: "%",
        projected: 2.0,
        label: "Tarifa Refinación",
      },
      costo_custodia: {
        value: 0.15,
        unit: "% anual",
        projected: 0.18,
        label: "Custodia Anual",
      },
      lingotes_certificados: {
        value: 42,
        unit: "unidades",
        label: "Lingotes Producidos",
      },
      pureza_oro: {
        value: 99.95,
        unit: "%",
        projected: 99.5,
        label: "Pureza del Oro",
      },
      dias_ciclo: {
        value: 28,
        unit: "días",
        projected: 30,
        label: "Tiempo de Ciclo",
      },
    },
    risk_level: "BAJO",
    return_potential: "75%",
    ponderation: "25%",
    description:
      "Financia el refinado final: tarifas de tolling, seguros de custodia y gastos administrativos, con custodia en bóvedas certificadas.",
  },
  IGC: {
    token_name: "IGC",
    full_name: "Inka Gold Coin",
    current_price: (globalData.GOLD_SPOT_PRICE_USD_PER_OZ / 31.1).toFixed(2),
    daily_change: "+0.82%",
    user_balance: 550.0,
    backed_asset: "Oro Físico 99.99%",
    volume_24h: "12.5M",
    market_cap: "145M",
    description:
      "Moneda de reserva respaldada 1:1 por oro físico certificado en bóveda, con liquidación via smart contracts.",
  },
};

// Función para generar historia de precios con variabilidad realista
export const generatePriceHistory = (
  basePrice,
  days = 30,
  volatility = 0.02
) => {
  const history = [];
  let price = basePrice;
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.5) * volatility * price;
    price = Math.max(price + change, basePrice * 0.8); // Evitar caídas irreales
    history.push({ day: days - i, price: parseFloat(price.toFixed(2)) });
  }
  return history;
};

// Función para simular actualizaciones de datos oracle (cada 30s)
export const simulateOracleUpdate = (data) => {
  const newData = { ...data };
  Object.keys(newData).forEach((key) => {
    if (newData[key].sensor_data) {
      Object.keys(newData[key].sensor_data).forEach((sensorKey) => {
        const sensor = newData[key].sensor_data[sensorKey];
        if (sensor.value) {
          sensor.value += (Math.random() - 0.5) * 0.05 * sensor.value; // Fluctuación pequeña reducida
          sensor.value = parseFloat(sensor.value.toFixed(2));
        }
      });
    }
  });
  return newData;
};
