"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSimulator } from "@/features/simulator/simulator-provider"
import type { Scenario } from "@/types/monitoring"

export function ScenarioControl() {
  const { scenario, applyScenario } = useSimulator()
  const [selected, setSelected] = useState<Scenario>(scenario)

  return (
    <div className="flex items-center gap-2" aria-label="데모 시나리오 제어">
      <Select value={selected} onValueChange={(value) => setSelected(value as Scenario)}>
        <SelectTrigger className="w-[148px] border-border bg-card/60" aria-label="시나리오 선택">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">정상 운전</SelectItem>
          <SelectItem value="warning">온도 상승</SelectItem>
          <SelectItem value="critical">Critical 과열</SelectItem>
          <SelectItem value="recovery">복구 완료</SelectItem>
        </SelectContent>
      </Select>
      <Button size="sm" onClick={() => applyScenario(selected)} className="gap-2"><Play className="size-3.5" /> 실행</Button>
    </div>
  )
}
