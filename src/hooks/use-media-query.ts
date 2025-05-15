
import * as React from "react"

export function useMediaQuery(query: string): boolean {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function onChange(mql: MediaQueryListEvent | MediaQueryList) {
      setValue(mql.matches)
    }

    const mql = window.matchMedia(query)
    setValue(mql.matches)

    // Safari < 14 doesn't support addEventListener on MediaQueryList
    if ("addEventListener" in mql) {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    } else {
      // @ts-expect-error - Safari < 14
      mql.addListener(onChange)
      // @ts-expect-error - Safari < 14
      return () => mql.removeListener(onChange)
    }
  }, [query])

  return value
}
