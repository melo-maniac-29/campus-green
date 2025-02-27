import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import { Leaf, TreePine, Droplets, Wind } from "lucide-react";



export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Preserving Our Planet Together
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join our community of environmental champions working to create a sustainable future for generations to come.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">Get Started</Button>
                </Link>
                <Link href="#learn-more">
                  <Button size="lg" variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="learn-more" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Environmental Focus Areas
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  we are committed to making a positive impact across multiple environmental domains.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-green-100 p-3">
                  <TreePine className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Forest Conservation</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Protecting and restoring forests to combat climate change and preserve biodiversity.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-blue-100 p-3">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Water Protection</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Safeguarding our water resources and ensuring clean water access for all communities.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-amber-100 p-3">
                  <Wind className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold">Clean Energy</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Transitioning to renewable energy sources to reduce carbon emissions and pollution.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-purple-100 p-3">
                  <Leaf className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Sustainable Living</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Promoting eco-friendly practices in daily life to minimize our environmental footprint.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Mission Today
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create an account to track your environmental contributions, earn rewards, and compete on our leaderboard.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">Sign Up Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-6 bg-background border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-lg font-bold">EcoTrack</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 EcoTrack. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
}