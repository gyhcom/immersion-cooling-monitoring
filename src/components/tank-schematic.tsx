import type { Tank } from "@/types/monitoring"

export function TankSchematic({ tank }: { tank: Tank }) {
  const levelY = 194 - tank.fluidLevel * 1.35
  const fillHeight = 194 - levelY
  const clipId = `tank-clip-${tank.id}`
  const supplyArrowId = `supply-arrow-${tank.id}`
  const returnArrowId = `return-arrow-${tank.id}`

  return (
    <svg viewBox="0 0 420 260" role="img" aria-label={`${tank.name} 냉각 유체 공급 및 가열 유체 회수 흐름도`} className="h-auto w-full">
      <defs>
        <clipPath id={clipId}><rect x="110" y="42" width="200" height="154" rx="14" /></clipPath>
        <marker id={supplyArrowId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#38d7e7" /></marker>
        <marker id={returnArrowId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#f4b947" /></marker>
      </defs>

      <text x="210" y="17" textAnchor="middle" fill="#8da5ad" fontSize="10">냉각 유체가 GPU 열을 흡수해 배출되는 경로</text>

      <rect x="109" y="41" width="202" height="156" rx="15" fill="#071015" stroke="#35525d" strokeWidth="2" />
      <rect x="110" y={levelY} width="200" height={fillHeight} fill="#123b45" clipPath={`url(#${clipId})`} />
      <path className="tank-wave" d={`M110 ${levelY} Q145 ${levelY - 4} 180 ${levelY} T250 ${levelY} T310 ${levelY}`} fill="none" stroke="#38d7e7" strokeWidth="2" />

      <path className="tank-flow-supply" d="M28 85H126" fill="none" stroke="#38d7e7" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#${supplyArrowId})`} />
      <path className="tank-flow-return" d="M294 158H392" fill="none" stroke="#f4b947" strokeWidth="4" strokeLinecap="round" markerEnd={`url(#${returnArrowId})`} />

      <g transform="translate(165 111)">
        <path className="heat-wave" d="M17 0c-7-7 7-11 0-18M45 0c-7-7 7-11 0-18M73 0c-7-7 7-11 0-18" fill="none" stroke="#f4b947" strokeWidth="1.6" strokeLinecap="round" />
        {[0, 1, 2, 3].map((server) => (
          <g key={server} transform={`translate(${server * 22} 0)`}>
            <rect width="17" height="38" rx="3" fill="#0b171d" stroke="#4f6b74" />
            <circle cx="8.5" cy="29" r="2" fill="#38d7e7" />
            <path d="M4 8h9M4 13h9M4 18h9" stroke="#35525d" strokeWidth="1.4" />
          </g>
        ))}
        <text x="41.5" y="53" textAnchor="middle" fill="#edf7fa" fontSize="10" fontWeight="600">GPU HEAT SOURCE</text>
        <text x="41.5" y="66" textAnchor="middle" fill="#8da5ad" fontSize="9">4 Servers · 16 GPUs</text>
      </g>

      <g transform="translate(27 36)">
        <rect width="105" height="34" rx="8" fill="#0b171d" stroke="#24505a" />
        <circle cx="12" cy="12" r="3" fill="#38d7e7" />
        <text x="21" y="15" fill="#8da5ad" fontSize="9">COLD SUPPLY</text>
        <text x="12" y="28" fill="#edf7fa" fontSize="12" fontWeight="600">{tank.inletTemp} °C</text>
      </g>
      <g transform="translate(288 205)">
        <rect width="105" height="34" rx="8" fill="#0b171d" stroke="#5a4924" />
        <circle cx="12" cy="12" r="3" fill="#f4b947" />
        <text x="21" y="15" fill="#8da5ad" fontSize="9">HEATED RETURN</text>
        <text x="12" y="28" fill="#edf7fa" fontSize="12" fontWeight="600">{tank.outletTemp} °C</text>
      </g>

      <text x="27" y="220" fill="#8da5ad" fontSize="9">FLUID LEVEL</text>
      <text x="27" y="238" fill="#edf7fa" fontSize="14" fontWeight="600">{tank.fluidLevel}%</text>
      <text x="126" y="220" fill="#8da5ad" fontSize="9">FLOW RATE</text>
      <text x="126" y="238" fill="#edf7fa" fontSize="14" fontWeight="600">{tank.flowRate} L/min</text>
    </svg>
  )
}
