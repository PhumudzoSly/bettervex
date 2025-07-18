import "@workspace/ui/globals.css";
import type { Metadata } from "next";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider } from "@/context/theme-provider";
import { ConvexClientProvider } from "@/context/convex-provider";
import { AuthProvider } from "@/context/auth-provider";
import { Geist, Geist_Mono } from "next/font/google";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "BetterVex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <AuthProvider>
          <ThemeProvider
            storageKey="bettervex-theme"
            attribute="class"
            nonce="b1282rp=1ed2h3od12ndu2boqjdh1ibuo2i3hn"
            defaultTheme="dark"
          >
            <ConvexClientProvider>
              {children}
              <Toaster />
              <footer
                className="w-full flex justify-center items-center py-4 text-xs text-muted-foreground border-t border-border mt-8"
              >
                <span>
                  Template built by <a href="https://x.com/phumudzooooo" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Phumudzo</a> (@phumudzooooo)
                </span>
              </footer>
            </ConvexClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
