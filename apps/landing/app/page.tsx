import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Rocket, FileText, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Image
            className="mx-auto mb-8 dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Your Landing Page
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            This page now uses the shared shadcn UI components from the workspace UI package, 
            demonstrating consistent design across all apps.
          </p>
          <Badge variant="secondary" className="mb-8">
            Using @workspace/ui components
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentation
              </CardTitle>
              <CardDescription>
                Learn how to build amazing applications with Next.js
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Read Docs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Deploy
              </CardTitle>
              <CardDescription>
                Deploy your application to production with one click
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Deploy Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Examples
              </CardTitle>
              <CardDescription>
                Explore templates and examples to get started quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">
                View Examples
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Built with shared TypeScript configuration and UI components
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Learn
            </Button>
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Examples
            </Button>
            <Button variant="ghost" size="sm">
              <Rocket className="h-4 w-4 mr-2" />
              Next.js
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
