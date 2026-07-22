function SkeletonGrid({
  count = 3,
  containerClassName = "grid gap-3 md:grid-cols-2",
  itemClassName = "h-32",
}: {
  count?: number;
  containerClassName?: string;
  itemClassName?: string;
}) {
  return (
    <div className={containerClassName}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`animate-pulse rounded-2xl border border-brand-border bg-brand-white ${itemClassName}`} />
      ))}
    </div>
  );
}

export default SkeletonGrid;
