export default function DashboardLoading() {
  return (
    <main className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="h-7 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl border bg-muted/40"
            />
          ))}
        </div>

        {/* Main content */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <div className="h-80 animate-pulse rounded-xl border bg-muted/40" />

            <div className="h-96 animate-pulse rounded-xl border bg-muted/40" />
          </div>

          <div className="space-y-6">
            <div className="h-80 animate-pulse rounded-xl border bg-muted/40" />

            <div className="h-96 animate-pulse rounded-xl border bg-muted/40" />
          </div>
        </div>
      </div>
    </main>
  );
}