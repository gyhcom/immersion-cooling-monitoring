"use client"

import Link from "next/link"
import { ArrowLeft, Droplets, Gauge, RotateCw, Thermometer, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MetricCard } from "@/components/metric-card"
import { StatusPill } from "@/components/status-pill"
import { TankSchematic } from "@/components/tank-schematic"
import { TrendChart } from "@/components/trend-chart"
import { MOCK_SCOPE_NOTE } from "@/config/mock-thresholds"
import { useSimulator } from "@/features/simulator/simulator-provider"

export function EquipmentDetail({ equipmentId }: { equipmentId: string }) {
  const { tanks, trend } = useSimulator()
  const tank = tanks.find((item) => item.id === equipmentId) ?? tanks[0]
  const deltaT = (tank.outletTemp - tank.inletTemp).toFixed(1)
  return (
    <div className="mx-auto max-w-[1680px] space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div><Button asChild variant="ghost" size="sm" className="-ml-2 mb-2 text-muted-foreground"><Link href="/equipment"><ArrowLeft /> 장비 목록</Link></Button><div className="flex items-center gap-3"><h1 className="text-2xl font-semibold">{tank.name}</h1><StatusPill value={tank.status} /></div><p className="mt-1 text-sm text-muted-foreground">{tank.zone} · 4 Servers · 16 GPUs · 실시간 장비 상세</p></div>
        <p className="text-xs text-muted-foreground">{MOCK_SCOPE_NOTE}</p>
      </div>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Inlet Temp" value={`${tank.inletTemp} °C`} detail="냉각수 유입" icon={Thermometer} />
        <MetricCard label="Outlet Temp" value={`${tank.outletTemp} °C`} detail={`ΔT ${deltaT} °C`} icon={Thermometer} accent={tank.status === "critical" ? "text-red-300" : tank.status === "warning" ? "text-amber-300" : "text-cyan-300"} />
        <MetricCard label="Flow Rate" value={`${tank.flowRate}`} detail="L/min" icon={Droplets} accent="text-emerald-300" />
        <MetricCard label="Pressure" value={`${tank.pressure}`} detail="bar" icon={Gauge} accent="text-violet-300" />
        <MetricCard label="Pump Speed" value={`${tank.pumpSpeed}%`} detail="Pump-01 / Running" icon={RotateCw} />
      </section>
      <section className="grid gap-5 xl:grid-cols-[minmax(330px,0.72fr)_minmax(0,1.4fr)]">
        <Card className="bg-card/75 shadow-none"><CardHeader className="border-b"><CardTitle className="text-base">Cooling Circuit</CardTitle></CardHeader><CardContent className="p-4"><TankSchematic tank={tank} /><div className="mt-2 grid grid-cols-2 gap-3 border-t pt-4 text-sm"><div><span className="text-muted-foreground">IT Power</span><strong className="metric-number float-right">{tank.powerKw} kW</strong></div><div><span className="text-muted-foreground">Fluid Level</span><strong className="metric-number float-right">{tank.fluidLevel}%</strong></div></div></CardContent></Card>
        <Card className="bg-card/75 shadow-none"><CardHeader className="border-b"><CardTitle className="text-base">Telemetry Trend</CardTitle><p className="mt-1 text-sm text-muted-foreground">온도·유량 변화와 데모 Warning 기준을 함께 표시합니다.</p></CardHeader><CardContent className="p-3"><TrendChart data={trend} /></CardContent></Card>
      </section>
      <Card className="bg-card/75 shadow-none"><CardHeader className="border-b"><CardTitle className="text-base">Server & GPU Summary</CardTitle></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Server</TableHead><TableHead>Status</TableHead><TableHead>GPU Temp</TableHead><TableHead>GPU Load</TableHead><TableHead>GPU Power</TableHead></TableRow></TableHeader><TableBody>{[1,2,3,4].map((server, index) => <TableRow key={server}><TableCell className="font-medium">Server-{String(server).padStart(2,"0")}</TableCell><TableCell><StatusPill value={tank.status === "critical" && index === 2 ? "warning" : "normal"} /></TableCell><TableCell className="metric-number">{tank.status === "critical" && index === 2 ? "82.6" : (61.8 + index * 1.4).toFixed(1)} °C</TableCell><TableCell className="metric-number">{87 + index * 2}%</TableCell><TableCell className="metric-number"><span className="inline-flex items-center gap-1"><Zap className="size-3.5 text-amber-300" />{(10.2 + index * 0.4).toFixed(1)} kW</span></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
    </div>
  )
}
