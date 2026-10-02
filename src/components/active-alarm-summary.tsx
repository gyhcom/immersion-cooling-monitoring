"use client"

import Link from "next/link"
import { BellRing, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { StatusPill } from "@/components/status-pill"
import type { Alarm } from "@/types/monitoring"

export function ActiveAlarmSummary({ alarms }: { alarms: Alarm[] }) {
  const primary = alarms[0]
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className="w-full rounded-xl border border-border/90 bg-card/85 p-3.5 text-left shadow-none transition hover:border-amber-300/40 hover:bg-accent/25 focus-visible:ring-2 focus-visible:ring-ring">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className={`grid size-7 shrink-0 place-items-center rounded-md border ${alarms.length ? "border-amber-300/25 bg-amber-300/5 text-amber-300" : "border-emerald-300/25 bg-emerald-300/5 text-emerald-300"}`}><BellRing className="size-3.5" /></span>
              <p className="truncate text-sm text-muted-foreground">Active Alarms</p>
            </div>
            <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium ${alarms.length ? "border-amber-300/25 bg-amber-300/5 text-amber-300" : "border-emerald-300/25 bg-emerald-300/5 text-emerald-300"}`}>{alarms.length ? "확인 필요" : "정상"}</span>
          </div>
          <div className="mt-2 flex min-w-0 items-baseline gap-2"><p className="metric-number text-xl font-semibold">{alarms.length}건</p><span className="truncate text-xs text-muted-foreground">{primary?.equipmentName ?? "No active event"}</span></div>
          <p className="mt-1 truncate text-xs text-muted-foreground">{primary ? primary.message : "현재 발생 알람 없음"}</p>
          <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-2 text-xs text-muted-foreground"><span>현재 알람 요약 보기</span><ChevronRight className="size-3.5" /></div>
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="border-b p-5">
          <SheetTitle>현재 활성 알람</SheetTitle>
          <SheetDescription>가벼운 요약을 확인하고 필요하면 상세 화면으로 이동하세요.</SheetDescription>
        </SheetHeader>
        <div className="space-y-3 overflow-y-auto px-5">
          {alarms.length ? alarms.map((alarm) => (
            <Link key={alarm.id} href={`/equipment/${alarm.equipmentId}`} className="block rounded-lg border bg-background/45 p-4 transition hover:border-cyan-300/35 hover:bg-accent/25">
              <div className="flex items-center justify-between gap-2"><div className="flex gap-2"><StatusPill value={alarm.severity} /><StatusPill value={alarm.lifecycle} /></div><span className="text-xs text-muted-foreground">{alarm.occurredAt}</span></div>
              <p className="mt-3 font-medium">{alarm.message}</p>
              <div className="mt-2 flex items-center justify-between text-sm"><span className="text-muted-foreground">{alarm.equipmentName}</span><strong className="metric-number">{alarm.value}</strong></div>
              <p className="mt-1 text-xs text-muted-foreground">기준 {alarm.threshold}</p>
            </Link>
          )) : <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">현재 확인이 필요한 알람이 없습니다.</div>}
        </div>
        <SheetFooter className="border-t p-5">
          <Button asChild className="w-full"><Link href="/alarms">Alarm Center 전체 보기 <ChevronRight /></Link></Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
