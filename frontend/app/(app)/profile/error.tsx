"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({
  reset,
}: ErrorProps) {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
      <p>Failed to load profile.</p>

      <button
        onClick={reset}
        className="rounded-md border px-4 py-2"
      >
        Try Again
      </button>
    </div>
  );
}