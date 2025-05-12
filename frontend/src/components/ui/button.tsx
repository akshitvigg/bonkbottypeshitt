interface ButtonProps {
  value: any;
  size: "md" | "lg";
  variant: "primary" | "secondary";
  onClick?: () => void;
  status?: boolean;
  statusColor?: boolean;
  image?: boolean;
  changefn?: any;
  imgUrl?: any;
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
        <label>
          <img src={props.imgUrl} alt="" width={30} className=" rounded-full" />
          <input
            type="file"
            onChange={props.changefn}
            accept="image/*"
            className=" hidden"
          />
        </label>
        {props.status && (
          <p
            className={`items-center translate-y-5 -translate-x-1   ${
              props.statusColor ? "bg-green-500" : "bg-red-500"
            } w-2 rounded-full h-2 `}
          ></p>
        )}
        {props.value}{" "}
      </button>
    </div>
  );
}
