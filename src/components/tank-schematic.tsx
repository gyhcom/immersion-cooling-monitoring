import type { Tank } from "@/types/monitoring"

export function TankSchematic({ tank }: { tank: Tank }) {
  const levelY = 198 - tank.fluidLevel * 1.45
  const fillHeight = 198 - levelY
  return (
    <svg viewBox="0 0 420 260" role="img" aria-label={`${tank.name} 냉각 유체 흐름도`} className="h-auto w-full">
      <defs><clipPath id="tankClip"><rect x="105" y="40" width="210" height="160" rx="14" /></clipPath></defs>
      <rect x="104" y="39" width="212" height="162" rx="15" fill="#071015" stroke="#35525d" strokeWidth="2" />
      <rect x="105" y={levelY} width="210" height={fillHeight} fill="#123b45" clipPath="url(#tankClip)" />
      <path d={`M105 ${levelY} Q150 ${levelY - 5} 195 ${levelY} T285 ${levelY} T315 ${levelY}`} fill="none" stroke="#38d7e7" strokeWidth="2" />
      <path d="M45 79H104M316 79H375" stroke="#38d7e7" strokeWidth="5" strokeLinecap="round" />
      <path d="M45 168H104M316 168H375" stroke="#f4b947" strokeWidth="5" strokeLinecap="round" />
      <circle cx="70" cy="79" r="12" fill="#0b171d" stroke="#38d7e7" strokeWidth="2" />
      <path d="M64 79h12M70 73v12" stroke="#38d7e7" strokeWidth="2" />
      <rect x="164" y="88" width="92" height="62" rx="7" fill="#0b171d" stroke="#35525d" />
      <text x="210" y="112" textAnchor="middle" fill="#edf7fa" fontSize="15" fontWeight="600">GPU SERVERS</text>
      <text x="210" y="134" textAnchor="middle" fill="#8da5ad" fontSize="12">4 Nodes · 16 GPUs</text>
      <text x="42" y="60" fill="#8da5ad" fontSize="11">INLET</text><text x="42" y="50" fill="#edf7fa" fontSize="14" fontWeight="600">{tank.inletTemp} °C</text>
      <text x="330" y="60" fill="#8da5ad" fontSize="11">OUTLET</text><text x="330" y="50" fill="#edf7fa" fontSize="14" fontWeight="600">{tank.outletTemp} °C</text>
      <text x="105" y="228" fill="#8da5ad" fontSize="11">FLUID LEVEL</text><text x="105" y="247" fill="#edf7fa" fontSize="16" fontWeight="600">{tank.fluidLevel}%</text>
      <text x="248" y="228" fill="#8da5ad" fontSize="11">FLOW</text><text x="248" y="247" fill="#edf7fa" fontSize="16" fontWeight="600">{tank.flowRate} L/min</text>
    </svg>
  )
}
