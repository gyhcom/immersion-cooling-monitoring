export type HealthStatus = "normal" | "warning" | "critical" | "offline"
export type Scenario = "normal" | "warning" | "critical" | "recovery"
export type AlarmSeverity = "info" | "warning" | "critical"
export type AlarmLifecycle = "active" | "acknowledged" | "resolved"

export type Tank = {
  id: string
  name: string
  zone: string
  status: HealthStatus
  serverCount: number
  gpuCount: number
  inletTemp: number
  outletTemp: number
  flowRate: number
  pressure: number
  fluidLevel: number
  pumpSpeed: number
  powerKw: number
}

export type Alarm = {
  id: string
  severity: AlarmSeverity
  lifecycle: AlarmLifecycle
  equipmentId: string
  equipmentName: string
  message: string
  value: string
  threshold: string
  occurredAt: string
}

export type TrendPoint = {
  time: string
  inlet: number
  outlet: number
  flow: number
}
