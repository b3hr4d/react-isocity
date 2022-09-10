interface ToolImageProps extends React.CSSProperties {
  onClick?: () => void;
}

const ToolImage: React.FC<ToolImageProps> = ({ onClick, ...rest }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "block",
        backgroundImage: `url(${require("../assets/city.png").default})`,
        ...rest,
      }}
    />
  );
};

export default ToolImage;
