/**
 * 히어로 오른쪽에서 잘려 나가는 아크. RadialGauge 의 "다이얼 + 사이드 데이터 컬럼"
 * 구도를 좌우로 뒤집은 것이다 — 데이터 컬럼이 왼쪽 베젤이고 다이얼이 오른쪽에서 잘린다.
 *
 * 발광은 filter 가 아니라 **두 겹 스트로크**다 (FuiDraw 4패스 문법):
 * 아래에 넓고 흐린 헤일로, 위에 얇고 밝은 심지. blur 는 선을 흐리게 만든다.
 *
 * 좌표에 난수를 쓰지 않는다 — 언제 봐도 같은 그림이다 (§5.5).
 * 시간의 함수인 것은 트레이서 각도 하나뿐이다.
 */
const C = 450
const TEETH = 24
const R_TRACER = 420
// 46° 세그먼트. 둘레 2πr 중 46/360 만 칠하고 나머지를 비운다.
const CIRC = 2 * Math.PI * R_TRACER
const SEG = (CIRC * 46) / 360

export function Arc() {
  const teeth = Array.from({ length: TEETH }, (_, i) => {
    const a = (i / TEETH) * Math.PI * 2 - Math.PI / 2
    const cos = Math.cos(a)
    const sin = Math.sin(a)
    return {
      x1: C + cos * 372,
      y1: C + sin * 372,
      x2: C + cos * 390,
      y2: C + sin * 390,
      o: [0.55, 0.38, 0.26][i % 3],
    }
  })

  return (
    <svg className="hero-arc" viewBox="0 0 900 900" aria-hidden="true" focusable="false">
      <circle cx={C} cy={C} r={300} fill="none" stroke="var(--rule)" strokeWidth={2} />
      <circle
        cx={C}
        cy={C}
        r={360}
        fill="none"
        stroke="var(--rule-soft)"
        strokeWidth={2}
        strokeDasharray="4 5"
      />
      <circle cx={C} cy={C} r={R_TRACER} fill="none" stroke="var(--accent-dim)" strokeWidth={3} />

      {teeth.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="var(--accent)"
          strokeWidth={2}
          opacity={t.o}
        />
      ))}

      {/* 트레이서 — 정지 화면에서도 살아 있다는 신호 (§7.4, idle 6.5초).
          덱은 이것을 일부러 정지 화면으로 얼려 뒀다(72fps 예산). 웹에는 그 예산이 없어 되살린다. */}
      <g className="tracer">
        <circle
          cx={C}
          cy={C}
          r={R_TRACER}
          fill="none"
          stroke="var(--rule-soft)"
          strokeWidth={10}
          strokeDasharray={`${SEG} ${CIRC - SEG}`}
        />
        <circle
          cx={C}
          cy={C}
          r={R_TRACER}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={3}
          strokeDasharray={`${SEG} ${CIRC - SEG}`}
        />
      </g>
    </svg>
  )
}
