"use client"

import Link from "next/link"
import { Activity, Gauge, Waves } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusPill } from "@/components/status-pill"
import type { Scenario, Tank } from "@/types/monitoring"

export function OverviewSystemFlow({ tanks, scenario }: { tanks: Tank[]; scenario: Scenario }) {
  const hottestTank = tanks.reduce((current, tank) => tank.outletTemp > current.outletTemp ? tank : current)
  const totalFlow = tanks.reduce((sum, tank) => sum + tank.flowRate, 0).toFixed(0)

  return (
    <Card className="border-border/90 bg-card/75 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div>
          <CardTitle className="flex items-center gap-2 text-base"><Activity className="size-4 text-cyan-300" /> Live Cooling Loop</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Facility Water부터 GPU Tank까지 냉각 유체의 현재 흐름</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex"><span className="text-xs text-muted-foreground">Loop Status</span><StatusPill value={scenario === "critical" ? "critical" : scenario === "warning" ? "warning" : "normal"} /></div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="overflow-x-auto rounded-lg border border-border bg-background/45">
          <svg viewBox="0 0 980 260" role="img" aria-label="실시간 액침냉각 설비 흐름도" className="min-w-[780px] w-full">
            <path className="flow-return" d="M868 181 V226 H90 V167" fill="none" stroke="#25414a" strokeWidth="3" />
            <path className="flow-line" d="M150 126 H226 M348 126 H410 M462 126 H520 M706 126 H784" fill="none" stroke="#38d7e7" strokeWidth="4" strokeLinecap="round" />
            <path className="flow-line-return" d="M868 181 V226 H90 V167" fill="none" stroke="#f4b947" strokeWidth="3" strokeLinecap="round" />

            <g transform="translate(30 86)">
              <rect width="120" height="80" rx="12" fill="#0b171d" stroke="#2b4c56" strokeWidth="2" />
              <path d="M28 34c12-12 24 12 36 0s24 12 36 0" fill="none" stroke="#38d7e7" strokeWidth="3" />
              <text x="60" y="59" textAnchor="middle" fill="#edf7fa" fontSize="13" fontWeight="600">FACILITY WATER</text>
              <text x="60" y="74" textAnchor="middle" fill="#8da5ad" fontSize="10">27.4 °C · 382 L/min</text>
            </g>

            <g transform="translate(226 76)">
              <rect width="122" height="100" rx="12" fill="#0b171d" stroke="#2b4c56" strokeWidth="2" />
              <path d="M26 34h70M26 46h70M26 58h70" stroke="#38d7e7" strokeWidth="3" strokeLinecap="round" />
              <text x="61" y="77" textAnchor="middle" fill="#edf7fa" fontSize="14" fontWeight="600">CDU-01</text>
              <text x="61" y="92" textAnchor="middle" fill="#8da5ad" fontSize="10">Heat Exchange</text>
            </g>

            <g transform="translate(410 100)">
              <circle cx="26" cy="26" r="25" fill="#0b171d" stroke="#38d7e7" strokeWidth="2" />
              <g className="pump-rotor">
                <path d="M26 8c8 0 12 6 9 13-3 6-9 5-9 5M44 26c0 8-6 12-13 9-6-3-5-9-5-9M26 44c-8 0-12-6-9-13 3-6 9-5 9-5M8 26c0-8 6-12 13-9 6 3 5 9 5 9" fill="none" stroke="#38d7e7" strokeWidth="3" strokeLinecap="round" />
              </g>
              <text x="26" y="68" textAnchor="middle" fill="#edf7fa" fontSize="12" fontWeight="600">PUMP</text>
              <text x="26" y="81" textAnchor="middle" fill="#8da5ad" fontSize="9">88%</text>
            </g>

            <g transform="translate(520 80)">
              {tanks.map((tank, index) => {
                const x = index * 47
                const fillHeight = 72 * (tank.fluidLevel / 100)
                const statusColor = tank.status === "critical" ? "#ff6b73" : tank.status === "warning" ? "#f4b947" : "#38d7e7"
                return (
                  <Link href={`/equipment/${tank.id}`} key={tank.id} aria-label={`${tank.name} 상세 보기`} className="tank-link outline-none">
                    <g transform={`translate(${x} 0)`} className="tank-node cursor-pointer">
                      <rect className="tank-selection-frame" x="-6" y="-8" width="48" height="116" rx="12" />
                      <g className="tank-selection-label" aria-hidden="true">
                        <rect x="-1" y="-27" width="38" height="17" rx="8.5" />
                        <text x="18" y="-15" textAnchor="middle">선택</text>
                      </g>
                      <rect width="36" height="92" rx="8" fill="#071015" stroke={statusColor} strokeWidth="2" />
                      <rect x="4" y={88 - fillHeight} width="28" height={fillHeight} rx="4" fill={statusColor} opacity="0.26" />
                      <path className="tank-wave" d={`M4 ${88 - fillHeight} Q11 ${85 - fillHeight} 18 ${88 - fillHeight} T32 ${88 - fillHeight}`} fill="none" stroke={statusColor} strokeWidth="2" />
                      <text x="18" y="110" textAnchor="middle" fill="#edf7fa" fontSize="10">T{index + 1}</text>
                    </g>
                  </Link>
                )
              })}
            </g>

            <g transform="translate(784 72)">
              <rect width="168" height="109" rx="12" fill="#0b171d" stroke="#2b4c56" strokeWidth="2" />
              {[0, 1, 2, 3].map((row) => [0, 1, 2, 3].map((column) => (
                <rect key={`${row}-${column}`} className="gpu-cell" x={18 + column * 34} y={16 + row * 17} width="24" height="10" rx="2" fill="#16323a" stroke="#38d7e7" strokeWidth="0.8" style={{ animationDelay: `${(row + column) * 90}ms` }} />
              )))}
              <text x="84" y="93" textAnchor="middle" fill="#edf7fa" fontSize="13" fontWeight="600">GPU COMPUTE</text>
              <text x="84" y="105" textAnchor="middle" fill="#8da5ad" fontSize="10">16 Servers · 64 GPUs</text>
            </g>

            <g transform="translate(33 203)">
              <circle cx="9" cy="9" r="8" fill="#10262e" stroke="#f4b947" />
              <path d="M5 9h8M9 5v8" stroke="#f4b947" strokeWidth="1.5" />
              <text x="24" y="13" fill="#8da5ad" fontSize="10">RETURN · 32.8 °C</text>
            </g>

          </svg>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2"><Waves className="size-3.5 text-cyan-300" /> 점선의 이동 방향이 현재 냉각수 흐름을 나타냅니다.</span>
          <span className="inline-flex items-center gap-2"><Gauge className="size-3.5 text-amber-300" /> Tank를 선택하면 상세 Trend로 이동합니다.</span>
        </div>
        <div className="mt-3 overflow-hidden rounded-lg border border-border bg-background/35">
          <div className="flex flex-col items-start justify-between gap-2 border-b border-border/80 px-3 py-2 text-xs sm:flex-row sm:items-center">
            <span className="font-medium text-foreground">Tank Live Summary</span>
            <div className="flex w-full items-center justify-between gap-3 text-muted-foreground sm:w-auto"><span>총 유량 <strong className="metric-number text-foreground">{totalFlow} L/min</strong></span><span>최고 온도 <strong className={hottestTank.status === "critical" ? "text-red-300" : hottestTank.status === "warning" ? "text-amber-300" : "text-foreground"}>{hottestTank.outletTemp} °C</strong></span></div>
          </div>
          <div className="divide-y divide-border/70">
            {tanks.map((tank) => (
              <Link key={tank.id} href={`/equipment/${tank.id}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-3 py-2 text-xs transition hover:bg-accent/25 sm:grid-cols-[minmax(0,1fr)_auto_72px_72px_64px]">
                <div className="min-w-0"><span className="font-medium text-foreground">{tank.name}</span><span className="ml-2 text-muted-foreground">{tank.zone}</span></div>
                <StatusPill value={tank.status} className="h-5 px-1.5 text-[10px]" />
                <div className="col-span-2 grid grid-cols-3 gap-3 text-muted-foreground sm:col-span-1 sm:contents">
                  <span>Outlet <strong className="metric-number ml-1 text-foreground">{tank.outletTemp}°</strong></span>
                  <span>Flow <strong className="metric-number ml-1 text-foreground">{tank.flowRate}</strong></span>
                  <span>Pump <strong className="metric-number ml-1 text-foreground">{tank.pumpSpeed}%</strong></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
