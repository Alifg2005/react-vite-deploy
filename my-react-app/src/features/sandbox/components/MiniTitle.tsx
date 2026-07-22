export function MiniTitle({ title, txtColor, background }: { title: string; txtColor: string; background: string }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full px-5 py-1.5 text-sm font-bold w-fit"
      style={{
        backgroundColor: background,
        color: txtColor,
      }}
    >
      {title}
    </span>
  );
}
export default MiniTitle