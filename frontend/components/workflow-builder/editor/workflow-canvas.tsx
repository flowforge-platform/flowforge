"use client";

import {
  Background,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Controls,
  MiniMap,
  EdgeChange,
  NodeChange,
  useReactFlow
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { WorkflowNodeType } from "@/types/workflow";
import { nodeTypes } from "@/lib/react-flow/node-types";
import { useCallback, useEffect } from "react";
import { useWorkflowStore } from "@/lib/stores/workflow-store";

export function WorkflowCanvas() {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setSelectedNodeId,
    addNode,
    deleteNode,
    selectedNodeId,
    duplicateNode,
    setIsDirty,
    workflowStatus
  } = useWorkflowStore();

  const isPublished = workflowStatus === "PUBLISHED";

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (isPublished) return;
      setNodes((nds) => applyNodeChanges(changes, nds));
      setIsDirty(true);
    },
    [setNodes, setIsDirty, isPublished]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (isPublished) return;
      setEdges((eds) => applyEdgeChanges(changes, eds));
      setIsDirty(true);
    },
    [setEdges, setIsDirty, isPublished]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (isPublished) return;
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges, isPublished]
  );

  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback(
    (event: React.DragEvent) => {
      if (isPublished) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    [isPublished]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      if (isPublished) return;
      event.preventDefault();

      const type = event.dataTransfer.getData(
        "application/reactflow"
      );

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(
        type as WorkflowNodeType,
        position
      );
    },
    [screenToFlowPosition, addNode, isPublished]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPublished) return;

      if (
        (event.key === "Delete" ||
          event.key === "Backspace") &&
        selectedNodeId
      ) {
        deleteNode(selectedNodeId);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "d"
      ) {
        event.preventDefault();

        if (selectedNodeId) {
          duplicateNode(selectedNodeId);
        }
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [deleteNode, duplicateNode, selectedNodeId, isPublished]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodesDraggable={!isPublished}
      nodesConnectable={!isPublished}
      deleteKeyCode={isPublished ? null : ["Backspace", "Delete"]}
      onNodeClick={(_, node) => {
        setSelectedNodeId(node.id);
      }}
      fitView
      onDragOver={onDragOver}
      onDrop={onDrop}
      onPaneClick={() => setSelectedNodeId(null)}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}