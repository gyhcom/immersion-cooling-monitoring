"use client"

import Link from "next/link"
import { Activity, Cpu, Waves } from "lucide-react"
import { ActiveAlarmSummary } from "@/components/active-alarm-summary"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/metric-card"
import { OverviewSystemFlow } from "@/components/overview-system-flow"
import { StatusPill } from "@/components/status-pill"
import { TankLiveCard } from "@/components/tank-live-card"
import { useSimulator } from "@/features/simulator/simulator-provider"

export function OverviewDashboard() {
  const { tanks, alarms, scenario } = useSimulator()
  const activeAlarms = alarms.filter((alarm) => alarm.lifecycle !== "resolved")
  const normalCount = tanks.filter((tank) => tank.status === "normal").length
  const critical = tanks.some((tank) => tank.status === "critical")

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
        <MetricCard label="Site Health" value={critical ? "Critical" : activeAlarms.length ? "Attention" : "Normal"} detail={`${normalCount}/4 Tanks 정상 운전`} icon={Activity} accent={critical ? "text-red-300" : "text-cyan-300"} />
        <MetricCard label="Active Tanks" value="4 / 4" detail="총 16 Servers" icon={Waves} />
        <MetricCard label="GPU Fleet" value="64" detail="가상 GPU 장비 규모" icon={Cpu} accent="text-violet-300" />
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
