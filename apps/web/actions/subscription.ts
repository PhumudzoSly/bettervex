"use server";

import { getSession } from "@/actions/user";
import { auth, polarClient } from "@/lib/auth";
import { fetchQuery } from "convex/nextjs";
import { api, Id } from "@workspace/backend";
import { redirect } from "next/navigation";
import { headers } from "next/headers";



function toOrgId(id: string): Id<"organization"> {
  // Convex IDs are strings, but may need conversion if format differs
  return id as Id<"organization">;
}

export async function getSubscription() {
  const { org } = await getSession();

  // Development-only: Check if subscription check should be bypassed
  if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_DEV_BYPASS_SUBSCRIPTION === "true"
  ) {
    return {
      id: "dev-subscription",
      status: "active",
      productId: process.env.POLAR_ENTERPRICE_PRICING!,
      priceId: "dev-price",
      customerId: "dev-customer",
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      endsAt: null,
      canceledAt: null,
      trialEndsAt: null,
    };
  }

  // Convex: fetch subscription by org
  const sub = await fetchQuery(api.subscriptions.getByOrganization, {
    organizationId: toOrgId(org),
  });

  if (!sub || sub.status !== "active") redirect("/checkout");

  return sub;
}


/**
 * Gets subscription information for a specific organization without requiring a session
 * @param organizationId The ID of the organization to get subscription for
 * @returns The subscription object or null if not found/active
 */
export async function getPublicSubscription(organizationId: string) {
  // Development-only: Check if subscription check should be bypassed
  if (process.env.NEXT_PUBLIC_DEV_BYPASS_SUBSCRIPTION === "true") {
    return {
      id: "dev-subscription",
      status: "active",
      productId: process.env.POLAR_ENTERPRICE_PRICING!,
      priceId: "dev-price",
      customerId: "dev-customer",
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      endsAt: null,
      canceledAt: null,
      trialEndsAt: null,
    };
  }

  // Convex: fetch subscription by org
  const sub = await fetchQuery(api.subscriptions.getByOrganization, {
    organizationId: toOrgId(organizationId),
  });

  if (!sub || sub.status !== "active") return null;

  return sub;
}


export async function generateCustomerURL() {
  // Get the current organization ID from the session

  const headersList = await headers();
  const sessionData = await auth.api.getSession({ headers: headersList });

  if (!sessionData?.session) {
    return null;
  }

  const { activeOrganizationId: org } = sessionData.session;

  if (!org) return null;

  // Look up the subscription record for this organization
  const subscription = await fetchQuery(api.subscriptions.getByOrganization, {
    organizationId: toOrgId(org),
  });

  if (!subscription) return null;

  // Fetch the full subscription details from Polar
  const polarSubscription = await polarClient.subscriptions.get({
    id: subscription.subscription_id!, // Assert non-null since we found a subscription
  });

  if (!polarSubscription) return null;

  // Create a new customer portal session and get the access URL
  const portalSession = await polarClient.customerSessions.create({
    customerId: polarSubscription.customerId,
  });

  const url = portalSession.customerPortalUrl;

  return url;
}

// Server action: subscribeToProduct
export async function subscribeToProduct({
  products,
  email,
  org,
  successUrl,
}: {
  products: string[];
  email: string;
  org: string;
  successUrl: string;
}) {
  "use server";
  let result;
  try {
    result = await polarClient.checkouts.create({
      products,
      customerEmail: email,
      metadata: { org },
      successUrl,
    });
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    throw new Error("Failed to create checkout session.");
  }
  redirect(result.url);
}
