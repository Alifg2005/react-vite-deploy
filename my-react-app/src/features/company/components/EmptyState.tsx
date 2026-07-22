function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-border bg-brand-white p-6 text-center text-sm text-brand-muted">
      {message}
    </div>
  );
}

export default EmptyState;
