"use client"

import { Compass, Plus, Trash2, Pencil, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import Link from "next/link";
import { useState, useEffect } from "react";
import { workflowService } from "@/services/workflow.service";
import { Workflow } from "@/types/workflow";
import { useRouter } from "next/navigation";

export default function Workflows(){

    const router = useRouter()

    const filters = [
        "All",
        "Draft",
        "Running",
        "Completed",
        "Failed"
    ];

    const [workflows, setWorkflows] = useState<Workflow[]>([])

    const handleDelete = async (id:string) => {
        await workflowService.delete(id);

        const data = await workflowService.getAll()

        setWorkflows([...data])
    }

    useEffect(()=> {
        async function loadWorkflows(){
            const data = await workflowService.getAll()
            setWorkflows(data)
        }

        loadWorkflows();
    },[])

    return (
        <>
        <div className="m-8 flex flex-col gap-5">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-4xl font-semibold">Workflows</h2>
                    <p className="opacity-70">Create, edit and execute workflow automations</p>
                </div>

                <div className="flex gap-10 items-end">
                    <Button variant={"outline"} className="flex items-center gap-2 cursor-pointer"><Compass size={20}/>Browse Templates</Button>
                    <Link href="/workflows/new">
                        <Button className="flex items-center gap-2 cursor-pointer"><Plus/>New Workflow</Button>
                    </Link>
                </div>
            </div>

            <div className="bg-[#161618] p-3 rounded-md">
                <div className="flex items-center gap-12">
                    <div  className="flex ">
                        <div className=" bg-[#0E0E10] rounded-md">
                        {filters.map((filter)=>(
                            <button className="py-3 px-5" key={filter}>{filter}</button>
                        ))}
                        </div>
                    </div>
                    <div className="flex gap-5 items-center">
                        Sort By: 
                        <Select>
                            <SelectTrigger className="bg-[#353437] p-5">
                                <SelectValue placeholder="Last Modified"/>
                            </SelectTrigger>
                            <SelectContent className="bg-[#161618] border-[#2A2A2D] text-white p-1">
                                <SelectItem value="modified">Last Modified</SelectItem>
                                <SelectItem value="created">Created Date</SelectItem>
                                <SelectItem value="a-z">Name (A-Z)</SelectItem>
                                <SelectItem value="z-a">Name (Z-A)</SelectItem>
                                <SelectItem value="executed">Last Executed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-5 items-center">
                        Type:
                        <Select>
                            <SelectTrigger className="bg-[#353437] p-5">
                                <SelectValue placeholder="All Types"/>
                            </SelectTrigger>
                            <SelectContent className="bg-[#161618] border-[#2A2A2D] text-white p-1">
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="emailWorkflow">Email Workflow</SelectItem>
                                <SelectItem value="httpWorkflow">HTTP Workflow</SelectItem>
                                <SelectItem value="mixedWorkflow">Mixed Workflow</SelectItem>
                                <SelectItem value="approvalWorkflow">Approval Workflow</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="bg-[#161618] p-3 rounded-md">
                <div className="grid grid-cols-[3fr_1.5fr_1.5fr_0.8fr_0.8fr_1fr] border-b border-zinc-800 px-6 py-4 text-s uppercase tracking-wider text-zinc-500">
                      <div>Workflow Name</div>
                      <div>Status</div>
                      <div>Last Modified</div>
                      <div>Nodes</div>
                      <div>Execs</div>
                      <div>Actions</div>
                </div>

                    {workflows.length === 0 ? (
                      <div className="flex h-64 items-center justify-center text-zinc-500">
                        No workflows found.
                      </div>
                    ) : (
                      workflows.map((workflow) => (
                        <div
                          key={workflow.id}
                          onClick={()=>
                            router.push(`/workflows/${workflow.id}`)
                          }
                          className="grid grid-cols-[3fr_1.5fr_1.5fr_0.8fr_0.8fr_1fr] items-center border-b border-zinc-900 px-6 py-6 last:border-none cursor-pointer"
                        >
                          {/* Workflow */}
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
                              ⚡
                            </div>
                      
                            <div>
                              <h3 className="font-semibold text-white">
                                {workflow.name}
                              </h3>
                      
                            </div>
                          </div>
                      
                          <div>
                            Draft
                          </div>
                      
                          <div className="text-zinc-300">
                            {new Date(workflow.updatedAt).toLocaleString()}
                          </div>
                      
                          {/* Nodes */}
                          <div className="text-zinc-300">
                            {workflow.nodes.length}
                          </div>
                      
                          {/* Execs */}
                          <div className="text-zinc-300">
                          </div>
                      
                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/workflows/${workflow.id}`);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(workflow.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled
                            >
                              <Play className="h-4 w-4 text-green-500" />
                            </Button>
                          </div>
                        </div>
                      ))
                                    )}

                    
            </div>

            <div className="">
                
            </div>
        </div>
        </>
    )
}