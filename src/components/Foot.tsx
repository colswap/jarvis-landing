import { FOOT, LINKS } from "@/content"

export function Foot({ here }: { here: "home" | "features" }) {
  return (
    <footer className="sec-foot col" id="foot">
      <div className="rail" style={{ marginBottom: 22 }} />
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between" }}
      >
        <p style={{ margin: 0, color: "var(--ink-4)", fontSize: "var(--t-meta)" }}>
          JARVIS · {FOOT.team} · {FOOT.target}
        </p>
        <nav
          style={{ display: "flex", gap: 22, fontSize: "var(--t-meta)" }}
          aria-label="페이지"
        >
          {here === "home" ? (
            <a className="tlink" href="/features.html" data-ga="nav_features">
              기능 8개
            </a>
          ) : (
            <a className="tlink" href="/" data-ga="nav_home">
              홈
            </a>
          )}
          <a
            className="tlink"
            href={LINKS.demo}
            target="_blank"
            rel="noopener"
            data-ga="demo_video"
          >
            데모 영상
          </a>
        </nav>
      </div>
    </footer>
  )
}
