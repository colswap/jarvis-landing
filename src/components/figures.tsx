import type { ReactElement } from "react"

/**
 * 항목별 **계기 도면**. 아이콘 세트가 아니다 — 공통 상자도 공통 크기도 없고,
 * 앵커도 항목마다 다르며, 각 그림은 그 기능의 도면이지 상징이 아니다.
 * 그리고 8개 항목 중 **다섯에만** 붙는다. 그림이 일부 행에만 있는 것이
 * "공통 슬롯 없음" 의 가장 강한 증거다.
 *
 * 둥근 끝·둥근 막대는 쓰지 않는다 — 둥근 막대는 앱 차트로 보이고
 * 각진 막대는 계기 눈금으로 보인다 (CHART.barRadius = 0).
 */

/** 01 — 음량 눈금 3단. 본문 셀 오른쪽 끝 baseline. */
export function FigVolume() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true">
      <rect x="2" y="12" width="2" height="8" fill="var(--accent)" opacity="0.55" />
      <rect x="9" y="4" width="2" height="16" fill="var(--accent)" />
      <rect x="16" y="9" width="2" height="11" fill="var(--accent)" opacity="0.38" />
      <rect x="23" y="18" width="2" height="2" fill="var(--accent-dim)" />
    </svg>
  )
}

/** 02 — ArcProgress. 42px 눈금 거터 안, 번호 아래. */
export function FigGauge() {
  // 120° 를 세 조각으로 끊는다. 둘만 밝다.
  const seg = (a0: number, a1: number) => {
    const r = 13
    const p = (a: number) => {
      const t = ((a - 90) * Math.PI) / 180
      return `${15 + Math.cos(t) * r} ${15 + Math.sin(t) * r}`
    }
    return `M ${p(a0)} A ${r} ${r} 0 0 1 ${p(a1)}`
  }
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" style={{ marginTop: 6 }}>
      <path d={seg(-60, -22)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <path d={seg(-16, 22)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <path d={seg(28, 60)} fill="none" stroke="var(--accent-dim)" strokeWidth="2.5" />
    </svg>
  )
}

/** 04 — ScanReticle. 네 귀퉁이 브래킷 + 훑는 선. 제목 왼쪽 밖으로 6px 튀어나온다. */
export function FigReticle() {
  const arm = 8
  const s = 26
  return (
    <svg width={s} height={s} viewBox="0 0 26 26" aria-hidden="true">
      <g fill="none" stroke="var(--accent)" strokeWidth="2">
        <path d={`M 1 ${1 + arm} L 1 1 L ${1 + arm} 1`} />
        <path d={`M ${25 - arm} 1 L 25 1 L 25 ${1 + arm}`} />
        <path d={`M 25 ${25 - arm} L 25 25 L ${25 - arm} 25`} />
        <path d={`M ${1 + arm} 25 L 1 25 L 1 ${25 - arm}`} />
      </g>
      <line x1="1" y1="13" x2="25" y2="13" stroke="var(--accent)" strokeWidth="2" opacity="0.38" />
    </svg>
  )
}

/** 07 — 300° 띠 위의 카드 9장. 덱 그 자체의 축소 도면이고, 이 페이지에서 가장 큰 그림이다. */
export function FigDeck() {
  const C = 32
  const R = 24
  const cards = Array.from({ length: 9 }, (_, i) => {
    // 300° 를 9칸으로. 아래쪽 60° 가 비는 것이 덱의 모양이다.
    const deg = -150 + (300 / 8) * i
    const t = ((deg - 90) * Math.PI) / 180
    return {
      x: C + Math.cos(t) * R,
      y: C + Math.sin(t) * R,
      deg,
      lit: i === 4,
    }
  })
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--rule-soft)" strokeWidth="2" />
      {cards.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.deg})`}>
          {/* 잘린 모서리. 직각·라운드는 안드로이드 카드로 보이고 잘린 모서리는 계기로 보인다 */}
          <polygon
            points="-5,-1.5 -3,-3.5 5,-3.5 5,1.5 3,3.5 -5,3.5"
            fill="none"
            stroke={c.lit ? "var(--accent)" : "var(--accent-dim)"}
            strokeWidth="2"
          />
        </g>
      ))}
    </svg>
  )
}

/** 08 — 각진 막대 5개 + 밝은 뚜껑 선. 넓고 어두운 몸통 위에 밝은 선 한 줄이 있어야
    빛나는 물건으로 읽힌다 (CHART.barCap). */
export function FigBars() {
  const hs = [9, 15, 7, 19, 12]
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true">
      {hs.map((h, i) => (
        <g key={i}>
          <rect x={i * 7} y={22 - h} width="5" height={h} fill="var(--accent-dim)" opacity="0.7" />
          <rect x={i * 7} y={22 - h} width="5" height="2" fill="var(--hot)" />
        </g>
      ))}
    </svg>
  )
}

/**
 * 키는 **뜻**이지 번호가 아니다. 번호로 잡으면 홈(01~04)과 features(01~08)의 번호가
 * 겹쳐서, 홈의 "회의자료" 행에 웹 제작 게이지가 붙는 식으로 그림과 기능이 어긋난다.
 * 어느 행에 무엇을 붙일지는 content.ts 가 항목마다 적는다.
 */
export const FIGURES = {
  volume: FigVolume,
  gauge: FigGauge,
  reticle: FigReticle,
  deck: FigDeck,
  bars: FigBars,
} satisfies Record<string, () => ReactElement>

export type FigKind = keyof typeof FIGURES
/** 그림이 붙는 자리. 공통 슬롯이 없다는 것이 아이콘 세트가 아니라는 증거다. */
export type FigAnchor = "gutter" | "inline" | "right" | "mid"
