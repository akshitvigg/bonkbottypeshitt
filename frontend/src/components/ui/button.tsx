interface ButtonProps {
  value: any;
  size: "md" | "lg";
  variant: "primary" | "secondary";
  onClick: () => void;
}

type variants = "primary" | "secondary";

const variantStyle = new Map<variants, string>();
variantStyle.set("primary", "bg-black hover:bg-zinc-700 text-white ");
variantStyle.set(
  "secondary",
  "bg-transparent border hover:bg-zinc-100 border-zinc-300 text-black "
);

type sizes = "md" | "lg";

const sizeStyles = new Map<sizes, string>();
sizeStyles.set("md", "py-2 px-33 rounded-md ");
sizeStyles.set("lg", "py-3 w-[320px] rounded-lg ");

export default function Button(props: ButtonProps) {
  return (
    <div>
      <button
        onClick={props.onClick}
        className={`${variantStyle.get(
          props.variant
        )} transition-all duration-300  active:scale-105  ease-in-out ${sizeStyles.get(
          props.size
        )}`}
      >
        {props.value}
      </button>
    </div>
  );
}
