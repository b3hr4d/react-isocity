import { useMemo, useState } from "react"

const useTools = (
  rows = 12,
  cols = 6,
  defaultSelectedTool?: [number, number]
) => {
  const [selectedTool, setSelectedTool] = useState(defaultSelectedTool)

  const tools: [number, number][] = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, i) => [
        Math.floor(i / rows),
        Math.floor(i % rows),
      ]),
    [rows, cols]
  )

  return { tools, rows, cols, selectedTool, setSelectedTool }
}

export default useTools
