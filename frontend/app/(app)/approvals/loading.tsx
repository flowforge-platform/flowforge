export default function ApprovalsLoading() {
  return (
    <main className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-3">
            <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="hidden h-10 w-72 animate-pulse rounded-lg bg-muted md:block" />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border">
          <div className="h-14 animate-pulse border-b bg-muted/40" />

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse border-b bg-muted/20 last:border-b-0"
            />
          ))}
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-xl border bg-muted/30"
            />
          ))}
        </div>
      </div>
    </main>
  );
}