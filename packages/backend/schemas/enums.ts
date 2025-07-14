import { v } from "convex/values";


export const notificationType = v.union(
  v.literal("ISSUE_ASSIGNED"),
  v.literal("ISSUE_UPDATED"),
  v.literal("ISSUE_COMPLETED"),
  v.literal("PROJECT_INVITED"),
  v.literal("PROJECT_UPDATED"),
  v.literal("FEATURE_ADDED"),
  v.literal("COMMENT_ADDED"),
  v.literal("DEPENDENCY_BLOCKED"),
  v.literal("DUE_DATE_APPROACHING"),
  v.literal("ROADMAP_UPDATED"),
  v.literal("LAUNCH_REMINDER"),
  v.literal("ORG_ANNOUNCEMENT"),
  v.literal("SYSTEM_UPDATE")
);

export const notificationPriority = v.union(
  v.literal("LOW"),
  v.literal("MEDIUM"),
  v.literal("HIGH"),
  v.literal("URGENT")
);

export const notificationScope = v.union(
  v.literal("USER"),
  v.literal("ORGANIZATION"),
  v.literal("PROJECT")
);
