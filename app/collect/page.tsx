"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Droplets, Leaf, Recycle, TreePine } from "lucide-react";

export default function CollectPage() {
  return (
    <MainLayout requireAuth>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Collect & Track</h1>
        <p className="text-muted-foreground">
          Record your environmental activities and track your progress
        </p>

        <Tabs defaultValue="recycling" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="recycling">Recycling</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="planting">Planting</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recycling" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recycling Tracker</CardTitle>
                  <CardDescription>
                    Record your recycling activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Recycle className="h-5 w-5 text-green-600" />
                      <span>Monthly Goal: 30kg</span>
                    </div>
                    <span className="text-sm font-medium">24.3kg / 30kg</span>
                  </div>
                  <Progress value={81} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                      <span className="text-sm">Paper</span>
                      <span className="text-2xl font-bold">8.2kg</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                      <span className="text-sm">Plastic</span>
                      <span className="text-2xl font-bold">6.7kg</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                      <span className="text-sm">Glass</span>
                      <span className="text-2xl font-bold">5.1kg</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                      <span className="text-sm">Metal</span>
                      <span className="text-2xl font-bold">4.3kg</span>
                    </Button>
                  </div>
                  
                  <Button className="w-full mt-4">Add New Recycling</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recycling Impact</CardTitle>
                  <CardDescription>
                    Environmental impact of your recycling efforts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-green-100 p-3">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">CO₂ Reduction</p>
                      <p className="text-2xl font-bold">42.5 kg</p>
                      <p className="text-xs text-muted-foreground">Carbon dioxide not released into atmosphere</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <TreePine className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Trees Saved</p>
                      <p className="text-2xl font-bold">3.2</p>
                      <p className="text-xs text-muted-foreground">Trees preserved through paper recycling</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-amber-100 p-3">
                      <Droplets className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Water Saved</p>
                      <p className="text-2xl font-bold">1,240 L</p>
                      <p className="text-xs text-muted-foreground">Water conserved through recycling efforts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="energy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Energy Conservation</CardTitle>
                <CardDescription>
                  Track your energy saving activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <div className="flex flex-col items-center gap-2">
                    <Battery className="h-10 w-10 text-yellow-500" />
                    <p className="text-center text-muted-foreground">
                      Energy tracking features coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="water" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Water Conservation</CardTitle>
                <CardDescription>
                  Track your water saving activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <div className="flex flex-col items-center gap-2">
                    <Droplets className="h-10 w-10 text-blue-500" />
                    <p className="text-center text-muted-foreground">
                      Water tracking features coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="planting" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tree Planting</CardTitle>
                <CardDescription>
                  Track your tree planting activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <div className="flex flex-col items-center gap-2">
                    <TreePine className="h-10 w-10 text-green-500" />
                    <p className="text-center text-muted-foreground">
                      Tree planting tracking features coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transport" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sustainable Transport</CardTitle>
                <CardDescription>
                  Track your eco-friendly transportation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <div className="flex flex-col items-center gap-2">
                    <Leaf className="h-10 w-10 text-green-500" />
                    <p className="text-center text-muted-foreground">
                      Transport tracking features coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}