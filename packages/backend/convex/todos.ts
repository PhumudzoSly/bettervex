// This module provides CRUD operations for Todo items, with authentication and authorization enforced via Convex sessions.
//
// Auth Handling Overview:
// - All functions require a valid session token, which is validated using internal.betterAuth.getSession.
// - The session provides userId and activeOrganizationId, used to scope data access and permissions.
// - Only the owner (user) or a member of the active organization can access or mutate todos.
// - Unauthorized access attempts throw errors.

import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { ConvexSession } from "./betterAuth";

// Fetch all todos for the current user (and optionally org)
// - Requires a valid session token.
// - Returns todos belonging to the user and, if present, the active organization.
// - Combines and deduplicates todos, sorted by creation date (newest first).
export const getTodos = query({
    args: { token: v.string() },
    handler: async (ctx, { token }) => {
        // Authenticate: Validate session token and retrieve session info
        const session: ConvexSession = await ctx.runQuery(
            internal.betterAuth.getSession,
            { sessionToken: token }
        );
        if (!session) throw new Error("Unauthorized"); // Reject if not authenticated
        const userId = session.userId as Id<"user">;
        const organizationId = session.activeOrganizationId as Id<"organization">;
        // Fetch user and org todos, newest first
        const userTodos = await ctx.db
            .query("todos")
            .withIndex("by_user", q => q.eq("userId", userId))
            .order("desc")
            .collect();
        const orgTodos = organizationId
            ? await ctx.db
                .query("todos")
                .withIndex("by_org", q => q.eq("organizationId", organizationId))
                .order("desc")
                .collect()
            : [];
        // Combine and sort by createdAt, deduplicating by _id
        const allTodos = [...userTodos, ...orgTodos];
        const uniqueTodosMap = new Map();
        for (const todo of allTodos) {
            uniqueTodosMap.set(todo._id, todo);
        }
        const uniqueTodos = Array.from(uniqueTodosMap.values()).sort((a, b) => b.createdAt - a.createdAt);
        return uniqueTodos;
    },
});

// Add a new todo
// - Requires a valid session token.
// - Associates the new todo with the user and their active organization (if any).
// - Only authenticated users can add todos.
export const addTodo = mutation({
    args: { token: v.string(), title: v.string() },
    handler: async (ctx, { token, title }) => {
        // Authenticate: Validate session token and retrieve session info
        const session: ConvexSession = await ctx.runQuery(
            internal.betterAuth.getSession,
            { sessionToken: token }
        );
        if (!session) throw new Error("Unauthorized"); // Reject if not authenticated
        const userId = session.userId as Id<"user">;
        const organizationId = session.activeOrganizationId as Id<"organization">;
        const now = Date.now();
        // Insert new todo, scoped to user and org
        const todoId = await ctx.db.insert("todos", {
            title,
            completed: false,
            createdAt: now,
            updatedAt: now,
            userId,
            organizationId,
        });
        return todoId;
    },
});

// Toggle a todo's completed state
// - Requires a valid session token.
// - Only the owner (user) or a member of the active organization can toggle the todo.
// - Unauthorized attempts are rejected.
export const toggleTodo = mutation({
    args: { token: v.string(), todoId: v.id("todos") },
    handler: async (ctx, { token, todoId }) => {
        // Authenticate: Validate session token and retrieve session info
        const session: ConvexSession = await ctx.runQuery(
            internal.betterAuth.getSession,
            { sessionToken: token }
        );
        if (!session) throw new Error("Unauthorized"); // Reject if not authenticated
        const todo = await ctx.db.get(todoId);
        if (!todo) throw new Error("Todo not found");
        // Authorization: Only allow if user owns or is in org
        const userId = session.userId as Id<"user">;
        const organizationId = session.activeOrganizationId as Id<"organization">;
        if (
            todo.userId !== userId &&
            (!organizationId || todo.organizationId !== organizationId)
        ) {
            throw new Error("Unauthorized");
        }
        // Toggle completed state
        await ctx.db.patch(todoId, {
            completed: !todo.completed,
            updatedAt: Date.now(),
        });
    },
});

// Delete a todo
// - Requires a valid session token.
// - Only the owner (user) or a member of the active organization can delete the todo.
// - Unauthorized attempts are rejected.
export const deleteTodo = mutation({
    args: { token: v.string(), todoId: v.id("todos") },
    handler: async (ctx, { token, todoId }) => {
        // Authenticate: Validate session token and retrieve session info
        const session: ConvexSession = await ctx.runQuery(
            internal.betterAuth.getSession,
            { sessionToken: token }
        );
        if (!session) throw new Error("Unauthorized"); // Reject if not authenticated
        const todo = await ctx.db.get(todoId);
        if (!todo) throw new Error("Todo not found");
        // Authorization: Only allow if user owns or is in org
        const userId = session.userId as Id<"user">;
        const organizationId = session.activeOrganizationId as Id<"organization">;
        if (
            todo.userId !== userId &&
            (!organizationId || todo.organizationId !== organizationId)
        ) {
            throw new Error("Unauthorized");
        }
        // Delete todo
        await ctx.db.delete(todoId);
    },
}); 