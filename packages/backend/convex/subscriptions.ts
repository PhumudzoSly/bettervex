import { v } from "convex/values";
import { query } from "./_generated/server";

export const getByOrganization = query({
    args: { organizationId: v.id("organization") },
    handler: async (ctx, { organizationId }) => {
        const sub = await ctx.db
            .query("subscriptions")
            .withIndex("by_organization", q => q.eq("organizationId", organizationId))
            .first();
        return sub ? sub.data : null;
    },
}); 