import Link from "next/link";
import { Bell, Plus, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-[67px] w-full items-center justify-between border-b border-white/[0.06] bg-[#111112] px-8">
      <label className="flex h-9 w-full max-w-[386px] items-center gap-4 rounded-lg border border-white/[0.08] bg-[#202023] px-4 text-[#d7d2df] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <Search size={21} strokeWidth={2.3} className="shrink-0" />
        <input
          type="search"
          placeholder="Quick find workflows..."
          className="h-full min-w-0 flex-1 bg-transparent font-sans text-sm text-[#e3deea] outline-none placeholder:text-[#807b8b]"
        />
      </label>

      <div className="flex items-center">
        <button
          type="button"
          aria-label="Notifications"
          className="grid size-10 place-items-center text-[#d7d2df] transition-colors hover:text-white"
        >
          <Bell size={20} strokeWidth={2.2} />
        </button>

        <div className="mx-5 h-8 w-px bg-white/[0.06]" />

        <Link
          href="/workflows/new"
          className="flex h-8 items-center gap-2 rounded-lg bg-[#8174ff] px-7 font-mono text-sm font-bold tracking-[0.08em] text-[#1d1647] transition-colors hover:bg-[#9489ff]"
        >
          <Plus size={17} strokeWidth={2.6} />
          <span>Create Workflow</span>
        </Link>

        <button
          type="button"
          aria-label="Open profile menu"
          className="ml-4 grid size-9 place-items-center rounded-full border border-[#263833] bg-[#101513] p-0.5"
        >
          <span className="relative block size-7 overflow-hidden rounded-full bg-[#16231f]">
            <span className="absolute left-1/2 top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-[#f0c4a3]" />
            <span className="absolute left-1/2 top-4 h-4 w-5 -translate-x-1/2 rounded-t-full bg-[#5f4638]" />
            <span className="absolute inset-x-1 top-0 h-3 rounded-b-full bg-[#111214]" />
            <span className="absolute left-[5px] top-[13px] h-4 w-1.5 rotate-[18deg] rounded-full bg-[#5dc6cf]" />
            <span className="absolute right-[5px] top-[13px] h-4 w-1.5 -rotate-[18deg] rounded-full bg-[#d87554]" />
          </span>
        </button>
      </div>
    </header>
  );
}
