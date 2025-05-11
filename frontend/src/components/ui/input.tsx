interface InputProps {
  placeholder: string;
  size: "md" | "lg";
  reference: any;
}

type sizes = "md" | "lg";

const sizeStyles = new Map<sizes, string>();
sizeStyles.set("md", "py-2 px-12 rounded-md border-2 border-zinc-200");
sizeStyles.set("lg", "py-3 px-14 rounded-lg border-2 border-zinc-200");

export function Input(props: InputProps) {
  return (
    <div>
      <input
        className={`${sizeStyles.get(props.size)} outline-none`}
        type="text"
        placeholder={props.placeholder}
        ref={props.reference}
      />
    </div>
  );
}
