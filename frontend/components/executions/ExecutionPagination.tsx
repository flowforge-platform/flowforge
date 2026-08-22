import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ExecutionPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function ExecutionPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: ExecutionPaginationProps) {
  if (totalItems === 0 || totalPages <= 0) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-4 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Showing {startItem}-{endItem} of{" "}
        {totalItems.toLocaleString()} executions
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>

        {pages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`size-8 rounded-md text-sm transition-colors ${
                page === currentPage
                  ? "bg-primary font-medium text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="flex size-8 items-center justify-center text-xs text-muted-foreground"
            >
              &#8230;
            </span>
          )
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}