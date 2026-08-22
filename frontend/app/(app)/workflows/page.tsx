"use client"

import {
  Compass,
  Plus,
  Trash2,
  Pencil,
  Play,
  Workflow as WorkflowIcon,
  RefreshCw,
  ArrowUpDown,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { workflowService } from "@/services/workflow.service";
import { Workflow } from "@/types/workflow";
import { useRouter } from "next/navigation";

function renderStatusBadge(status?: string) {
  const upper = (status || "DRAFT").toUpperCase();
  let badgeStyle = "border-zinc-700/40 bg-zinc-800/60 text-zinc-300";
  let dotStyle = "bg-zinc-400";
  let label = "Draft";

  if (upper === "PUBLISHED") {
    badgeStyle = "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
    dotStyle = "bg-emerald-400";
    label = "Published";
  } else if (upper === "ARCHIVED") {
    badgeStyle = "border-amber-500/20 bg-amber-500/10 text-amber-400";
    dotStyle = "bg-amber-400";
    label = "Archived";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${badgeStyle}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyle}`} />
      {label}
    </span>
  );
}

export default function Workflows() {
  const router = useRouter()

  const filterTabs = [
    "All",
    "Draft",
    "Published",
    "Archived",
  ];

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("modified");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadWorkflows = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    try {
      const data = await workflowService.getAll();
      setWorkflows(data || []);
    } catch (err) {
      console.error("Failed to load workflows:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  const handleDelete = async (id: string) => {
    try {
      await workflowService.delete(id);
      await loadWorkflows(true);
    } catch (err) {
      console.error("Failed to delete workflow:", err);
    }
  };

  const handlePublishWorkflow = async (id: string) => {
    try {
      await workflowService.publish(id);
      await loadWorkflows(true);
    } catch (err: any) {
      console.error("Failed to publish workflow:", err);
      alert(
        err?.response?.data?.message ||
        "Failed to publish workflow. Please ensure node configuration is valid."
      );
    }
  };

  const filteredWorkflows = useMemo(() => {
    let result = [...workflows];

    // Filter by Workflow Lifecycle Status (DRAFT, PUBLISHED, ARCHIVED)
    if (activeFilter !== "All") {
      const target = activeFilter.toUpperCase();
      result = result.filter((w) => {
        const s = (w.status || "DRAFT").toUpperCase();
        return s === target;
      });
    }

    // Sort workflows
    result.sort((a, b) => {
      if (sortBy === "modified") {
        return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
      }
      if (sortBy === "created") {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (sortBy === "a-z") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "z-a") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

    return result;
  }, [workflows, activeFilter, sortBy]);

  return (
    <>
      <div className="m-8 flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Workflows</h2>
            <p className="mt-1 text-sm text-muted-foreground">Create, edit and execute workflow automations</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant={"outline"} className="flex items-center gap-2 cursor-pointer">
              <Compass className="size-4" />
              Browse Templates
            </Button>
            <Link href="/workflows/new">
              <Button className="flex items-center gap-2 cursor-pointer bg-[#8174ff] text-white hover:bg-[#6c5ce7]">
                <Plus className="size-4" />
                New Workflow
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter & Control Bar - Aligned visually with ExecutionsFilterBar */}
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    activeFilter === tab
                      ? "bg-background text-foreground shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort By:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 w-[180px] rounded-lg border bg-muted/30 px-3 text-sm">
                  <SelectValue placeholder="Last Modified" />
                </SelectTrigger>
                <SelectContent className="border bg-popover text-popover-foreground">
                  <SelectItem value="modified">Last Modified</SelectItem>
                  <SelectItem value="created">Created Date</SelectItem>
                  <SelectItem value="a-z">Name (A-Z)</SelectItem>
                  <SelectItem value="z-a">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Refresh Action */}
          <button
            type="button"
            onClick={() => loadWorkflows(true)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            <RefreshCw className={`size-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Workflows Table */}
        <div className="rounded-xl border bg-card p-1">
          <div className="grid grid-cols-[3fr_1.5fr_1.5fr_0.8fr_0.8fr_1fr] border-b border-border/60 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <div>Workflow Name</div>
            <div>Status</div>
            <div>Last Modified</div>
            <div>Nodes</div>
            <div>Execs</div>
            <div>Actions</div>
          </div>

          {isLoading ? (
            <div className="flex h-64 flex-col items-center justify-center space-y-3 text-muted-foreground">
              <RefreshCw className="size-6 animate-spin" />
              <p className="text-sm">Loading workflows...</p>
            </div>
          ) : filteredWorkflows.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
              No workflows match the selected filter.
            </div>
          ) : (
            filteredWorkflows.map((workflow) => {
              const isPublished = (workflow.status || "").toUpperCase() === "PUBLISHED";

              return (
                <div
                  key={workflow.id}
                  onClick={() => router.push(`/workflows/${workflow.id}`)}
                  className="group grid grid-cols-[3fr_1.5fr_1.5fr_0.8fr_0.8fr_1fr] items-center border-b border-border/40 px-6 py-4 last:border-none cursor-pointer transition-colors hover:bg-muted/40"
                >
                  {/* Workflow Name */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8174ff]/20 bg-[#8174ff]/10 text-[#a49aff] transition-colors group-hover:border-[#8174ff]/40 group-hover:bg-[#8174ff]/20">
                      <WorkflowIcon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground transition-colors group-hover:text-[#a49aff]">
                        {workflow.name}
                      </h3>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    {renderStatusBadge(workflow.status)}
                  </div>

                  {/* Last Modified */}
                  <div className="text-sm text-muted-foreground">
                    {workflow.updatedAt ? new Date(workflow.updatedAt).toLocaleString() : "-"}
                  </div>

                  {/* Nodes */}
                  <div className="text-sm text-muted-foreground">
                    -
                  </div>

                  {/* Execs */}
                  <div className="text-sm text-muted-foreground">
                    -
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Edit workflow"
                      aria-label="Edit workflow"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/workflows/${workflow.id}`);
                      }}
                      className="h-8 w-8 text-muted-foreground transition-colors hover:border hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    {!isPublished && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Publish workflow"
                        aria-label="Publish workflow"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePublishWorkflow(workflow.id);
                        }}
                        className="h-8 w-8 text-muted-foreground transition-colors hover:border hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      title={isPublished ? "Run workflow" : "Workflow must be published before execution"}
                      aria-label={isPublished ? "Run workflow" : "Workflow must be published before execution"}
                      disabled={!isPublished}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isPublished) {
                          router.push(`/workflows/${workflow.id}`);
                        }
                      }}
                      className="h-8 w-8 text-muted-foreground transition-colors hover:border hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-30"
                    >
                      <Play className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete workflow"
                      aria-label="Delete workflow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(workflow.id);
                      }}
                      className="h-8 w-8 text-muted-foreground transition-colors hover:border hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  )
}