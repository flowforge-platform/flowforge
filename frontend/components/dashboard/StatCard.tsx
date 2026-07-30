import {
  LucideIcon,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  trend,
  icon: Icon,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {value}
          </p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      </div>

      {(description || trend !== undefined) && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          {trend !== undefined && (
            <>
              {isPositive ? (
                <TrendingUp className="size-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="size-3.5 text-red-500" />
              )}

              <span
                className={
                  isPositive
                    ? "font-medium text-emerald-500"
                    : "font-medium text-red-500"
                }
              >
                {Math.abs(trend)}%
              </span>
            </>
          )}

          {description && (
            <span className="text-muted-foreground">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}