"use client"

import dynamic from "next/dynamic"
import type { EChartsOption } from "echarts"
import type { TrendPoint } from "@/types/monitoring"

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false })

export function TrendChart({ data }: { data: TrendPoint[] }) {
  const option: EChartsOption = {
    backgroundColor: "transparent",
    animationDuration: 450,
    tooltip: { trigger: "axis", backgroundColor: "#0d1b22", borderColor: "#2b4650", textStyle: { color: "#edf7fa" } },
    legend: { top: 0, right: 0, textStyle: { color: "#8da5ad" }, data: ["Inlet °C", "Outlet °C", "Flow L/min"] },
    grid: { left: 44, right: 44, top: 38, bottom: 28 },
    xAxis: { type: "category", boundaryGap: false, data: data.map((point) => point.time), axisLine: { lineStyle: { color: "#29414a" } }, axisLabel: { color: "#78919a", interval: 3 } },
    yAxis: [
      { type: "value", min: 20, max: 52, axisLabel: { color: "#78919a" }, splitLine: { lineStyle: { color: "#172a32" } } },
      { type: "value", min: 55, max: 110, axisLabel: { color: "#78919a" }, splitLine: { show: false } },
    ],
    series: [
      { name: "Inlet °C", type: "line", smooth: true, showSymbol: false, data: data.map((point) => point.inlet), lineStyle: { color: "#38d7e7", width: 2 }, itemStyle: { color: "#38d7e7" } },
      { name: "Outlet °C", type: "line", smooth: true, showSymbol: false, data: data.map((point) => point.outlet), lineStyle: { color: "#f4b947", width: 2 }, itemStyle: { color: "#f4b947" }, markLine: { symbol: "none", silent: true, label: { formatter: "Warning 38°C", color: "#f4b947" }, lineStyle: { color: "#f4b947", type: "dashed", opacity: 0.6 }, data: [{ yAxis: 38 }] } },
      { name: "Flow L/min", type: "line", yAxisIndex: 1, smooth: true, showSymbol: false, data: data.map((point) => point.flow), lineStyle: { color: "#7ae2ae", width: 1.5, type: "dotted" }, itemStyle: { color: "#7ae2ae" } },
    ],
  }
  return <ReactECharts option={option} style={{ height: 300, width: "100%" }} notMerge lazyUpdate />
}
