export function SkeletonCard() {
  return (
    <div className="w-full rounded-lg border border-(--color-border) bg-(--color-bg-card) overflow-hidden shadow-(--shadow-sm) animate-pulse">
      <div className="aspect-square w-full bg-(--color-border)" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-1/4 rounded bg-(--color-border)" />
        <div className="h-4 w-full rounded bg-(--color-border)" />
        <div className="h-4 w-2/3 rounded bg-(--color-border)" />
        <div className="h-5 w-1/3 rounded bg-(--color-border) mt-2" />
      </div>
    </div>
  );
}
