import { useMemo } from "react"
import Tool from "./Tool"

interface ToolsProps {
  rows?: number
  cols?: number
}

const Tools: React.FC<ToolsProps> = ({ rows = 12, cols = 6 }) => {
  const tools = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, i) => [
        Math.floor(i % rows),
        Math.floor(i / rows),
      ]),
    [rows, cols]
  )

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        overflow: "auto",
        height: "20vh",
      }}
    >
      {tools.map(([x, y], i) => (
        <Tool x={x} y={y} key={i} />
      ))}
    </div>
  )
}

export default Tools
