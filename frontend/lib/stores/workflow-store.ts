import { create } from "zustand"
import { Edge, Node, XYPosition } from "@xyflow/react";
import { initialNodes, initialEdges } from "../react-flow/initial-workflow";
import { createNode } from "../react-flow/node-factory";
import { Workflow } from "@/types/workflow";
import { WorkflowNodeType } from "@/types/workflow-definition";

type NodeType = "start" | "httpRequest" | "condition";

interface ExportedWorkflow {
  id: string;
  name: string;
  description: string;
  status: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
}

type WorkflowStore = {
  nodes: Node[];

  edges: Edge[];

  isDirty: boolean;

  setIsDirty: (dirty: boolean) => void;

  selectedNodeId: string | null;

  workflowId: string | null;

  setWorkflowId: (id: string | null) => void;

  workflowStatus: string | null;

  setWorkflowStatus: (status: string | null) => void;

  activeExecutionId: string | null;

  activeExecutionStatus: string | null;

  setActiveExecution: (id: string | null, status: string | null) => void;

  workflowName: string;

  setWorkflowName: (
    name: string
  ) => void;

  addNode: (type: WorkflowNodeType, position: XYPosition) => void;

  deleteNode: (id: string) => void;

  setNodes: (
    updater:
      | Node[]
      | ((nodes: Node[]) => Node[])
  ) => void;

  setEdges: (
    updater:
      | Edge[]
      | ((edges: Edge[]) => Edge[])
  ) => void;

  setSelectedNodeId: (
    id: string | null
  ) => void;

  duplicateNode: (id: string) => void;

  exportWorkflow: () => ExportedWorkflow;

  importWorkflow: (workflow: ExportedWorkflow) => void;

  resetWorkflow: () => void;
};

export const useWorkflowStore =
  create<WorkflowStore>((set) => ({

    nodes: initialNodes,
    edges: initialEdges,
    selectedNodeId: null,

    workflowId: null,

    setWorkflowId: (id) =>
      set({
        workflowId: id,
      }),

    workflowStatus: "DRAFT",

    setWorkflowStatus: (status) =>
      set({
        workflowStatus: status,
      }),

    activeExecutionId: null,

    activeExecutionStatus: null,

    setActiveExecution: (id, status) =>
      set({
        activeExecutionId: id,
        activeExecutionStatus: status,
      }),

    setNodes: (updater) =>
      set((state) => ({
        nodes:
          typeof updater === "function"
            ? updater(state.nodes)
            : updater,
      })),

    setEdges: (updater) =>
      set((state) => ({
        edges:
          typeof updater === "function"
            ? updater(state.edges)
            : updater,
      })),

    setSelectedNodeId: (id) =>
      set({
        selectedNodeId: id,
      }),

    addNode: (type, position) =>
      set((state) => {
        const newNode = createNode(type, position);

        return {
          nodes: [...state.nodes, newNode],
          isDirty: true
        };
      }),

    deleteNode: (id) =>
      set((state) => ({
        nodes: state.nodes.filter(
          (node) => node.id !== id
        ),

        edges: state.edges.filter(
          (edge) =>
            edge.source !== id &&
            edge.target !== id
        ),

        selectedNodeId:
          state.selectedNodeId === id
            ? null
            : state.selectedNodeId,
      })),

    workflowName: "Untitled Workflow",

    setWorkflowName: (name) =>
      set({
        workflowName: name,
      }),

    duplicateNode: (id) =>
      set((state) => {
        const node = state.nodes.find(
          (n) => n.id === id
        );

        if (!node) return state;

        const duplicatedNode = {
          ...node,
          id: crypto.randomUUID(),
          position: {
            x: node.position.x + 40,
            y: node.position.y + 40,
          },
          selected: false,
        };

        return {
          nodes: [...state.nodes, duplicatedNode],
          isDirty: true
        };
      }),

      
    exportWorkflow: (): ExportedWorkflow => {
      const state = useWorkflowStore.getState();

      const now = new Date().toISOString();

      return {
        id: state.workflowId ?? crypto.randomUUID(),
        name: state.workflowName,
        description: "",
        status: state.workflowStatus ?? "DRAFT",

        nodes: state.nodes,
        edges: state.edges,

        createdAt: now,
        updatedAt: now,
      };
    },

    importWorkflow: (workflow) =>
      set({
        workflowId: workflow.id,
        workflowName: workflow.name,
        workflowStatus: workflow.status ?? "DRAFT",
        activeExecutionId: null,
        activeExecutionStatus: null,
        nodes: workflow.nodes,
        edges: workflow.edges,
        selectedNodeId: null,
        isDirty: false,
      }),

    resetWorkflow: () =>
      set({
        workflowId: null,
        workflowName: "Untitled Workflow",
        workflowStatus: "DRAFT",
        activeExecutionId: null,
        activeExecutionStatus: null,
        nodes: initialNodes,
        edges: initialEdges,
        selectedNodeId: null,
        isDirty: false,
      }),

    isDirty: false,

    setIsDirty: (dirty) =>
      set({
        isDirty: dirty,
      })

  }))