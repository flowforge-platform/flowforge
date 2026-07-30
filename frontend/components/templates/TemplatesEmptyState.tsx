export default function TemplatesEmptyState() {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-xl border bg-card">
      <div className="text-center">

        <h2 className="text-xl font-semibold">
          No templates found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Try changing your filters.
        </p>

      </div>
    </div>
  );
}