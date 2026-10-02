export const MOCK_THRESHOLDS = {
  outletTemp: { warning: 38, critical: 44, unit: "°C" },
  flowRate: { warning: 82, critical: 70, unit: "L/min" },
  pressure: { warning: 1.8, critical: 2.1, unit: "bar" },
  fluidLevel: { warning: 72, critical: 65, unit: "%" },
} as const

export const MOCK_SCOPE_NOTE = "데모 전용 가상 임계치 · 고객 협의 후 확정"
