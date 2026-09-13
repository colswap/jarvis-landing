import type { CSSProperties } from "react"
import type { Item } from "@/content"
import { FIGURES } from "./figures"

/**
 * 기능 하나 = **행**이다. 카드가 아니다.
 * `42px 1fr` 단일 칼럼이고 본문 칼럼 폭이 묶여 있어 넓은 화면에서도 열이 늘지 않는다.
 * 행 높이는 설명 길이가 정한다 — 같은 높이 상자의 반복이 없으면 카드로 읽히지 않는다.
 *
 * `first` 는 구역의 첫 행이다. CSS `:first-of-type` 에 맡기면 행마다 래퍼가 있는
 * 구조에서 전부 첫 행이 되어 여덟 줄이 같은 무게로 깔린다.
 */
export function FeatureRow({ item, id, first }: { item: Item; id?: string; first?: boolean }) {
  const Fig = item.fig ? FIGURES[item.fig] : undefined
  const anchor = item.figAnchor ?? "right"

  return (
    <article className="feat" id={id} data-first={first ? "" : undefined} data-gutter={anchor === "gutter" ? "1" : undefined}>
      <div className="no">
        {item.no}
        {Fig && anchor === "gutter" ? (
          <span className="fig-gutter">
            <Fig />
          </span>
        ) : null}
      </div>
      <div className="body">
        <h3>
          {Fig && anchor === "inline" ? (
            <span className="fig-inline">
              <Fig />
            </span>
          ) : null}
          {item.title}
        </h3>
        <p style={{ "--w": item.width } as CSSProperties}>{item.body}</p>
        {Fig && (anchor === "right" || anchor === "mid") ? (
          <span className={anchor === "mid" ? "fig-mid" : "fig-right"}>
            <Fig />
          </span>
        ) : null}
      </div>
    </article>
  )
}
