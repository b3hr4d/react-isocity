import { useCallback, useState } from "react"
import { useCanvasContext } from "../context/context"

interface ForegroundProps extends React.HTMLAttributes<HTMLCanvasElement> {
  tileChanger: (row: number, col: number, value: number) => void
}

const Foreground: React.FC<ForegroundProps> = ({ tileChanger, ...rest }) => {
  const { ctx, width, height, texWidth, tileHeight, tileWidth, tileNumber } =
    useCanvasContext()

  const [fctx, setFctx] = useState<CanvasRenderingContext2D>()

  const foreClear = useCallback(() => {
    if (fctx) {
      fctx.clearRect(-width, -height, width * 2, height * 2)
    }
  }, [fctx, height, width])

  const getPosition = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      const y = (e.nativeEvent.offsetY - tileHeight * 2) / tileHeight
      const x = e.nativeEvent.offsetX / tileWidth - tileNumber / 2

      const row = Math.floor(y - x)
      const col = Math.floor(x + y)

      return [row, col]
    },
    [tileHeight, tileWidth, tileNumber]
  )

  const click = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      e.preventDefault()
      const [row, col] = getPosition(e)

      if (row >= 0 && row < tileNumber && col >= 0 && col < tileNumber) {
        const zero = e.button === 2 ? 0 : 1
        const one = e.button === 2 ? 0 : 0
        tileChanger(row, col, zero * texWidth + one)
      }
    },
    [getPosition, texWidth, tileNumber, tileChanger]
  )

  const drawForeTile = useCallback(
    (x: number, y: number, color: string) => {
      if (fctx) {
        fctx.save()
        fctx.translate(((y - x) * tileWidth) / 2, ((x + y) * tileHeight) / 2)
        fctx.beginPath()
        fctx.moveTo(0, 0)
        fctx.lineTo(tileWidth / 2, tileHeight / 2)
        fctx.lineTo(0, tileHeight)
        fctx.lineTo(-tileWidth / 2, tileHeight / 2)
        fctx.closePath()
        fctx.fillStyle = color
        fctx.fill()
        fctx.strokeStyle = "red"
        fctx.stroke()
        fctx.restore()
      }
    },
    [fctx, tileHeight, tileWidth]
  )

  const shadowViz: React.MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      if (fctx) {
        const [x, y] = getPosition(e)
        foreClear()

        if (x >= 0 && x < tileNumber && y >= 0 && y < tileNumber) {
          drawForeTile(x, y, "rgba(0,0,0,0.5)")
        }
      }
    },
    [foreClear, drawForeTile, fctx, getPosition, tileNumber]
  )

  const canvasRef = useCallback(
    (fcanvas: HTMLCanvasElement) => {
      if (fcanvas && ctx) {
        fcanvas.width = ctx.canvas.width
        fcanvas.height = ctx.canvas.height
        const fctx = fcanvas.getContext("2d") as CanvasRenderingContext2D
        fctx.translate(width / 2, tileHeight * 2)

        setFctx(fctx)
      }
    },
    [ctx, tileHeight, width]
  )

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={shadowViz}
      onContextMenu={click}
      onClick={click}
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
      }}
      {...rest}
    />
  )
}

export default Foreground
