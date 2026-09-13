import { READOUT } from "@/content"
import { useActiveSection } from "./useActiveSection"

export type Tick = { id: string; no: string; name: string }

/**
 * 좌측 232px 계기 베젤. 홈과 features 가 **같은 베젤에 눈금 수만 다르다** —
 * 한 장비의 두 화면으로 읽히는 지점이다.
 */
export function Bezel({ ticks }: { ticks: Tick[] }) {
  const active = useActiveSection(ticks.map((t) => t.id))
  const idx = ticks.findIndex((t) => t.id === active)

  return (
    <aside className="bezel">
      <a href="/" className="stamp" aria-label="JARVIS 홈">
        JARVIS
      </a>
      <div className="rail" style={{ marginTop: 14, marginBottom: 22 }} />

      <nav className="ticks" aria-label="구역">
        {ticks.map((t, i) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="tick"
            aria-current={t.id === active ? "true" : undefined}
            data-near={Math.abs(i - idx) === 1 ? "1" : undefined}
          >
            <span className="no">{t.no}</span>
            <span className="name">{t.name}</span>
          </a>
        ))}
      </nav>

      <div className="spacer" style={{ flex: 1 }} />

      {/* 값이 변하지 않는 판독 3줄. 카운터가 아니다. */}
      <dl className="readout">
        {READOUT.map((r) => (
          <div key={r.k}>
            <dt>{r.k}</dt>
            <dd>{r.v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
