import { polarClient } from "@/lib/auth";
import { getSession } from "@/actions/user";
import { generateCustomerURL } from "@/actions/subscription";
import { StoreSwitch } from "./components/store-switch";
import { SubscriptionAlert } from "./components/subscription-alert";
import { PricingPlans } from "./components/pricing-plans";

export default async function Page() {
  const { org, email } = await getSession();
  const [{ result }, portalUrl] = await Promise.all([
    polarClient.products.list({ isArchived: false }),
    generateCustomerURL(),
  ]);

  const sortedProducts = [...result.items].sort((a, b) => {
    // @ts-ignore
    const priceA = a.prices[0]?.priceAmount || 0;
    // @ts-ignore
    const priceB = b.prices[0]?.priceAmount || 0;
    return priceA - priceB;
  });

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container max-w-6xl px-4">
        <div className="space-y-4 flex flex-col items-center justify-center mb-16">
          <StoreSwitch />
          {portalUrl && <SubscriptionAlert portalUrl={portalUrl} />}
        </div>

        <div className="space-y-4 mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Join Tiqt</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you
          </p>
        </div>

        <PricingPlans products={sortedProducts} org={org} email={email} />
      </div>

      <div className="container px-4">
        <div className="space-y-4 mb-16 text-center">
          <h1 className="text-xl font-bold tracking-tight">
            Need full pricing?
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit{" "}
            <a
              className="underline text-blue-500"
              target="_blank"
              href="https://tiqt.app/pricing"
            >
              our pricing page
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
