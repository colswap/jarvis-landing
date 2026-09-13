/**
 * GA4. 측정 ID 는 `VITE_GA_ID` 에서 온다 — **코드에 박지 않는다.**
 *
 * ID 가 비어 있으면 이 모듈은 아무 일도 하지 않는다. 그게 이 방식을 고른 이유다:
 * 로컬 `npm run dev`·프리뷰 배포·리허설이 심사위원 방문 수와 같은 속성에 섞이면
 * 세려던 숫자가 못 쓰게 된다. Vercel 의 Production 환경에만 값을 넣으면 그 분리가
 * 공짜로 생기고, 나머지 환경에서는 스크립트조차 내려받지 않는다.
 *
 * 스니펫을 두 html 의 `<head>` 에 직접 두지 않은 것도 같은 이유다. html 안의
 * `%VITE_GA_ID%` 는 변수가 없을 때 그 문자열이 **그대로 남아** 깨진 주소를 때린다.
 * 여기서는 없으면 없는 것이 기본값이다.
 */
const GA_ID = import.meta.env.VITE_GA_ID

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

/** 정본 형태 그대로 `arguments` 를 밀어 넣는다 — 배열로 바꾸지 않는다. */
const gtag: (...args: unknown[]) => void = function () {
  window.dataLayer.push(arguments)
}

export function initAnalytics(): void {
  if (!GA_ID) return

  const tag = document.createElement("script")
  tag.async = true
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(tag)

  window.dataLayer = window.dataLayer || []
  gtag("js", new Date())
  gtag("config", GA_ID)

  /**
   * `data-ga` 네 종류를 리스너 **하나**로 받는다. 인라인 핸들러는 계속 0 개다.
   *
   * `placement` 를 같이 보내는 이유: `demo_video` 와 `nav_features` 는 한 페이지에
   * 두 군데(히어로/푸터, 본문/푸터)에 붙어 있어 주소가 같다. 이게 없으면 둘이 합산돼
   * "어느 자리의 링크가 먹히는가" 를 못 본다.
   */
  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return
    const el = e.target.closest<HTMLElement>("[data-ga]")
    if (!el) return
    gtag("event", el.dataset.ga, {
      link_url: el.getAttribute("href"),
      placement: el.closest("section")?.id || "foot",
    })
  })
}
