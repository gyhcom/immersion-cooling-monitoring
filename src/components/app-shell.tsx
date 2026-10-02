"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, BellRing, Boxes, CircleDot, Database, LayoutDashboard, Waves } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger,
} from "@/components/ui/sidebar"
import { ScenarioControl } from "@/components/scenario-control"
import { useSimulator } from "@/features/simulator/simulator-provider"

const navigation = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/equipment", label: "Equipment", icon: Boxes },
  { href: "/alarms", label: "Alarms", icon: BellRing },
]

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { alarms, lastUpdated } = useSimulator()
  const activeAlarmCount = alarms.filter((alarm) => alarm.lifecycle !== "resolved").length

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <span className="grid size-9 shrink-0 place-items-center rounded-md border border-cyan-300/30 bg-cyan-300/10 text-cyan-300"><Waves className="size-5" /></span>
            <span className="min-w-0 group-data-[collapsible=icon]:hidden">
              <strong className="block truncate text-sm tracking-wide">IMMERSION OPS</strong>
              <span className="block truncate text-xs text-muted-foreground">Cooling Control</span>
            </span>
          </Link>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>MONITORING</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive(pathname, item.href)} tooltip={item.label} className="h-10">
                      <Link href={item.href}><item.icon /><span>{item.label}</span></Link>
                    </SidebarMenuButton>
                    {item.href === "/alarms" && activeAlarmCount > 0 ? <SidebarMenuBadge className="bg-red-400/15 text-red-300">{activeAlarmCount}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>SITE</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-2 px-2 text-sm group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2 text-sidebar-foreground"><CircleDot className="size-3.5 text-emerald-300" /> Seoul Demo Site</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Database className="size-3.5" /> Mock Data Provider</div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2"><Activity className="size-3.5 text-cyan-300" /> 1초 주기 시뮬레이션</div>
          <div>마지막 갱신 {lastUpdated}</div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="md:hidden" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold">액침냉각 통합 관제</span>
                <Badge variant="outline" className="border-cyan-300/35 bg-cyan-300/10 text-cyan-200">DEMO DATA</Badge>
              </div>
              <p className="hidden text-xs text-muted-foreground sm:block">가상 장비 · 가상 임계치 · 고객 협의 전 시연용</p>
            </div>
          </div>
          <ScenarioControl />
        </header>
        <div className="min-w-0 flex-1 p-4 md:p-6 lg:p-7">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
