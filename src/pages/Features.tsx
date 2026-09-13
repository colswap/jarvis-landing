import { Bezel, type Tick } from "@/components/Bezel"
import { FeatureRow } from "@/components/FeatureRow"
import { Foot } from "@/components/Foot"
import { FEATURES_HEAD, GROUPS, LINKS } from "@/content"

/** 같은 베젤에 눈금 수만 다르다 — 한 장비의 두 화면. */
const TICKS: Tick[] = GROUPS.flatMap((g) =>
  g.items.map((it) => ({ id: `f${it.no}`, no: it.no, name: it.short ?? it.title })),
)

export function Features() {
  return (
    <div className="shell">
      <a className="skip" href="#main">
        본문 바로가기
      </a>
      <Bezel ticks={TICKS} />

      <main id="main">
        <header className="sec-fhead col">
          <div className="grp-head" style={{ paddingBottom: 0 }}>
            <span className="stamp fhead-stamp">JARVIS</span>
            <span className="rail" style={{ flex: 1 }} />
            <span className="name" style={{ fontSize: "var(--t-meta)", color: "var(--ink-3)" }}>
              기능
            </span>
            <span className="mono-val">{FEATURES_HEAD.count}</span>
          </div>
          <h1 className="sec-title" style={{ marginTop: 32, marginBottom: 0 }}>
            {FEATURES_HEAD.title}
          </h1>
        </header>

        {GROUPS.map((g, gi) => (
          <section
            key={g.name}
            className={`col ${["sec-flist", "sec-fgrp-b", "sec-fgrp-c"][gi]}`}
            aria-labelledby={`g${gi}`}
          >
            <div className="grp-head">
              <h2 className="name" id={`g${gi}`}>
                {g.name}
              </h2>
              <span className="rail" style={{ flex: 1 }} />
              <span className="mono-val">{g.range}</span>
            </div>

            {g.items.map((it, i) => (
              <FeatureRow key={it.no} id={`f${it.no}`} item={it} first={i === 0} />
            ))}

            {/* 구역마다 꼬리 한 줄. 홈의 기능 행에는 이 꼬리가 없다 —
                홈은 무엇인지만, 여기는 그래서 뭔지까지다. */}
            <p className="sowhat" style={{ marginTop: 26, maxWidth: "48ch" }}>
              {g.sowhat}
            </p>
          </section>
        ))}

        {/* 꼬리. 3층 챔퍼 판은 여기서 쓰지 않는다 — 그 판은 홈에 한 장뿐이어야 뜻이 유지된다 */}
        <section className="sec-ffoot col">
          <div className="rail" style={{ marginBottom: 22 }} />
          <p style={{ margin: "0 0 10px", maxWidth: "48ch" }}>
            <a className="tlink" href={LINKS.live} target="_blank" rel="noopener" data-ga="live_build">
              지금 만들어지고 있는 것
            </a>{" "}
            — 빌드가 돌고 있지 않으면 열리지 않는다.
          </p>
          <p style={{ margin: 0, color: "var(--ink-4)", fontSize: "var(--t-meta)" }}>
            {LINKS.liveLabel}
          </p>
        </section>

      </main>

      {/* main 밖이어야 contentinfo 랜드마크로 잡힌다 */}
      <Foot here="features" />
    </div>
  )
}
