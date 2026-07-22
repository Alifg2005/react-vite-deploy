const VARIANT_CLASSES = {
  primary: "bg-brand-main text-white hover:opacity-90",
  dark: "bg-brand-dark text-white hover:opacity-90",
  outline: "border border-brand-border text-brand-text hover:bg-brand-main/10 hover:border-brand-main hover:text-brand-main",
} as const;

const DISABLED_CLASSES = "cursor-not-allowed bg-brand-white text-brand-muted hover:opacity-100";

function Button({
  text,
  variant = "primary",
  shape = "pill",
  type = "button",
  disabled = false,
  fullWidth = false,
  onClick,
}: {
  text: string;
  variant?: keyof typeof VARIANT_CLASSES;
  shape?: "pill" | "square";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  // Determine border radius based on shape parameter
  const roundedClass = shape === "square" ? "rounded-xl" : "rounded-full";
  const colorClass = disabled ? DISABLED_CLASSES : VARIANT_CLASSES[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 text-sm font-bold transition-all duration-200 ${roundedClass} ${colorClass} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {text}
    </button>
  );
}
export default Button