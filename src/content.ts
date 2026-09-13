/**
 * 페이지에 실리는 문구는 **전부 여기 있다.** 확정 문구는 데모 스크립트가 나온 뒤
 * 이 파일만 갈아끼운다 — 두 페이지가 같은 곳에서 읽으므로 갈리지 않는다.
 *
 * ⚠️ 여기 없는 사실을 만들지 않는다. 수상 이력·사용자 수·고객사·성능 수치는 0 건이고,
 *    외부 고유명사는 Meta Quest 3 와 아래 두 실주소뿐이다.
 */

import type { FigAnchor, FigKind } from "./components/figures"

export const LINKS = {
  demo: "https://youtu.be/G9FP3YXII_0",
  demoLabel: "youtu.be/G9FP3YXII_0",
  live: "https://jarvis-workspace.fly.dev:5173",
  liveLabel: "jarvis-workspace.fly.dev:5173",
} as const

export const HERO = {
  kicker: "SPATIAL WORKSTATION · VOICE AGENT",
  title: ["말로 지시하면", "헤드셋 안에서 일이 끝난다"],
  lede: "Meta Quest 3 위에서 도는 공간 워크스테이션이자 음성 에이전트다. 화면을 띄우고 손으로 누르는 대신, 말한다.",
  /* 영상 안에 무엇이 어떻게 담겼는지는 확인 전이라 쓰지 않는다 — 매체와 동작만 말한다 */
  demoLine: "시연 영상 — 새 창에서 열립니다",
} as const

/** 무엇인가. 세 문장의 max-width 가 제각각이라 오른쪽 끝이 계단처럼 어긋난다. */
export const WHAT: { text: string; width: string }[] = [
  {
    text: "JARVIS 는 Meta Quest 3 헤드셋 위에서 도는 음성 에이전트다. 헤드셋을 쓴 채로 말을 걸면 메일·자료·명함·음악이 눈앞의 공간에서 처리된다.",
    width: "46ch",
  },
  {
    text: "웹사이트를 만들어 달라고 하면 백그라운드에서 클로드 코드가 실제로 만들고, 만들어지는 과정이 공간에 창으로 펼쳐진다.",
    width: "46ch",
  },
  { text: "학생 4인이 약 2개월 동안 만들고 있다.", width: "34ch" },
]

export type Item = {
  no: string
  title: string
  body: string
  /** 이 기능의 계기 도면. 없으면 그림이 없는 행이다 — 일부 행에만 있는 것이 의도다 */
  fig?: FigKind
  /** 그림이 붙는 자리. 항목마다 달라야 공통 아이콘 슬롯으로 안 읽힌다 */
  figAnchor?: FigAnchor
  /** 베젤 눈금에 서는 이름. 제목을 잘라 쓰면 어절 중간에서 끊긴다 */
  short?: string
  /** 항목마다 다르게 잡는다 — 같은 폭으로 맞추면 카드 격자로 읽힌다 */
  width: string
}

/** 홈의 핵심 기능 4개. features.html 의 8개와 알갱이 크기가 다르다 — 같은 목록의 반복이 아니다. */
export const HOME_ITEMS: Item[] = [
  {
    no: "01",
    title: "말로 지시하면 웹사이트가 만들어진다",
    fig: "gauge",
    figAnchor: "gutter",
    body: "백그라운드에서 클로드 코드가 붙어 코드를 쓴다. 결과물만 나오는 것이 아니라 만들어지는 과정이 공간에 창으로 뜬다.",
    width: "44ch",
  },
  {
    no: "02",
    title: "회의자료를 카드로 공간에 펼친다",
    fig: "deck",
    figAnchor: "mid",
    body: "자료를 만들어 달라고 하면 만들어서 눈앞에 늘어놓는다.",
    width: "38ch",
  },
  {
    no: "03",
    title: "명함은 찍어 두면 메일 쓸 때 나온다",
    fig: "reticle",
    figAnchor: "inline",
    body: "명함을 촬영해 저장해 두고, 나중에 메일을 보낼 때 거기서 받는 사람을 꺼낸다.",
    width: "42ch",
  },
  {
    no: "04",
    title: "메일 · 음악 · 브리핑",
    body: "메일을 읽고 보내고, 음악을 틀고, 지금 만들고 있는 사이트가 어떤 상태인지 물으면 답한다.",
    width: "40ch",
  },
]

