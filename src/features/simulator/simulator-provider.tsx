"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { buildAlarms, buildTanks, buildTrend } from "@/data/mock-site"
import type { Alarm, Scenario, Tank, TrendPoint } from "@/types/monitoring"

type SimulatorContextValue = {
  scenario: Scenario
  tanks: Tank[]
  alarms: Alarm[]
  trend: TrendPoint[]
  lastUpdated: string
  applyScenario: (scenario: Scenario) => void
  acknowledgeAlarm: (id: string) => void
}

const SimulatorContext = createContext<SimulatorContextValue | null>(null)

export function SimulatorProvider({ children }: { children: React.ReactNode }) {
  const [scenario, setScenario] = useState<Scenario>("warning")
  const [tick, setTick] = useState(0)
  const [lastUpdated, setLastUpdated] = useState("연결 준비")
  const [acknowledged, setAcknowledged] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    const update = () => {
      setTick((value) => value + 1)
      setLastUpdated(new Intl.DateTimeFormat("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date()))
    }
    update()
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [])

  const value = useMemo(() => ({
    scenario,
    tanks: buildTanks(scenario, tick),
    alarms: buildAlarms(scenario, acknowledged),
    trend: buildTrend(scenario, tick),
    lastUpdated,
    applyScenario: (nextScenario: Scenario) => {
      setScenario(nextScenario)
      setAcknowledged(new Set())
    },
    acknowledgeAlarm: (id: string) => setAcknowledged((current) => new Set(current).add(id)),
  }), [acknowledged, lastUpdated, scenario, tick])

  return <SimulatorContext.Provider value={value}>{children}</SimulatorContext.Provider>
}

export function useSimulator() {
  const context = useContext(SimulatorContext)
  if (!context) throw new Error("useSimulator must be used inside SimulatorProvider")
  return context
}
