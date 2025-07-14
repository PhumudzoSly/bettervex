import { betterAuth } from "better-auth";
import { magicLink, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { Polar } from "@polar-sh/sdk";
import { polar, usage, portal, checkout, webhooks } from "@polar-sh/better-auth";
import env from "@/lib/env";
import { convexAdapter } from "@better-auth-kit/convex";
import { ConvexHttpClient } from "convex/browser";
import { passkey } from "better-auth/plugins/passkey";

const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Polar API client instance for interacting with Polar services.
 * Uses the access token and sandbox server from environment variables.
 */
export const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

/**
 * Main authentication instance configured with Better Auth, Polar, Convex, and various plugins.
 * Handles user authentication, organization management, payment, and social providers.
 */
export const auth = betterAuth({
  database: convexAdapter(convexClient),
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: false,
      use: [
        checkout({
          authenticatedUsersOnly: true,
          products: [
            {
              productId: env.POLAR_PRICE_STARTER,
              slug: "starter",
            },
            {
              productId: env.POLAR_PRICE_BUSINESS,
              slug: "business",
            },
            {
              productId: env.POLAR_PRICE_ENTERPRISE,
              slug: "enterprise",
            },
          ],
          successUrl: "/dashboard",
        }),
        portal(),
        usage(),
        webhooks({
          secret: env.WEBHOOK_SECRET,
          onCustomerStateChanged: async (event) => {

            // TODO HANDLE WEBHOOKS FROM POLAR
            console.log(event);
          },
        }),
      ],

    }),
    organization({
      membershipLimit: 100,
    }),
    passkey(),
    magicLink({
      sendMagicLink: async ({ token, email, url }) => { },
    }),
    nextCookies(),
  ],
  account: {
    accountLinking: {
      trustedProviders: ["google", "github"],
    },
  },
  appName: "BetterVex",
  emailAndPassword: {
    async sendResetPassword({ user, token, url }) { },
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    },
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => { },
      },
    },
  },
});
