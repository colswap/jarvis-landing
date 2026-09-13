import { Arc } from "@/components/Arc"
import { Bezel, type Tick } from "@/components/Bezel"
import { FeatureRow } from "@/components/FeatureRow"
import { Foot } from "@/components/Foot"
import { HERO, HOME_ITEMS, LINKS, LIVE, WHAT } from "@/content"

const TICKS: Tick[] = [
  { id: "hero", no: "00", name: "소개" },
  { id: "what", no: "01", name: "무엇인가" },
  { id: "feat", no: "02", name: "기능" },
  { id: "live", no: "03", name: "지금 만드는 중" },
  { id: "foot", no: "04", name: "정보" },
]

export function Home() {
  return (
    <div className="shell">
      <a className="skip" href="#main">
        본문 바로가기
      </a>
      <Bezel ticks={TICKS} />

      <main id="main">
        {/* 00 ─ 히어로. 셋째 트랙으로 아크가 나간다 */}
        <section id="hero" className="sec-hero hero">
          <Arc />
          <div className="col">
            <p style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 28px" }}>
              <span className="bullet" aria-hidden="true" />
              <span className="label">{HERO.kicker}</span>
            </p>

            <h1 className="h1">
              {HERO.title[0]}
              <br />
              {HERO.title[1]}
            </h1>

            <p className="lede" style={{ margin: "24px 0 40px", maxWidth: "46ch" }}>
              {HERO.lede}
            </p>

            {/* 데모 영상 — 계기 행. 계기는 값을 감추지 않는다: 실주소를 그대로 노출한다 */}
            <a
              className="stat-row"
              href={LINKS.demo}
              target="_blank"
              rel="noopener"
              data-ga="demo_video"
            >
              <span>
                <span className="label" style={{ display: "block", marginBottom: 4 }}>
                  DEMO VIDEO · YOUTUBE
                </span>
                <span style={{ color: "var(--ink)" }}>{HERO.demoLine}</span>
              </span>
              <span className="mono-val">{LINKS.demoLabel}</span>
            </a>
          </div>
        </section>

        {/* 01 ─ 무엇인가. 세 문장의 폭이 제각각이라 오른쪽 끝이 계단처럼 어긋난다 */}
        <section id="what" className="sec-what col">
          {WHAT.map((s, i) => (
            <p
              key={i}
              className="lede"
              style={{
                maxWidth: s.width,
                margin: 0,
                /* 셋째 문장만 뒤로 물러나 사실 진술로 읽힌다 */
                marginTop: i === 0 ? 0 : i === 1 ? 18 : 34,
                color: i === 0 ? "var(--ink)" : "var(--ink-2)",
              }}
            >
              {s.text}
            </p>
          ))}
        </section>

        <div className="col">
          <div className="rail" />
        </div>

        {/* 02 ─ 핵심 기능 넷. 다열 그리드가 되지 않는다 */}
        <section id="feat" className="sec-feat col">
          <h2 className="sec-title">핵심 기능</h2>
          {HOME_ITEMS.map((it, i) => (
            <FeatureRow key={it.no} item={it} first={i === 0} />
          ))}
          <p style={{ marginTop: 26 }}>
            <a className="tlink" href="/features.html" data-ga="nav_features">
              기능 8개 전부 보기
            </a>
          </p>
        </section>

        {/* 03 ─ 사이트 전체에서 유일한 3층 챔퍼 판 */}
        <section id="live" className="sec-live">
          <div className="instr">
            <div className="live-grid">
              <div>
                {/* 주소는 .label 밖에 둔다 — .label 은 라틴 대문자 상수 전용이고
                    안에 넣으면 text-transform 이 주소까지 대문자로 만든다 */}
                <p style={{ margin: "0 0 14px" }}>
                  <span className="label" style={{ letterSpacing: "1.6px" }}>
                    {LIVE.label}
                  </span>{" "}
                  <span className="mono-val">· {LINKS.liveLabel}</span>
                </p>
                <h2 className="sec-title">{LIVE.title}</h2>
                <p style={{ margin: "0 0 22px", maxWidth: "44ch" }}>{LIVE.body}</p>

                <p className="sowhat" style={{ maxWidth: "46ch" }}>
                  {LIVE.honestBefore}
                  <b style={{ color: "var(--warn-text)", fontWeight: 700 }}>{LIVE.honestAmber}</b>
                  {LIVE.honestAfter}
                </p>

                <a
                  className="stat-row is-warn"
                  href={LINKS.live}
                  target="_blank"
                  rel="noopener"
                  data-ga="live_build"
                  style={{ marginTop: 26 }}
                >
                  <span style={{ color: "var(--ink)" }}>{LIVE.cta}</span>
                  <span className="mono-val">{LINKS.liveLabel}</span>
                </a>
              </div>

              {/* 상태 판독. 셋째만 꺼진 계기다 — 빈 화면은 고장이 아니라 판독값이다 */}
              <div className="lamps">
                {LIVE.lamps.map((l) => (
                  <div key={l.label} className={`lamp ${l.tone}`}>
                    <i aria-hidden="true" />
                    <span>
                      <span className="label" style={{ display: "block", marginBottom: 2 }}>
                        {l.label}
                      </span>
                      <p>{l.text}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* main 밖이어야 contentinfo 랜드마크로 잡힌다 */}
      <Foot here="home" />
    </div>
  )
}
