import { useCallback, useMemo } from "react"
import { useCanvasContext } from "../context/context"
import ToolImage from "./ToolImage"

interface ToolProps {
  x: number
  y: number
  margin?: number | string
  padding?: number
  scale?: number
  setSelectedTool: (tool: [number, number]) => void
  selectedTool?: [number, number]
}

const Tool: React.FC<ToolProps> = ({
  x,
  y,
  margin = "0 0.5rem 0.5rem 0",
  scale = 0.5,
  padding,
  selectedTool,
  setSelectedTool,
}) => {
  const { texHeight, texWidth } = useCanvasContext()

  const clickHandler = useCallback(() => setSelectedTool([x, y]), [x, y])

  const selected = useMemo(
    () => selectedTool?.every((v, i) => v === [x, y][i]),
    [selectedTool, x, y]
  )

  return (
    <div
      style={{
        width: texWidth * scale,
        height: texHeight * scale,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        margin,
        padding,
      }}
    >
      <ToolImage
        onClick={clickHandler}
        backgroundColor={selected ? "red" : "white"}
        selected={selected}
        height={texHeight}
        width={texWidth}
        backgroundPosition={`-${y * texWidth}px -${x * texHeight}px`}
      />
    </div>
  )
}

export default Tool
