// Dashed-border "no results" placeholder.
// Used wherever a list/carousel/grid is empty after filtering.
export default function EmptyState({ message }) {
  return (
    <p className="rounded-lg border border-dashed border-brand-border bg-brand-white p-4 text-center text-sm text-brand-muted">
      {message}
    </p>
  );
}
