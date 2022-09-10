import CanvasContainer from "./components/CanvasContainer"
import Tools from "./components/Tools"

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CanvasContainer />
      <Tools />
    </div>
  )
}

export default App
