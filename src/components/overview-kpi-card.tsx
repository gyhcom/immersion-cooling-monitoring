import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const tones = {
  cyan: "border-cyan-300/25 bg-cyan-300/5 text-cyan-300",
  amber: "border-amber-300/25 bg-amber-300/5 text-amber-300",
  red: "border-red-300/25 bg-red-300/5 text-red-300",
  emerald: "border-emerald-300/25 bg-emerald-300/5 text-emerald-300",
} as const

export function OverviewKpiCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "cyan",
  badge,
  live = false,
  footer,
}: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  tone?: keyof typeof tones
  badge?: string
  live?: boolean
  footer?: ReactNode
}) {
  return (
    <Card className="border-border/90 bg-card/85 py-0 shadow-none">
      <CardContent className="p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className={cn("grid size-7 shrink-0 place-items-center rounded-md border", tones[tone])}><Icon className="size-3.5" /></span>
            <p className="truncate text-sm text-muted-foreground">{label}</p>
          </div>
          {live ? <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-cyan-300"><span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-300 opacity-70" /><span className="relative inline-flex size-1.5 rounded-full bg-cyan-300" /></span>LIVE</span> : null}
        </div>
        <div className="mt-2 flex min-w-0 items-baseline gap-2">
          <p className="metric-number truncate text-xl font-semibold">{value}</p>
          {badge ? <span className={cn("shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium", tones[tone])}>{badge}</span> : null}
        </div>
        <p className="mt-1 truncate text-xs text-muted-foreground">{detail}</p>
        {footer ? <div className="mt-3">{footer}</div> : null}
      </CardContent>
    </Card>
  )
}
