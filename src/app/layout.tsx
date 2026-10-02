import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SimulatorProvider } from "@/features/simulator/simulator-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Immersion Ops | 액침냉각 모니터링 데모",
  description: "액침냉각 설비 상태, Telemetry, Alarm을 확인하는 인터랙티브 데모",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}>
      <body className="min-h-full">
        <TooltipProvider>
          <SimulatorProvider>
            <AppShell>{children}</AppShell>
          </SimulatorProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
