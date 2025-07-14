"use server";
import { headers } from "next/headers";
import { auth, polarClient } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Creates a new organization for the authenticated user.
 * @param {Object} params - The parameters for creating the organization.
 * @param {string} params.name - The name of the organization to create.
 * @throws Will throw an error if the user is not authenticated or organization creation fails.
 */
export async function createOrg({ name }: { name: string }) {
    const headersList = await headers();

    const session = await auth.api.getSession({ headers: headersList });
    if (!session?.session || !session.user)
        throw new Error("You are not authenticated");

    const org = await auth.api.createOrganization({
        body: {
            name,
            slug: `${name.toLowerCase().replace(/\s/g, "-")}-${session.session.userId}`,
        },
        headers: headersList,
    });

    if (!org) throw new Error("Failed to create organization");

    auth.api.setActiveOrganization({
        body: {
            organizationId: org?.id,
        },
        headers: headersList,
    });
}

/**
 * Retrieves the current session, user, and active organization information.
 * Redirects to sign-in or switch-org if session or organization is missing.
 * @returns {Promise<Object>} The session, user, and organization details.
 */
export async function getSession() {
    const headersList = await headers();

    const [data, member, activeOrg] = await Promise.all([
        auth.api.getSession({ headers: headersList }),
        auth.api.getActiveMember({ headers: headersList }),
        (async () => {
            const sessionData = await auth.api.getSession({ headers: headersList });
            if (!sessionData?.session.activeOrganizationId) return null;
            return auth.api.getFullOrganization({
                params: {
                    id: sessionData.session.activeOrganizationId,
                },
                headers: headersList,
            });
        })(),
    ]);

    if (!data?.session) {
        redirect("/auth/sign-in");
    }

    const { session, user } = data;

    if (!session.activeOrganizationId || !activeOrg || !member) {
        redirect("/switch-org");
    }

    return {
        userId: user.id,
        org: session.activeOrganizationId,
        email: user.email,
        name: user.name,
        image: user.image,
        role: member.role,
        orgName: activeOrg.name,
        memberId: member.id,
        token: session.token,
    };
}

/**
 * Lists all organizations the current user belongs to.
 * @returns {Promise<Array>} An array of organizations.
 */
export async function getMyOrgs() {
    const myOrgs = await auth.api.listOrganizations({
        headers: await headers(),
    });

    return myOrgs;
}

/**
 * Switches the active organization for the current user.
 * @param {string} id - The ID of the organization to switch to.
 * @returns {Promise<{ success: boolean }>} Success status.
 */
export async function switchOrg(id: string) {
    await getSession();
    const headersList = await headers();

    await Promise.all([
        auth.api.setActiveOrganization({
            body: {
                organizationId: id,
            },
            headers: headersList,
        }),
        auth.api.setActiveOrganization({
            body: {
                organizationId: id,
            },
            headers: headersList,
        }),
    ]);

    return { success: true };
}

/**
 * Retrieves the currently active organization for the user.
 * @returns {Promise<Object>} The current organization data.
 */
export async function getCurrentOrg() {
    const data = await auth.api.getFullOrganization({
        headers: await headers(),
    });
    return data;
}

/**
 * Retrieves the members of the current organization.
 * @returns {Promise<Array>} An array of organization members.
 */
export async function getOrgMembers() {
    const { org } = await getSession();

    const data = await auth.api.getFullOrganization({
        params: {
            id: org,
        },
        headers: await headers(),
    });

    return data?.members;
}

/**
 * Updates the name of an organization.
 * @param {string} organizationId - The ID of the organization to update.
 * @param {string} name - The new name for the organization.
 * @returns {Promise<{ success: boolean } | { error: string }>} Success or error status.
 */
export async function updateOrganizationName(
    organizationId: string,
    name: string
) {
    try {
        await auth.api.updateOrganization({
            params: {
                id: organizationId,
            },
            body: {
                data: {
                    name,
                },
            },
            headers: await headers(),
        });

        return { success: true };
    } catch (error) {
        return { error: "Failed to update organization name" };
    }
}

/**
 * Deletes the current user's account and revokes all active subscriptions.
 * @returns {Promise<void>} Resolves when the account is deleted.
 */
export async function deleteAccount() {
    const { userId } = await getSession();
    const sub = await polarClient.customers.getStateExternal({
        externalId: userId,
    });

    if (sub && sub.activeSubscriptions.length !== 0) {
        const subscriptions = sub.activeSubscriptions;
        subscriptions.forEach(async (activeSub) => {
            await polarClient.subscriptions.revoke({
                id: activeSub.id,
            });
        });
    }


    // THEN HANDLE BETTER AUTH USER DELETION
}

