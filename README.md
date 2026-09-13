# jarvis-landing

AR 헤드셋용 음성 에이전트 **JARVIS** 의 프로젝트 소개 페이지. 정적 2페이지 MPA.

- `index.html` — 홈 (히어로 · 무엇인가 · 핵심 기능 4 · 지금 만들어지고 있는 것 · 푸터)
- `features.html` — 기능 8개

```bash
npm install
npm run dev        # 개발 서버
npm run build      # tsc -b && vite build → dist/
npm run preview    # 빌드 결과 확인
```

배포는 Vercel. 주소가 루트라 `vite.config.ts` 의 `base` 는 기본값 그대로다.

## 라우터를 쓰지 않는 이유

react-router 대신 **vite 의 MPA 설정**으로 html 엔트리를 둘 둔다
(`build.rollupOptions.input`). 의존성이 안 늘고, GA 에서 두 페이지가 주소로 저절로 갈린다.
페이지 사이 이동은 평범한 `<a href="/features.html">` 이다.

## 문구를 고치는 곳

**`src/content.ts` 하나뿐이다.** 두 페이지가 같은 곳에서 읽으므로 갈리지 않는다.
지금 들어 있는 문구는 **임시**고, 데모 스크립트가 나오면 이 파일만 갈아끼운다.

⚠️ 여기 없는 사실을 만들지 않는다. 수상 이력·사용자 수·고객사·성능 수치는 0 건이고,
외부 고유명사는 Meta Quest 3 와 두 실주소(데모 영상 · 라이브 빌드)뿐이다.

## 디자인 토큰

색·유리·선·챔퍼는 전부 `src/tokens.css` 의 `:root` 한 곳에 있다. 이 파일 밖에 색
리터럴을 두지 않는다 — 두 곳에 적으면 한 곳은 반드시 낡는다.

**정본은 이 레포가 아니다.** JARVIS 본체에서 옮겨 적은 값이고, 그쪽이 바뀌면 같은
커밋에서 여기도 바꾼다:

| 무엇 | 정본 |
|---|---|
| 팔레트 · 유리 톤 · 상태색 | `JARVIS/apps/jarvis-orchestrator/public/panel-tokens.js` |
| 글자 밝기 사다리 · 선 · 질감 | `JARVIS/apps/jarvis-orchestrator/public/deck-tokens.js` |
| 카드 문법(챔퍼 · 발광 테두리 · 스캔라인) | `JARVIS/apps/jarvis-orchestrator/public/deck.css` |
| 규칙 · 글꼴 분업 | `JARVIS/docs/research/team-a/component-library.md` §3.5.1 · §7 |

글꼴 세 벌의 분업은 §3.5.1 을 따른다 — 한글과 라틴을 한 가족으로 합치지 않는다.
라틴 대문자 라벨(`.label`)에 한글을 넣으면 한 줄에 두 글꼴이 섞인다.
본문은 SUIT 대신 Pretendard 다(SUIT 은 npm 셀프호스팅 경로가 없다).

## GA4

측정 ID 는 **코드에 없다.** `src/analytics.ts` 가 빌드 시점에 `VITE_GA_ID` 를 읽고,
값이 비어 있으면 스크립트조차 내려받지 않는다.

Vercel → Settings → Environment Variables:

| Key | Value | Environments |
|---|---|---|
| `VITE_GA_ID` | `G-` 로 시작하는 측정 ID | **Production 만** |

Production 에만 넣는 이유는 보안이 아니다 — 측정 ID 는 비밀이 아니고 페이지 소스에
그대로 노출된다. 이유는 **지표 오염**이다. 로컬 `npm run dev`·프리뷰 배포·리허설이
같은 속성으로 들어가면 "심사위원이 몇 명 들어왔나" 를 못 센다.

⚠️ `import.meta.env` 는 빌드 시점에 박힌다. 값을 넣거나 바꾼 뒤에는 **재배포해야** 반영된다.

로컬에서 시험하려면 `.env.local` 에 `VITE_GA_ID=G-...`(gitignore 됨). 단, 그 순간부터
로컬 트래픽이 실제 속성으로 들어간다.

잡히는 것:

- `page_view` — 두 페이지가 주소(`/` · `/features.html`)로 갈린다. MPA 로 만든 이유다
- 커스텀 이벤트 4종 — `demo_video` · `live_build` · `nav_features` · `nav_home`.
  위임 리스너 하나가 `[data-ga]` 를 받는다(인라인 핸들러 0 개). 파라미터로 `link_url` 과
  `placement`(그 링크가 있던 구역 id)를 같이 보낸다 — 같은 링크가 히어로와 푸터 양쪽에
  있어서, 이게 없으면 둘이 합산돼 어느 자리가 먹히는지 못 본다
- GA4 향상된 측정이 외부 링크를 `click` 으로도 자동 수집한다. 우리 이벤트와 이름이 달라
  중복 집계가 아니라 별개 기록이다

## 두 외부 링크

| 링크 | 주소 | 성격 |
|---|---|---|
| 데모 영상 | `https://youtu.be/G9FP3YXII_0` | 완성된 시연 영상 |
| 지금 만들어지고 있는 것 | `https://jarvis-workspace.fly.dev:5173` | 헤드셋 안에서 실시간으로 만들어지는 중. **빌드가 돌고 있지 않으면 빈 화면이다** — 페이지 문구가 그 사실을 그대로 말한다 |

## 안 하는 것

이미지·영상 임베드·스크린샷·플레이스홀더 박스 0 개. 모든 그림은 stroke 로 그린
인라인 SVG 다. 폼·백엔드·DB 없음. 레포 링크·팀원 개인정보·아키텍처 다이어그램 없음.

되돌림 지점: 챔퍼 모서리가 이상하면 `src/app.css` 의 `.instr` / `::before` / `::after`
세 곳에서 `clip-path` 줄을 지운다. 모서리만 직각으로 돌아가고 나머지는 전부 산다.
