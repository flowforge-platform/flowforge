"use client";

import { useWorkflowStore } from "@/lib/stores/workflow-store";
import { Node } from "@xyflow/react";


export function WorkflowProperties() {

  const{nodes, setNodes, selectedNodeId, workflowName, setIsDirty} = useWorkflowStore();

  const selectedNode = nodes.find(
    (node) => node.id === selectedNodeId
  );

  if (!selectedNode) {
    return (
      <div className="p-4 text-zinc-400">
        Select a node
      </div>
    );
  }

  const updateNodeField = (
  key: string,
  value: unknown
) => {
  setNodes((nds: Node[]) =>
    nds.map((node) =>
      node.id === selectedNode.id
        ? {
            ...node,
            data: {
              ...(node.data as any),
              [key]: value,
            },
          }
        : node
    )
  );
  setIsDirty(true)
};

  return (
    <div className="p-4">
      <h2 className="mb-6 text-lg font-semibold">
        {workflowName}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs text-zinc-400">
            Node ID
          </label>

          <input
            value={selectedNode.id}
            readOnly
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-zinc-400">
            Label
          </label>

          <input
            value={(selectedNode.data as any).label}
            onChange={(e)=>{
              updateNodeField("label", e.target.value)
              
            }}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2"
          />

          {selectedNode.type === "httpRequest" && (
            <div>

              <div className="mt-4">

                <label className="mb-2 block text-xs text-zinc-400">
                  Endpoint
                </label>

                <input value={(selectedNode.data as any).endpoint} 
                onChange={(e)=>{
                  updateNodeField(
                    "endpoint",
                    e.target.value
                  )
                }}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2" />

              </div>

              <div className="mt-4">
            
                <label className="mb-2 block text-xs text-zinc-400">
                  Method
                </label>

                <select 
                value={(selectedNode.data as any).method}
                onChange={(e)=>
                  updateNodeField(
                    "method",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>PATCH</option>
                  <option>DELETE</option>
                </select>

                {/* <input value={(selectedNode.data as any).method}  readOnly
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2" /> */}

              </div>

              <div className="mt-4">

                <label className="mb-2 block text-xs text-zinc-400">
                  Timeout
                </label>

                <input 
                type="number"
                value={(selectedNode.data as any).timeout}  
                onChange={(e)=>
                  updateNodeField(
                    "timeout",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2" />

              </div>

            </div>
          )}

          {selectedNode.type === "condition" && (
            <div className="mt-4">
              
              <label className="mb-2 block text-xs text-zinc-400">
                Condition
              </label>

              <textarea value={(selectedNode.data as any).condition}
              onChange={(e)=>
                updateNodeField(
                  "condition",
                  e.target.value
                )
              }
              className="min-h-[120px] w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2"/>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}