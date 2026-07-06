"use client";

import { LucideIcon } from "lucide-react";

type Props = {
  type: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function NodePaletteCard({
  type,
  title,
  description,
  icon: Icon,
}: Props) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="cursor-grab rounded-lg border border-zinc-800 bg-zinc-900 p-3 transition hover:border-violet-500 hover:bg-zinc-800 active:cursor-grabbing"
    >
      <div className="flex gap-3">
        <div className="rounded-md bg-violet-500/10 p-2">
          <Icon className="h-5 w-5 text-violet-400" />
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>

          <p className="text-xs text-zinc-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}