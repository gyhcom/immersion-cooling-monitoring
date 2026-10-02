import Link from "next/link"
import { RotateCw } from "lucide-react"
import { StatusPill } from "@/components/status-pill"
import type { Tank } from "@/types/monitoring"

export function TankLiveCard({ tank }: { tank: Tank }) {
  const accentClass = tank.status === "critical" ? "text-red-400" : tank.status === "warning" ? "text-amber-400" : "text-cyan-300"
  const fillClass = tank.status === "critical" ? "bg-red-400" : tank.status === "warning" ? "bg-amber-400" : "bg-cyan-300"

  return (
    <Link href={`/equipment/${tank.id}`} className="group rounded-lg border border-border bg-background/35 p-4 transition hover:border-cyan-300/40 hover:bg-accent/30">
      <div className="flex items-start justify-between gap-3">
        <div><p className="font-semibold">{tank.name}</p><p className="text-xs text-muted-foreground">{tank.zone} · 4 Servers · 16 GPUs</p></div>
        <StatusPill value={tank.status} />
      </div>
      <div className="mt-4 flex items-center gap-3" aria-label={`Pump ${tank.pumpSpeed}% 운전 중`}>
        <span className={`grid size-8 shrink-0 place-items-center rounded-full border border-current/30 bg-current/5 ${accentClass}`}><RotateCw className="pump-icon size-4" /></span>
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div className={`h-full transition-[width] duration-500 ${fillClass}`} style={{ width: `${tank.fluidLevel}%` }} />
          <span className={`flow-dot absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_7px_currentColor] ${accentClass}`} />
        </div>
        <span className="font-mono text-xs text-muted-foreground">RUN</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div><span className="block text-xs text-muted-foreground">Outlet</span><strong className="metric-number telemetry-value">{tank.outletTemp} °C</strong></div>
        <div><span className="block text-xs text-muted-foreground">Flow</span><strong className="metric-number telemetry-value">{tank.flowRate}</strong></div>
        <div><span className="block text-xs text-muted-foreground">Pump</span><strong className="metric-number telemetry-value">{tank.pumpSpeed}%</strong></div>
      </div>
    </Link>
  )
}
