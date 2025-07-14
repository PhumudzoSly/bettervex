import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { user, member, organization } from "../schemas/user";
import {
    notifications,
    notificationPreferences,
    notificationTemplates,
} from "../schemas/notifications";

// Files table for file uploads
const files = defineTable({
    storageId: v.id("_storage"),
    name: v.string(),
    size: v.number(),
    type: v.string(),
    uploadedAt: v.number(),
    uploadedBy: v.string(),
})
    .index("by_uploaded_by", ["uploadedBy"])
    .index("by_uploaded_at", ["uploadedAt"]);

// Todos table for user tasks
const todos = defineTable({
    title: v.string(),
    completed: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    userId: v.id("user"),
    organizationId: v.optional(v.id("organization")),
})
    .index("by_user", ["userId", "createdAt"])
    .index("by_org", ["organizationId", "createdAt"]);

export default defineSchema({
    user,
    member,
    organization,
    files,
    notifications,
    notificationPreferences,
    notificationTemplates,
    todos,
});
