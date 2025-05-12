interface LoadingProps {
  size?: number;
  color: "white" | "black";
}

// type colors = "white" | "black"

// const colorStyles = new Map<colors , string>()
// colorStyles.set("black", "bor")

export default function Loader({ size = 24, color }: LoadingProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          width: size,
          height: size,
        }}
        className={`border-2 border-${color} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}
