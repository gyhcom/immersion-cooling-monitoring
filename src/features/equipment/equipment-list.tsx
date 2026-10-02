"use client"

import Link from "next/link"
import { ChevronRight, Cpu, Server, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusPill } from "@/components/status-pill"
import { useSimulator } from "@/features/simulator/simulator-provider"

export function EquipmentList() {
  const { tanks } = useSimulator()
  return (
    <div className="mx-auto max-w-[1680px] space-y-5">
      <div><p className="text-sm font-medium text-cyan-300">EQUIPMENT</p><h1 className="mt-1 text-2xl font-semibold">장비 계층 및 운전 현황</h1><p className="mt-1 text-sm text-muted-foreground">1 Site · 4 Tanks · 16 Servers · 64 GPUs (데모 가정)</p></div>
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="bg-card/75 shadow-none"><CardContent className="flex items-center gap-4 p-4"><Waves className="size-8 text-cyan-300" /><div><p className="text-sm text-muted-foreground">Tanks</p><strong className="metric-number text-xl">4</strong></div></CardContent></Card>
        <Card className="bg-card/75 shadow-none"><CardContent className="flex items-center gap-4 p-4"><Server className="size-8 text-violet-300" /><div><p className="text-sm text-muted-foreground">Servers</p><strong className="metric-number text-xl">16</strong></div></CardContent></Card>
        <Card className="bg-card/75 shadow-none"><CardContent className="flex items-center gap-4 p-4"><Cpu className="size-8 text-emerald-300" /><div><p className="text-sm text-muted-foreground">GPUs</p><strong className="metric-number text-xl">64</strong></div></CardContent></Card>
      </div>
      <Card className="bg-card/75 shadow-none">
        <CardHeader className="border-b"><CardTitle className="text-base">Tank Inventory</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>장비</TableHead><TableHead>상태</TableHead><TableHead>서버 / GPU</TableHead><TableHead>Inlet / Outlet</TableHead><TableHead>Flow</TableHead><TableHead>Pressure</TableHead><TableHead className="text-right">상세</TableHead></TableRow></TableHeader>
            <TableBody>{tanks.map((tank) => <TableRow key={tank.id}>
              <TableCell><strong>{tank.name}</strong><span className="ml-2 text-xs text-muted-foreground">{tank.zone}</span></TableCell>
              <TableCell><StatusPill value={tank.status} /></TableCell>
              <TableCell>{tank.serverCount} / {tank.gpuCount}</TableCell>
              <TableCell className="metric-number">{tank.inletTemp} / {tank.outletTemp} °C</TableCell>
              <TableCell className="metric-number">{tank.flowRate} L/min</TableCell>
              <TableCell className="metric-number">{tank.pressure} bar</TableCell>
              <TableCell className="text-right"><Button asChild variant="ghost" size="sm"><Link href={`/equipment/${tank.id}`}>열기 <ChevronRight /></Link></Button></TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
