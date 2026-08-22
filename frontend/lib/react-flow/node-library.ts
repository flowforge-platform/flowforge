import {
  Play,
  Square,
  Globe,
  GitBranch,
  LucideIcon,
} from "lucide-react";

import { WorkflowNodeType } from "@/types/workflow";

export type NodeLibraryItem = {
  type: WorkflowNodeType;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const NODE_LIBRARY: NodeLibraryItem[] = [
  {
    type: "start",
    title: "Start",
    description: "Workflow entry point",
    icon: Play,
  },
  {
    type: "end",
    title: "End",
    description: "Workflow exit point",
    icon: Square,
  },
  {
    type: "httpRequest",
    title: "HTTP Request",
    description: "Call external APIs",
    icon: Globe,
  },
  {
    type: "condition",
    title: "Condition",
    description: "Branch workflow",
    icon: GitBranch,
  },
];