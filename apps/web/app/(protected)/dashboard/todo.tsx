"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api, Id } from "@workspace/backend";
import { useSession } from "@/context/session-context";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { Tooltip, TooltipTrigger, TooltipContent } from "@workspace/ui/components/tooltip";
import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert";
import LoadingSpinner from "@workspace/ui/components/loading-spinner";
import { Trash2, PlusCircle, Loader2, GripVertical, XCircle } from "lucide-react";
import { useData } from "@/hooks/use-data";

// Helper for time ago formatting
function timeAgo(date: string | number | Date) {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const Todos = () => {
  const { token } = useSession();
  const [newTodo, setNewTodo] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: todos, isPending, isError } = useData(api.todos.getTodos, token ? { token } : "skip");
  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const completedCount = todos?.filter((t: any) => t.completed).length || 0;
  const totalCount = todos?.length || 0;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setAdding(true);
    setError(null);
    try {
      await addTodo({ token, title: newTodo.trim() });
      setNewTodo("");
    } catch (err: any) {
      setError("Failed to add todo");
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTodo({ token, todoId: id as Id<"todos"> });
    } catch {
      setError("Failed to update todo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({ token, todoId: id as Id<"todos"> });
    } catch {
      setError("Failed to delete todo");
    }
  };

  const handleClearInput = () => setNewTodo("");

  return (
    <div className="max-w-xl mx-auto py-10 px-2">
      {/* Header & Stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">My Todos</h1>
          <Badge variant="secondary" className="ml-1">{completedCount}/{totalCount}</Badge>
        </div>
        {totalCount > 0 && (
          <div className="flex items-center gap-2 min-w-[120px]">
            <Progress value={progress} className="h-2 w-24 bg-muted" />
            <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6 relative">
        <Input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 pr-10"
          disabled={adding}
          aria-label="Add a new todo"
        />
        {newTodo && (
          <button
            type="button"
            onClick={handleClearInput}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive focus:outline-none"
            tabIndex={-1}
            aria-label="Clear input"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="submit" disabled={adding || !newTodo.trim()} size="icon" aria-label="Add todo">
              {adding ? <Loader2 className="animate-spin w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add (Enter)</TooltipContent>
        </Tooltip>
      </form>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <LoadingSpinner className="w-6 h-6 mr-2" /> Loading todos...
        </div>
      )}

      {/* Empty State */}
      {todos && todos.length === 0 && !isPending && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
          <PlusCircle className="w-8 h-8 mb-2 opacity-40" />
          <span className="text-base font-medium">No todos yet. Add your first one!</span>
        </div>
      )}

      {/* Todo List */}
      {todos && todos.length > 0 && !isPending && !isError && (
        <ul className="space-y-2">
          {todos.map((todo: any) => (
            <li
              key={todo._id}
              className="flex items-center gap-3 rounded-lg px-3 py-2 bg-background border border-border hover:shadow-sm transition group"
            >
              <span className="cursor-grab text-muted-foreground hover:text-primary transition">
                <GripVertical className="w-4 h-4" />
              </span>
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleToggle(todo._id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              />
              <span
                className={`flex-1 text-base truncate ${todo.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {todo.title}
                {todo.createdAt && (
                  <span className="ml-2 text-xs text-muted-foreground font-normal">· {timeAgo(todo.createdAt)}</span>
                )}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(todo._id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Delete todo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;