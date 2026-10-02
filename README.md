# Immersion Cooling Monitoring

액침냉각(Immersion Cooling) 설비의 운전 상태를 시각화하는 고객 협의용 모니터링 프로토타입입니다.

실제 센서나 운영 DB에는 연결하지 않으며, 가상 장비와 Mock Telemetry를 사용해 화면 구성과 주요 기능을 검토하는 용도로 제작했습니다.

## 주요 기능

- Site → Tank → Server → GPU 장비 계층 표현
- 냉각수 흐름, CDU, Pump, Tank, GPU 운전 상태 애니메이션
- Tank별 온도, 유량, 펌프 속도 및 상태 표시
- 1초 주기의 Mock Telemetry 갱신
- 정상, 온도 상승, 과열, 복구 시나리오 시뮬레이션
- 장비 상세 Telemetry와 Trend 차트
- Alarm/Event 목록, 상세 요약 및 확인 처리
- 데스크톱과 모바일 반응형 화면

## 주요 화면

| 경로 | 설명 |
| --- | --- |
| `/` | Site Overview와 실시간 냉각 계통 현황 |
| `/equipment` | 전체 Tank 및 장비 목록 |
| `/equipment/[equipmentId]` | 장비 상세 Telemetry와 Trend |
| `/alarms` | Alarm/Event 통합 목록과 처리 화면 |

## 기술 구성

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui 및 Radix UI
- Apache ECharts
- Vercel

## 로컬 실행

Node.js와 npm이 설치된 환경에서 다음 명령을 실행합니다.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

## 검증 명령

```bash
npm run lint
npm run build
```

## 프로젝트 구조

```text
src/
├── app/          # Next.js 페이지와 전역 스타일
├── components/   # 공통 UI 및 설비 시각화 컴포넌트
├── config/       # Mock 임계치 설정
├── data/         # 시연용 장비와 Telemetry 데이터
├── features/     # Overview, Equipment, Alarm 기능
├── hooks/        # 공통 React 훅
├── lib/          # 공통 유틸리티
└── types/        # 모니터링 도메인 타입
```

## 현재 범위

이 저장소는 요구사항 협의와 화면 시연을 위한 프로토타입입니다. 실제 사업 개발 단계에서는 고객 환경의 DB 종류, 스키마, 데이터 수집 주기, 장비 규모, 알람 기준 및 인프라 조건을 확인한 후 연동 방식을 확정해야 합니다.
