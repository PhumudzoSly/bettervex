// DashboardLayout is a server component that wraps all protected dashboard routes.
// It ensures the user is authenticated before rendering the layout. If not authenticated, it redirects to the sign-in page.
// The layout provides session context, an app bar, and a consistent container for dashboard content.
//
// Structure:
// - Checks authentication using headers and redirects if not logged in
// - Fetches session data for context
// - Renders Appbar and LayoutContainer with children inside
//
// Usage: Place all protected dashboard pages inside this layout.
import { getSession } from "@/actions/user";
import { SessionProvider } from "@/context/session-context";
import Appbar from "@/components/sidebar/app-bar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutContainer } from "@/components/layout-container";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();

  const session = await auth.api.getSession({ headers: headersList });

  if (!session) redirect("/auth/sign-in");

  const sessionData = await getSession();

  return (
    <SessionProvider sessionData={sessionData}>
      <Appbar>
        <LayoutContainer>
          <main className="scrollbar-hide">{children}</main>
        </LayoutContainer>
      </Appbar>
    </SessionProvider>
  );
}
