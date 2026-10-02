import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function MetricCard({ label, value, detail, icon: Icon, accent = "text-cyan-300" }: { label: string; value: string; detail: string; icon: LucideIcon; accent?: string }) {
  return (
    <Card className="border-border/90 bg-card/85 py-0 shadow-none">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="metric-number mt-1 text-2xl font-semibold">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
        </div>
        <div className={`grid size-10 place-items-center rounded-md border border-current/20 bg-current/5 ${accent}`}><Icon className="size-5" /></div>
      </CardContent>
    </Card>
  )
}
