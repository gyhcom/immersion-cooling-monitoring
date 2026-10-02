"use client"

import Link from "next/link"
import { CheckCheck, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusPill } from "@/components/status-pill"
import { useSimulator } from "@/features/simulator/simulator-provider"
import type { Alarm } from "@/types/monitoring"

function AlarmRows({ alarms, acknowledge }: { alarms: Alarm[]; acknowledge: (id: string) => void }) {
  if (!alarms.length) return <div className="p-10 text-center text-sm text-muted-foreground">해당 조건의 알람이 없습니다.</div>
  return <Table><TableHeader><TableRow><TableHead>Severity</TableHead><TableHead>처리 상태</TableHead><TableHead>장비</TableHead><TableHead>이벤트</TableHead><TableHead>현재값 / 기준</TableHead><TableHead>발생</TableHead><TableHead className="text-right">조치</TableHead></TableRow></TableHeader><TableBody>{alarms.map((alarm) => <TableRow key={alarm.id}><TableCell><StatusPill value={alarm.severity} /></TableCell><TableCell><StatusPill value={alarm.lifecycle} /></TableCell><TableCell><Button asChild variant="link" className="h-auto p-0 text-foreground"><Link href={`/equipment/${alarm.equipmentId}`}>{alarm.equipmentName}<ExternalLink className="size-3" /></Link></Button></TableCell><TableCell><strong className="block font-medium">{alarm.message}</strong><span className="text-xs text-muted-foreground">{alarm.id}</span></TableCell><TableCell><span className="metric-number block">{alarm.value}</span><span className="text-xs text-muted-foreground">기준 {alarm.threshold}</span></TableCell><TableCell className="text-muted-foreground">{alarm.occurredAt}</TableCell><TableCell className="text-right">{alarm.lifecycle === "active" ? <Button size="sm" variant="outline" onClick={() => acknowledge(alarm.id)}><CheckCheck /> Acknowledge</Button> : <span className="text-xs text-muted-foreground">처리 완료</span>}</TableCell></TableRow>)}</TableBody></Table>
}

export function AlarmCenter() {
  const { alarms, acknowledgeAlarm } = useSimulator()
  const active = alarms.filter((alarm) => alarm.lifecycle !== "resolved")
  const resolved = alarms.filter((alarm) => alarm.lifecycle === "resolved")
  return <div className="mx-auto max-w-[1680px] space-y-5"><div><p className="text-sm font-medium text-cyan-300">ALARMS & EVENTS</p><h1 className="mt-1 text-2xl font-semibold">Alarm Center</h1><p className="mt-1 text-sm text-muted-foreground">Severity는 위험도, 처리 상태는 발생·확인·해제로 구분합니다.</p></div><Card className="bg-card/75 py-0 shadow-none"><CardContent className="p-0"><Tabs defaultValue="active"><div className="flex items-center justify-between border-b px-4 py-3"><TabsList><TabsTrigger value="active">Active {active.length}</TabsTrigger><TabsTrigger value="all">전체 {alarms.length}</TabsTrigger><TabsTrigger value="resolved">Resolved {resolved.length}</TabsTrigger></TabsList><span className="hidden text-xs text-muted-foreground sm:block">외부 알림 연동은 고객 협의 후 결정</span></div><TabsContent value="active" className="mt-0"><AlarmRows alarms={active} acknowledge={acknowledgeAlarm} /></TabsContent><TabsContent value="all" className="mt-0"><AlarmRows alarms={alarms} acknowledge={acknowledgeAlarm} /></TabsContent><TabsContent value="resolved" className="mt-0"><AlarmRows alarms={resolved} acknowledge={acknowledgeAlarm} /></TabsContent></Tabs></CardContent></Card></div>
}
