import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react"

type CanvasType = {
  ctx: CanvasRenderingContext2D | undefined
  img: HTMLImageElement | undefined
  clear: () => void
  canvasRef: (canvas: HTMLCanvasElement) => void
  tileNumber: number
  chance: number
  width: number
  height: number
  tileHeight: number
  tileWidth: number
  texWidth: number
  texHeight: number
}

const tileHeight = 64,
  tileWidth = 128,
  tileNumber = 8,
  chance = 20,
  texWidth = 130,
  texHeight = 230,
  width = tileWidth * tileNumber,
  height = tileHeight * tileNumber

const defaultValue: CanvasType = {
  ctx: undefined,
  img: undefined,
  clear: () => {},
  canvasRef: () => {},
  tileHeight,
  tileWidth,
  tileNumber,
  chance,
  texWidth,
  texHeight,
  width,
  height,
}

const CanvasContext = createContext<CanvasType>(defaultValue)

export const useCanvasContext = () => useContext(CanvasContext)

interface CanvasProps
  extends React.HTMLAttributes<HTMLCanvasElement>,
    Partial<CanvasType> {
  defaultSelectedTool?: [number, number]
  texture: string
  scale?: number
  min?: number
  max?: number
}

export const CanvasProvider: React.FC<CanvasProps> = ({
  children,
  texture,
  min = 0.1,
  max = 2,
  scale = 1,
  defaultSelectedTool,
  ...rest
}) => {
  const { tileNumber, chance, tileHeight, tileWidth, texWidth, texHeight } = {
    ...rest,
    ...defaultValue,
  }

  const [{ width, height }, setSize] = useState({
    width: tileWidth * tileNumber,
    height: tileHeight * tileNumber + tileHeight * 3,
  })

  const [img, setImg] = useState<HTMLImageElement>()

  const [ctx, setContext] = useState<CanvasRenderingContext2D>()

  useLayoutEffect(() => {
    const img = new Image()
    img.src = texture

    img.onload = () => {
      setImg(img)
      const width = tileWidth * tileNumber
      const height = tileHeight * tileNumber + tileHeight * 3
      setSize({ width, height })
    }

    return () => {
      img.onload = null
    }
  }, [])

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        ctx.translate(width / 2, tileHeight * 2)

        ctx.scale(scale, scale)

        setContext(ctx)
      }
    },
    [width, height, scale, tileHeight]
  )

  const clear = useCallback(() => {
    if (ctx) {
      ctx.clearRect(-width, -height, width * 2, height * 2)
    }
  }, [ctx, height, width])

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        clear,
        ctx,
        img,
        width,
        chance,
        height,
        texWidth,
        texHeight,
        tileWidth,
        tileHeight,
        tileNumber,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}
