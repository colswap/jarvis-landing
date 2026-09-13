import { useEffect, useState } from "react"

/**
 * 지금 읽고 있는 구역. 레일 눈금의 **바늘이 읽는 값**이다 — 스크롤 위치라는 실제 상태고,
 * 값이 안 바뀌면 바늘도 안 움직인다. 이것 말고 JS 가 건드리는 값은 없다.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "")

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null)
    if (nodes.length === 0) return

    const seen = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting)
        const hit = ids.find((id) => seen.get(id))
        if (hit) setActive(hit)
      },
      // 화면 허리를 지나는 구역이 활성이다
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [ids])

  return active
}
