"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Award, Star, Leaf, TreePine, Recycle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RewardsPage() {
  const { toast } = useToast();

  const handleClaimReward = () => {
    toast({
      title: "Reward Claimed",
      description: "Your reward has been added to your account!",
    });
  };

  return (
    <MainLayout requireAuth>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Rewards & Achievements</h1>
        <p className="text-muted-foreground">
          Earn rewards for your environmental contributions
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your EcoPoints</CardTitle>
                <Badge variant="outline" className="px-3">Level 3</Badge>
              </div>
              <CardDescription>
                Points earned through environmental activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">1,250</span>
                <span className="text-sm text-muted-foreground">Next level: 2,000</span>
              </div>
              <Progress value={62.5} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex flex-col items-center gap-1 p-3 border rounded-lg">
                  <Recycle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Recycling</span>
                  <span className="text-lg font-bold">450</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 border rounded-lg">
                  <TreePine className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Planting</span>
                  <span className="text-lg font-bold">350</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 border rounded-lg">
                  <Leaf className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Conservation</span>
                  <span className="text-lg font-bold">300</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 border rounded-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">Bonus</span>
                  <span className="text-lg font-bold">150</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>
                Badges earned for your environmental efforts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Recycling Champion</p>
                  <p className="text-sm text-muted-foreground">Recycled over 20kg of materials</p>
                </div>
                <Badge>+100 pts</Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <TreePine className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Tree Planter</p>
                  <p className="text-sm text-muted-foreground">Planted your first tree</p>
                </div>
                <Badge>+150 pts</Badge>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Eco Enthusiast</p>
                  <p className="text-sm text-muted-foreground">Completed 5 environmental activities</p>
                </div>
                <Badge>+75 pts</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mt-6">Available Rewards</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Eco-Friendly Tote Bag</CardTitle>
              <CardDescription>
                Sustainable cotton tote bag
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <Gift className="h-16 w-16 text-green-500" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="px-3">500 points</Badge>
                <span className="text-sm text-muted-foreground">In stock</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleClaimReward}>Claim Reward</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reusable Water Bottle</CardTitle>
              <CardDescription>
                Stainless steel water bottle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <Gift className="h-16 w-16 text-blue-500" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="px-3">750 points</Badge>
                <span className="text-sm text-muted-foreground">In stock</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleClaimReward}>Claim Reward</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tree Planting Kit</CardTitle>
              <CardDescription>
                Kit with seeds and tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <Gift className="h-16 w-16 text-amber-500" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="px-3">1000 points</Badge>
                <span className="text-sm text-muted-foreground">Limited stock</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleClaimReward}>Claim Reward</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}