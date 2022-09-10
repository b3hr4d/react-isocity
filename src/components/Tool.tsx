import { useCanvasContext } from "../context/context";
import ToolImage from "./ToolImage";

interface ToolProps {
  x: number;
  y: number;
}

const Tool: React.FC<ToolProps> = ({ x, y }) => {
  const { texHeight, texWidth } = useCanvasContext();

  return (
    <ToolImage
      height={texHeight}
      width={texWidth}
      backgroundPosition={`-${x * texWidth}px -${y * texHeight}px`}
    />
  );
};

export default Tool;
