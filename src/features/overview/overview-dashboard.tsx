"use client"

import Link from "next/link"
import { Activity, Radio, Thermometer } from "lucide-react"
import { ActiveAlarmSummary } from "@/components/active-alarm-summary"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewKpiCard } from "@/components/overview-kpi-card"
import { OverviewSystemFlow } from "@/components/overview-system-flow"
import { StatusPill } from "@/components/status-pill"
import { TankLiveCard } from "@/components/tank-live-card"
import { useSimulator } from "@/features/simulator/simulator-provider"

export function OverviewDashboard() {
  const { tanks, alarms, scenario } = useSimulator()
  const activeAlarms = alarms.filter((alarm) => alarm.lifecycle !== "resolved")
  const normalCount = tanks.filter((tank) => tank.status === "normal").length
  const critical = tanks.some((tank) => tank.status === "critical")
  const hottestTank = tanks.reduce((current, tank) => tank.outletTemp > current.outletTemp ? tank : current)
  const siteTone = critical ? "red" : activeAlarms.length ? "amber" : "emerald"

  return (
    <div className="mx-auto max-w-[1680px] space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-cyan-300">SITE OVERVIEW</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Seoul Demo Site</h1>
          <p className="mt-1 text-sm text-muted-foreground">Site → Tank → Server → GPU 계층의 현재 운전 상태</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><span className="size-2 rounded-full bg-emerald-300" /> Mock stream connected · {scenario.toUpperCase()}</div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="주요 운영 지표">
        <OverviewKpiCard label="Site Health" value={critical ? "Critical" : activeAlarms.length ? "Attention" : "Normal"} detail={activeAlarms[0] ? `${activeAlarms[0].equipmentName} · ${activeAlarms[0].message}` : "전체 냉각 계통 정상 운전"} icon={Activity} tone={siteTone} live footer={<div className="flex gap-1.5" aria-label={`정상 ${normalCount}대, 주의 또는 위험 ${tanks.length - normalCount}대`}>{tanks.map((tank) => <span key={tank.id} className={`h-1.5 flex-1 rounded-full ${tank.status === "critical" ? "bg-red-400" : tank.status === "warning" ? "bg-amber-400" : "bg-emerald-400"}`} />)}</div>} />
        <OverviewKpiCard label="Tank Connectivity" value={`${tanks.length} / ${tanks.length}`} detail="4대 모두 운전 데이터 수신 중" icon={Radio} tone="cyan" badge="Online" live footer={<div className="flex items-center justify-between border-t border-border/70 pt-2 text-[11px] text-muted-foreground"><span>수신 상태</span><span className="font-mono text-cyan-300">1 sec interval</span></div>} />
        <OverviewKpiCard label="Max Outlet Temp" value={`${hottestTank.outletTemp} °C`} detail={`${hottestTank.name} · 최고 출구 온도`} icon={Thermometer} tone={hottestTank.status === "critical" ? "red" : hottestTank.status === "warning" ? "amber" : "cyan"} badge={hottestTank.status === "normal" ? "Normal" : hottestTank.status === "warning" ? "Warning" : "Critical"} footer={<div className="relative h-1.5 overflow-hidden rounded-full bg-secondary"><div className={`h-full rounded-full transition-[width] duration-500 ${hottestTank.status === "critical" ? "bg-red-400" : hottestTank.status === "warning" ? "bg-amber-400" : "bg-cyan-300"}`} style={{ width: `${Math.min(100, Math.max(12, ((hottestTank.outletTemp - 25) / 25) * 100))}%` }} /></div>} />
        <ActiveAlarmSummary alarms={activeAlarms} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.8fr)]">
        <OverviewSystemFlow tanks={tanks} scenario={scenario} />

        <Card className="border-border/90 bg-card/75 shadow-none">
          <CardHeader className="border-b"><CardTitle className="text-base">Alarm Feed</CardTitle><p className="mt-1 text-sm text-muted-foreground">Severity와 처리 상태를 분리해 표시합니다.</p></CardHeader>
          <CardContent className="space-y-3 p-4">
            {alarms.slice(0, 3).map((alarm) => (
              <div key={alarm.id} className="panel-line rounded-md border bg-background/35 p-3">
                <div className="flex items-center justify-between gap-2"><div className="flex gap-2"><StatusPill value={alarm.severity} /><StatusPill value={alarm.lifecycle} /></div><span className="text-xs text-muted-foreground">{alarm.occurredAt}</span></div>
                <p className="mt-3 text-sm font-medium">{alarm.message}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground"><span>{alarm.equipmentName}</span><span>{alarm.value}</span></div>
              </div>
            ))}
            <Button asChild variant="secondary" className="w-full"><Link href="/alarms">Alarm Center 열기</Link></Button>
          </CardContent>
        </Card>
      </section>

      <Card className="border-border/90 bg-card/75 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div><CardTitle className="text-base">Tank Operations</CardTitle><p className="mt-1 text-sm text-muted-foreground">회전하는 펌프와 이동 표시로 현재 운전 상태를 보여줍니다.</p></div>
          <Button asChild variant="outline" size="sm"><Link href="/equipment">전체 장비</Link></Button>
        </CardHeader>
        <CardContent className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
          {tanks.map((tank) => <TankLiveCard key={tank.id} tank={tank} />)}
        </CardContent>
      </Card>
    </div>
  )
}
