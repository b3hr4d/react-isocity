import CanvasContainer from "./components/CanvasContainer"
import Tools from "./components/Tools"
import useTools from "./hooks/useTools"

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  const { tools, rows, selectedTool, setSelectedTool } = useTools()

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
      <CanvasContainer
        rows={rows}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
      <Tools
        tools={tools}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
    </div>
  )
}

export default App