export const LIVE = {
  label: "LIVE BUILD",
  title: "지금 헤드셋 안에서 만들어지는 중",
  body: "말로 지시하면 백그라운드에서 클로드 코드가 웹사이트를 만들고, 그 과정이 공간에 뜬다. 이 주소는 그 결과물이 실제로 서빙되는 자리다.",
  /** 정직 문구. 앰버로 올리는 조각을 따로 뺀다 — 본문이라 읽혀야 하는 앰버다.
      ⚠️ "빈 화면" 만 적으면 안 된다. 실측(2026-09-13): 워크스페이스가 꺼져 있으면
      fly 가 TLS 만 받고 35초쯤 매달린 뒤 502 를 준다 — 빈 화면이 아니라 오류다.
      두 상태(빌드 전 = 빈 화면 / 워크스페이스 꺼짐 = 오류)를 다 말해야 사실이 된다. */
  honestBefore: "빌드가 돌고 있지 않으면 이 주소는 ",
  honestAmber: "열리지 않는다",
  honestAfter:
    " — 빈 화면이 뜨거나, 한참 기다린 끝에 오류가 난다. 늘 켜 두는 서버가 아니라 작업 중에만 살아 있는 자리라서 그렇다. 그렇다면 지금은 아무도 만들고 있지 않다는 뜻이고, 그것도 이 계기가 읽어 주는 값 중 하나다.",
  cta: "안 열릴 수도 있는 주소 열기",
  lamps: [
    { tone: "on", label: "WORKING", text: "빌드가 도는 중이면 화면이 자라는 것을 본다" },
    { tone: "wait", label: "WAITING", text: "사람의 선택을 기다리는 중이면 멈춰 있다" },
    { tone: "off", label: "IDLE", text: "아무도 만들고 있지 않으면 열리지 않는다" },
  ],
} as const

/** 좌측 베젤 바닥의 판독 3줄. 값이 변하지 않는다 — 카운터가 아니다. */
export const READOUT = [
  { k: "TARGET", v: "Meta Quest 3" },
  { k: "INPUT", v: "음성" },
  { k: "TEAM", v: "4인 · 약 2개월" },
] as const

/** features.html — 세 구역. 영어 구역 라벨을 억지로 만들지 않는다(선만 가져온다). */
export type Group = { name: string; range: string; items: Item[]; sowhat: string }

export const GROUPS: Group[] = [
  {
    name: "만든다",
    range: "01–03",
    sowhat: "말한 것과 만들어지는 것 사이를, 헤드셋을 벗지 않고 오간다.",
    items: [
      {
        no: "01",
        title: "말로 부르고, 말로 시킨다",
    fig: "volume",
    figAnchor: "right",
        short: "음성 조작",
        body: "헤드셋을 쓴 채로 부르면 듣기 시작한다. 창을 띄우고 손으로 누르는 대신 하려는 일을 말로 시킨다.",
        width: "44ch",
      },
      {
        no: "02",
        title: "지시하면 웹사이트가 실제로 만들어진다",
    fig: "gauge",
    figAnchor: "gutter",
        short: "웹 제작",
        body: "만들어 달라고 말하면 백그라운드에서 클로드 코드가 붙어 코드를 쓴다. 사람이 받아 적는 자리가 없다.",
        width: "46ch",
      },
      {
        no: "03",
        title: "만들어지는 과정이 공간에 뜬다",
        short: "과정 표시",
        body: "작업 중인 화면이 옆에 창으로 선다. 지금 어디까지 됐는지 물으면 현황을 브리핑한다.",
        width: "40ch",
      },
    ],
  },
  {
    name: "기억한다",
    range: "04–06",
    sowhat: "명함은 찍는 순간이 아니라 메일을 쓰는 순간에 쓸모가 생긴다.",
    items: [
      {
        no: "04",
        title: "명함을 촬영해 저장한다",
    fig: "reticle",
    figAnchor: "inline",
        short: "명함 촬영",
        body: "받은 명함을 카메라에 비추면 읽어서 넣어 둔다. 나중에 찾을 수 있는 형태로 남는 것이 요점이다.",
        width: "44ch",
      },
      {
        no: "05",
        title: "메일 쓸 때 저장해 둔 명함에서 꺼낸다",
        short: "명함 재사용",
        body: "보낼 사람을 저장해 둔 명함에서 꺼내 온다. 명함을 찍는 일과 메일을 보내는 일이 따로 놀지 않는다.",
        width: "46ch",
      },
      {
        no: "06",
        title: "메일을 읽고 보낸다",
        short: "메일",
        body: "받은 메일을 읽어 주고, 불러 주는 대로 써서 보낸다.",
        width: "38ch",
      },
    ],
  },
  {
    name: "펼친다",
    range: "07–08",
    sowhat: "자료도 음악도 창을 찾아 들어가는 일이 아니라 말 한마디가 된다.",
    items: [
      {
        no: "07",
        title: "회의자료를 만들어 공간에 펼친다",
    fig: "deck",
    figAnchor: "mid",
        short: "회의자료",
        body: "자료를 만들어 달라고 하면 카드로 만들어 눈앞에 늘어놓는다. 슬라이드를 한 장씩 넘기는 대신 공간에 놓고 둘러본다.",
        width: "48ch",
      },
      {
        no: "08",
        title: "음악을 재생한다",
    fig: "bars",
    figAnchor: "right",
        short: "음악",
        body: "틀어 달라고 하면 튼다.",
        width: "34ch",
      },
    ],
  },
]

export const FEATURES_HEAD = {
  title: "하나하나 말로 시킨다",
  count: "08 ITEMS",
} as const

export const FOOT = {
  team: "학생 4인 · 약 2개월",
  target: "Meta Quest 3",
} as const
