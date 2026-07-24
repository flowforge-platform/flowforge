export default function MonitoringLoading() {
  return (
    <main className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-3">
            <div className="h-8 w-52 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-96 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="h-10 w-60 animate-pulse rounded-lg bg-muted" />
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl border bg-muted/30"
            />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 xl:grid-cols-3">

          <div className="h-[420px] animate-pulse rounded-xl border bg-muted/30 xl:col-span-2" />

          <div className="h-[420px] animate-pulse rounded-xl border bg-muted/30" />

          <div className="h-[320px] animate-pulse rounded-xl border bg-muted/30" />

          <div className="h-[320px] animate-pulse rounded-xl border bg-muted/30" />

          <div className="h-[320px] animate-pulse rounded-xl border bg-muted/30" />

          <div className="h-[260px] animate-pulse rounded-xl border bg-muted/30 xl:col-span-3" />

        </div>

      </div>
    </main>
  );
}