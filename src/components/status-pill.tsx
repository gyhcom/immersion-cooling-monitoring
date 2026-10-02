import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { AlarmLifecycle, AlarmSeverity, HealthStatus } from "@/types/monitoring"

const labels: Record<HealthStatus | AlarmSeverity | AlarmLifecycle, string> = {
  normal: "정상", warning: "Warning", critical: "Critical", offline: "Offline",
  info: "Info", active: "발생", acknowledged: "확인", resolved: "해제",
}

const styles: Record<string, string> = {
  normal: "border-emerald-400/35 bg-emerald-400/10 text-emerald-300",
  warning: "border-amber-400/35 bg-amber-400/10 text-amber-300",
  critical: "border-red-400/40 bg-red-400/10 text-red-300",
  offline: "border-slate-400/30 bg-slate-400/10 text-slate-300",
  info: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  active: "border-red-400/35 bg-red-400/10 text-red-300",
  acknowledged: "border-blue-400/35 bg-blue-400/10 text-blue-300",
  resolved: "border-slate-400/25 bg-slate-400/10 text-slate-300",
}

export function StatusPill({ value, className }: { value: HealthStatus | AlarmSeverity | AlarmLifecycle; className?: string }) {
  return <Badge variant="outline" className={cn("font-medium", styles[value], className)}>{labels[value]}</Badge>
}
