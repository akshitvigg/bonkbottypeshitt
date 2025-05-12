interface ButtonProps {
  value: any;
  size: "md" | "lg";
  variant: "primary" | "secondary";
  onClick?: () => void;
  status?: boolean;
  statusColor?: boolean;
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
sizeStyles.set("md", "py-3 px-6  rounded-2xl ");
sizeStyles.set("lg", "py-2.5 w-[320px] rounded-2xl ");

export default function Button(props: ButtonProps) {
  return (
    <div>
      <button
        onClick={props.onClick}
        className={` font-bold text-lg ${variantStyle.get(props.variant)} ${
          props.status && "flex"
        }  transition-all duration-300  active:scale-105  ease-in-out ${sizeStyles.get(
          props.size
        )}`}
      >
        {props.value}{" "}
        {props.status && (
          <p
            className={`items-center mt-2.5 ml-2.5  ${
              props.statusColor ? "bg-green-500" : "bg-red-500"
            } w-2 rounded-full h-2 `}
          ></p>
        )}
      </button>
    </div>
  );
}
