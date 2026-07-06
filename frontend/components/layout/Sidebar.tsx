"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CheckCheck,
  Grid2X2,
  Layers3,
  LogOut,
  PlayCircle,
  Settings,
  User,
  Workflow,
} from "lucide-react";

const mainLinks = [
  { label: "Dashboard", href: "/dashboard", icon: Grid2X2 },
  { label: "Workflows", href: "/workflows", icon: Workflow },
  { label: "Executions", href: "/executions", icon: PlayCircle },
  { label: "Approvals", href: "/approvals", icon: CheckCheck, badge: 1 },
  { label: "Templates", href: "/templates", icon: Layers3 },
  { label: "Monitoring", href: "/monitoring", icon: BarChart3 },
];

const bottomLinks = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-[280px] shrink-0 flex-col border-r border-white/[0.03] bg-[#1b1b1d] px-4 py-9 text-[#c9c5d5]">
      <Link href="/dashboard" className="mx-auto flex items-center gap-3">
        <Image
          src="/FlowForgeIcon.svg"
          alt="FlowForge"
          width={40}
          height={40}
          className="size-10 rounded-lg"
        />
        <div>
          <div className="text-[26px] font-bold leading-6 tracking-[-0.01em] text-[#e8e7ea]">
            FlowForge
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase leading-none tracking-[0.34em] text-[#d5d1dc]">
            Engineering Ops
          </div>
        </div>
      </Link>

      <nav className="mt-16 space-y-3">
        {mainLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex h-[43px] items-center gap-4 rounded-lg px-8 font-mono text-sm font-semibold tracking-[0.08em] transition-colors ${
                isActive
                  ? "bg-[#122f34] text-[#35e7ff]"
                  : "text-[#c3bdcf] hover:bg-white/[0.04] hover:text-[#ece8f4]"
              }`}
            >
              <Icon
                size={25}
                strokeWidth={2}
                className={isActive ? "text-[#35e7ff]" : "text-[#d4cfe0]"}
              />
              <span>{item.label}</span>
              {item.badge ? (
                <span className="ml-auto grid size-[18px] place-items-center rounded-full bg-[#744b4d] text-[10px] font-medium tracking-normal text-[#f0c6c5]">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/[0.03] pt-12">
        <nav className="space-y-4">
          {bottomLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-8 items-center gap-4 px-8 font-mono text-sm font-semibold tracking-[0.08em] transition-colors ${
                  isActive
                    ? "text-[#35e7ff]"
                    : "text-[#d2ccdd] hover:text-[#ece8f4]"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            className="flex h-8 w-full items-center gap-4 px-8 font-mono text-sm font-semibold tracking-[0.08em] text-[#e5a19d] transition-colors hover:text-[#ffc3bf]"
          >
            <LogOut size={20} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
