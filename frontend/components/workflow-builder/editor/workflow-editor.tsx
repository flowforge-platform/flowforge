"use client";

import {
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import {
  initialNodes,
  initialEdges,
} from "@/lib/react-flow/initial-workflow";

import { WorkflowCanvas } from "./workflow-canvas";
import { WorkflowProperties } from "./workflow-properties";
import { WorkflowSidebar } from "./workflow-sidebar";
import { ReactFlowProvider } from "@xyflow/react";
import { WorkflowToolbar } from "./workflow-toolbar";

export default function WorkflowEditor() {


  return (
    <ReactFlowProvider>
    <div className="h-screen bg-[#09090B]">
      <WorkflowToolbar/>

      <div className="grid h-[calc(100vh-64px)] grid-cols-[260px_minmax(0,1fr)_360px]">
        <div className="border-r border-zinc-800">
          <WorkflowSidebar/>
        </div>

        <div>
          <WorkflowCanvas/>
        </div>

        <div className="overflow-x-auto border-l border-zinc-800">
          <WorkflowProperties />
        </div>
      </div>
    </div>
    </ReactFlowProvider>
  );
}