export default function TemplatesLoading() {
  return (
    <main className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="h-8 w-72 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-[500px] max-w-full animate-pulse rounded-md bg-muted" />
          </div>

          <div className="h-12 w-72 animate-pulse rounded-lg bg-muted" />
        </div>

        {/* Categories */}
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-32 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>

        {/* Cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] animate-pulse rounded-xl border bg-muted/30"
            />
          ))}
        </div>

        {/* Bottom */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="h-72 animate-pulse rounded-xl border bg-muted/30" />

          <div className="h-80 animate-pulse rounded-xl border bg-muted/30" />
        </div>

      </div>
    </main>
  );
}