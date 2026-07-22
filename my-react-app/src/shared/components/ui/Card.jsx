// Universal white card box.
// Replaces all inline  rounded-{xl|2xl} border border-brand-border bg-brand-white p-{n}  divs.
//
// Props:
//   radius   "xl" | "2xl"   — default "xl"
//   padding  "3" | "4" | "5" | "6" | "8"  — default "4"
//   shadow   true | false   — adds shadow-sm (default false)
//   dashed   true | false   — uses border-dashed (default false)
//   as       tag name       — default "div"
//   className              — extra classes merged in
//   children
//   ...rest                — any native div/article/etc. props
export default function Card({
  radius = "xl",
  padding = "4",
  shadow = false,
  dashed = false,
  as: Tag = "div",
  className = "",
  children,
  ...rest
}) {
  const radiusClass = radius === "2xl" ? "rounded-2xl" : "rounded-xl";
  const paddingClass = `p-${padding}`;
  const borderClass = dashed ? "border-dashed border-brand-border" : "border border-brand-border";
  const shadowClass = shadow ? "shadow-sm" : "";

  return (
    <Tag
      className={`${radiusClass} ${borderClass} bg-brand-white ${paddingClass} ${shadowClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
