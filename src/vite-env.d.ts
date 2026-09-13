/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * GA4 측정 ID (`G-` 로 시작). **빌드 시점에 박힌다** — Vercel 에서 값을 넣거나 바꾸면
   * 재배포해야 반영된다. Production 환경에만 넣는다: 그래야 로컬 dev 와 프리뷰 배포가
   * 같은 속성으로 들어가 심사위원 방문 수를 오염시키지 않는다.
   */
  readonly VITE_GA_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
