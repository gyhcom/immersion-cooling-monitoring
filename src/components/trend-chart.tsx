"use client"

import dynamic from "next/dynamic"
import type { EChartsOption } from "echarts"
import type { TrendPoint } from "@/types/monitoring"

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

export function TrendChart({ data }: { data: TrendPoint[] }) {
  const latest = data.at(-1) ?? { time: "--:--", inlet: 0, outlet: 0, flow: 0 }
  const liveWindowStart = data.at(-5)?.time ?? data[0]?.time
  const option: EChartsOption = {
    backgroundColor: "transparent",
    animationDuration: 500,
    animationDurationUpdate: 700,
    animationEasingUpdate: "cubicOut",
    tooltip: {
      trigger: "axis",
      backgroundColor: "#0d1b22",
      borderColor: "#2b4650",
      textStyle: { color: "#edf7fa" },
      axisPointer: { type: "line", lineStyle: { color: "#5b7a85", type: "dashed" } },
    },
    legend: { top: 0, right: 0, textStyle: { color: "#8da5ad" }, data: ["Inlet °C", "Outlet °C", "Flow L/min"] },
    grid: { left: 44, right: 44, top: 38, bottom: 28 },
    xAxis: { type: "category", boundaryGap: false, data: data.map((point) => point.time), axisLine: { lineStyle: { color: "#29414a" } }, axisLabel: { color: "#78919a", interval: 3 } },
    yAxis: [
      { type: "value", min: 20, max: 52, axisLabel: { color: "#78919a" }, splitLine: { lineStyle: { color: "#172a32" } } },
      { type: "value", min: 55, max: 110, axisLabel: { color: "#78919a" }, splitLine: { show: false } },
    ],
    series: [
      {
        name: "Inlet °C",
        type: "line",
        smooth: true,
        showSymbol: false,
        data: data.map((point) => point.inlet),
        lineStyle: { color: "#38d7e7", width: 2 },
        itemStyle: { color: "#38d7e7" },
        areaStyle: { color: "rgba(56, 215, 231, 0.08)" },
        markArea: liveWindowStart ? { silent: true, label: { show: false }, itemStyle: { color: "rgba(56, 215, 231, 0.035)" }, data: [[{ xAxis: liveWindowStart }, { xAxis: latest.time }]] } : undefined,
      },
      {
        name: "Outlet °C",
        type: "line",
        smooth: true,
        showSymbol: false,
        data: data.map((point) => point.outlet),
        lineStyle: { color: "#f4b947", width: 2 },
        itemStyle: { color: "#f4b947" },
        areaStyle: { color: "rgba(244, 185, 71, 0.055)" },
        markLine: { symbol: "none", silent: true, label: { formatter: "Warning 38°C", color: "#f4b947" }, lineStyle: { color: "#f4b947", type: "dashed", opacity: 0.6 }, data: [{ yAxis: 38 }] },
      },
      { name: "Flow L/min", type: "line", yAxisIndex: 1, smooth: true, showSymbol: false, data: data.map((point) => point.flow), lineStyle: { color: "#7ae2ae", width: 1.5, type: "dotted" }, itemStyle: { color: "#7ae2ae" } },
      { name: "Live Inlet", type: "effectScatter", silent: true, tooltip: { show: false }, data: [[latest.time, latest.inlet]], symbolSize: 7, itemStyle: { color: "#38d7e7" }, rippleEffect: { scale: 3, brushType: "stroke" }, z: 10 },
      { name: "Live Outlet", type: "effectScatter", silent: true, tooltip: { show: false }, data: [[latest.time, latest.outlet]], symbolSize: 7, itemStyle: { color: "#f4b947" }, rippleEffect: { scale: 3, brushType: "stroke" }, z: 10 },
      { name: "Live Flow", type: "effectScatter", yAxisIndex: 1, silent: true, tooltip: { show: false }, data: [[latest.time, latest.flow]], symbolSize: 6, itemStyle: { color: "#7ae2ae" }, rippleEffect: { scale: 3, brushType: "stroke" }, z: 10 },
    ],
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-1 text-xs">
        <span className="inline-flex items-center gap-2 font-medium text-cyan-200"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-300 opacity-70" /><span className="relative inline-flex size-2 rounded-full bg-cyan-300" /></span>LIVE STREAM · 1 sec</span>
        <div className="flex items-center gap-3 text-muted-foreground"><span>In <strong className="metric-number text-cyan-200">{latest.inlet}°</strong></span><span>Out <strong className="metric-number text-amber-300">{latest.outlet}°</strong></span><span>Flow <strong className="metric-number text-emerald-300">{latest.flow}</strong></span></div>
      </div>
      <div className="relative overflow-hidden rounded-md">
        <span className="chart-live-scan" aria-hidden="true" />
        <ReactECharts option={option} style={{ height: 270, width: "100%" }} notMerge lazyUpdate />
      </div>
    </div>
  )
}
