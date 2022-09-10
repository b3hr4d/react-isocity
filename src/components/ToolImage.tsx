interface ToolImageProps extends React.CSSProperties {
  onClick?: () => void
  selected?: boolean
}

const ToolImage: React.FC<ToolImageProps> = ({
  onClick,
  selected,
  ...rest
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "block",
        border: selected ? "1px dashed white" : "1px solid black",
        backgroundImage: `url(${require("../assets/city.png").default})`,
        ...rest,
      }}
    />
  )
}

export default ToolImage
