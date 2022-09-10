import { useRef } from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { useCanvasContext } from "../context/context"
import useTileMap from "../hooks/useTileMap"
import Background from "./Background"
import Foreground from "./Foreground"

interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
  setSelectedTool: (tool: [number, number]) => void
  selectedTool?: [number, number]
  rows: number
}

const CanvasContainer: React.FC<AppProps> = ({
  setSelectedTool,
  selectedTool,
  rows,
}) => {
  const { current: scale } = useRef(window.innerWidth / 1200)
  const { width, height } = useCanvasContext()

  const { tileChanger, tileMap } = useTileMap()

  return (
    <TransformWrapper
      centerZoomedOut
      centerOnInit
      initialScale={scale}
      minScale={scale < 1 ? scale : 1}
      maxScale={scale > 1.5 ? scale : 1.5}
      pinch={{
        step: 0.05,
      }}
      wheel={{
        step: 0.05,
      }}
    >
      <TransformComponent
        wrapperStyle={{
          position: "relative",
          height: "80vh",
          width: "100vw",
          zIndex: 0,
        }}
        contentStyle={{
          position: "absolute",
          width,
          height,
        }}
      >
        <Background tileMap={tileMap} />
        <Foreground
          rows={rows}
          tileChanger={tileChanger}
          setSelectedTool={setSelectedTool}
          selectedTool={selectedTool}
        />
      </TransformComponent>
    </TransformWrapper>
  )
}

export default CanvasContainer
