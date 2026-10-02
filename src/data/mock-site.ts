import type { Alarm, HealthStatus, Scenario, Tank, TrendPoint } from "@/types/monitoring"

const baseTanks = [
  { id: "tank-01", name: "Tank-01", zone: "Zone A", inlet: 28.2, outlet: 33.6, flow: 96, pressure: 1.42, level: 91, pump: 72, power: 168.4 },
  { id: "tank-02", name: "Tank-02", zone: "Zone A", inlet: 28.5, outlet: 34.1, flow: 94, pressure: 1.46, level: 88, pump: 74, power: 171.8 },
  { id: "tank-03", name: "Tank-03", zone: "Zone B", inlet: 30.8, outlet: 39.4, flow: 84, pressure: 1.72, level: 79, pump: 88, power: 176.2 },
  { id: "tank-04", name: "Tank-04", zone: "Zone B", inlet: 27.9, outlet: 33.2, flow: 98, pressure: 1.39, level: 93, pump: 70, power: 165.1 },
] as const

function tank03Values(scenario: Scenario) {
  if (scenario === "critical") return { inlet: 33.6, outlet: 47.2, flow: 68, pressure: 2.16, level: 68, pump: 100, power: 181.9 }
  if (scenario === "recovery") return { inlet: 29.4, outlet: 35.7, flow: 92, pressure: 1.56, level: 80, pump: 82, power: 173.6 }
  if (scenario === "normal") return { inlet: 28.7, outlet: 34.6, flow: 95, pressure: 1.48, level: 82, pump: 76, power: 172.4 }
  return { inlet: 30.8, outlet: 39.4, flow: 84, pressure: 1.72, level: 79, pump: 88, power: 176.2 }
}

export function buildTanks(scenario: Scenario, tick: number): Tank[] {
  const pulse = Math.sin(tick / 2) * 0.24
  return baseTanks.map((tank) => {
    const values = tank.id === "tank-03" ? tank03Values(scenario) : tank
    const status: HealthStatus = tank.id !== "tank-03" ? "normal" : scenario === "critical" ? "critical" : scenario === "warning" ? "warning" : "normal"
    return {
      id: tank.id,
      name: tank.name,
      zone: tank.zone,
      status,
      serverCount: 4,
      gpuCount: 16,
      inletTemp: Number((values.inlet + pulse).toFixed(1)),
      outletTemp: Number((values.outlet + pulse * 1.5).toFixed(1)),
      flowRate: Number((values.flow + Math.sin(tick) * 0.7).toFixed(1)),
      pressure: Number((values.pressure + pulse * 0.03).toFixed(2)),
      fluidLevel: values.level,
      pumpSpeed: values.pump,
      powerKw: Number((values.power + pulse * 2).toFixed(1)),
    }
  })
}

export function buildAlarms(scenario: Scenario, acknowledged: Set<string>): Alarm[] {
  const lifecycle = (id: string, fallback: "active" | "resolved") => acknowledged.has(id) ? "acknowledged" as const : fallback
  const current: Alarm[] = scenario === "critical" ? [{
    id: "ALM-2026-1042", severity: "critical", lifecycle: lifecycle("ALM-2026-1042", "active"), equipmentId: "tank-03", equipmentName: "Tank-03",
    message: "냉각수 출구 온도 임계치 초과", value: "47.2 °C", threshold: "> 44.0 °C", occurredAt: "방금 전",
  }] : scenario === "warning" ? [{
    id: "ALM-2026-1038", severity: "warning", lifecycle: lifecycle("ALM-2026-1038", "active"), equipmentId: "tank-03", equipmentName: "Tank-03",
    message: "냉각수 출구 온도 상승", value: "39.4 °C", threshold: "> 38.0 °C", occurredAt: "3분 전",
  }] : scenario === "recovery" ? [{
    id: "ALM-2026-1042", severity: "critical", lifecycle: "resolved", equipmentId: "tank-03", equipmentName: "Tank-03",
    message: "냉각수 출구 온도 정상 복귀", value: "35.7 °C", threshold: "≤ 38.0 °C", occurredAt: "1분 전",
  }] : []

  return [...current, {
    id: "ALM-2026-1029", severity: "warning", lifecycle: "resolved", equipmentId: "tank-02", equipmentName: "Tank-02",
    message: "Pump-02 순간 유량 저하", value: "78.6 L/min", threshold: "< 82 L/min", occurredAt: "오늘 09:18",
  }, {
    id: "ALM-2026-1014", severity: "info", lifecycle: "resolved", equipmentId: "tank-04", equipmentName: "Tank-04",
    message: "정기 점검 모드 종료", value: "정상", threshold: "—", occurredAt: "어제 17:42",
  }]
}

export function buildTrend(scenario: Scenario, tick: number): TrendPoint[] {
  const target = tank03Values(scenario)
  return Array.from({ length: 24 }, (_, index) => {
    const transition = index > 16 ? (index - 16) / 7 : 0
    const outletTarget = scenario === "critical" ? 39.2 + (target.outlet - 39.2) * transition : target.outlet
    return {
      time: `${String(10 + Math.floor(index / 6)).padStart(2, "0")}:${String((index % 6) * 10).padStart(2, "0")}`,
      inlet: Number((target.inlet - 0.5 + Math.sin(index * 0.7 + tick * 0.05) * 0.35).toFixed(1)),
      outlet: Number((outletTarget + Math.sin(index * 0.55) * 0.55).toFixed(1)),
      flow: Number((target.flow + Math.cos(index * 0.6) * 2.2).toFixed(1)),
    }
  })
}
