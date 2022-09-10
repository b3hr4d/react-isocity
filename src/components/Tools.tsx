import Tool from "./Tool"

interface ToolsProps {
  tools: [number, number][]
  rows?: number
  cols?: number
  setSelectedTool: (tool: [number, number]) => void
  selectedTool?: [number, number]
}

const Tools: React.FC<ToolsProps> = ({
  tools,
  selectedTool,
  setSelectedTool,
}) => {
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
        zIndex: 1,
        paddingTop: "0.5rem",
      }}
    >
      {tools.map(([x, y], i) => (
        <Tool
          x={x}
          y={y}
          key={i}
          setSelectedTool={setSelectedTool}
          selectedTool={selectedTool}
        />
      ))}
    </div>
  )
}

export default Tools
