"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

export default function LeaderboardPage() {
  const weeklyLeaders = [
    { rank: 1, name: "Emma Johnson", points: 450, avatar: "EJ" },
    { rank: 2, name: "Michael Chen", points: 385, avatar: "MC" },
    { rank: 3, name: "Sarah Williams", points: 320, avatar: "SW" },
    { rank: 4, name: "David Kim", points: 290, avatar: "DK" },
    { rank: 5, name: "Olivia Martinez", points: 275, avatar: "OM" },
    { rank: 6, name: "James Wilson", points: 260, avatar: "JW" },
    { rank: 7, name: "Sophia Lee", points: 245, avatar: "SL" },
    { rank: 8, name: "Noah Garcia", points: 230, avatar: "NG" },
    { rank: 9, name: "Ava Brown", points: 215, avatar: "AB" },
    { rank: 10, name: "Ethan Davis", points: 200, avatar: "ED" },
  ];

  const monthlyLeaders = [
    { rank: 1, name: "Michael Chen", points: 1250, avatar: "MC" },
    { rank: 2, name: "Emma Johnson", points: 1180, avatar: "EJ" },
    { rank: 3, name: "David Kim", points: 1050, avatar: "DK" },
    { rank: 4, name: "Sarah Williams", points: 980, avatar: "SW" },
    { rank: 5, name: "James Wilson", points: 920, avatar: "JW" },
    { rank: 6, name: "Olivia Martinez", points: 875, avatar: "OM" },
    { rank: 7, name: "Noah Garcia", points: 830, avatar: "NG" },
    { rank: 8, name: "Sophia Lee", points: 790, avatar: "SL" },
    { rank: 9, name: "Ethan Davis", points: 750, avatar: "ED" },
    { rank: 10, name: "Ava Brown", points: 720, avatar: "AB" },
  ];

  const allTimeLeaders = [
    { rank: 1, name: "Emma Johnson", points: 5430, avatar: "EJ" },
    { rank: 2, name: "Michael Chen", points: 4875, avatar: "MC" },
    { rank: 3, name: "David Kim", points: 4320, avatar: "DK" },
    { rank: 4, name: "Sarah Williams", points: 3950, avatar: "SW" },
    { rank: 5, name: "James Wilson", points: 3680, avatar: "JW" },
    { rank: 6, name: "Olivia Martinez", points: 3420, avatar: "OM" },
    { rank: 7, name: "Sophia Lee", points: 3150, avatar: "SL" },
    { rank: 8, name: "Noah Garcia", points: 2980, avatar: "NG" },
    { rank: 9, name: "Ava Brown", points: 2750, avatar: "AB" },
    { rank: 10, name: "Ethan Davis", points: 2540, avatar: "ED" },
  ];

  const renderLeaderIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <span className="font-bold">{rank}</span>;
  };

  const renderLeaderboard = (leaders: any[]) => (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4 py-2 font-medium text-muted-foreground">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-7">Name</div>
        <div className="col-span-4 text-right">Points</div>
      </div>
      
      {leaders.map((leader) => (
        <div 
          key={leader.name} 
          className={`grid grid-cols-12 gap-4 items-center p-3 rounded-lg ${
            leader.rank <= 3 ? "bg-muted" : ""
          }`}
        >
          <div className="col-span-1 flex justify-center">
            {renderLeaderIcon(leader.rank)}
          </div>
          <div className="col-span-7 flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className={leader.rank <= 3 ? "bg-primary text-primary-foreground" : ""}>
                {leader.avatar}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{leader.name}</span>
          </div>
          <div className="col-span-4 text-right">
            <Badge variant={leader.rank <= 3 ? "default" : "outline"} className="px-2 py-1">
              {leader.points} pts
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <MainLayout requireAuth>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">
          See who's making the biggest environmental impact
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Top Environmental Contributors</CardTitle>
            <CardDescription>
              Users with the highest EcoPoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="all-time">All Time</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weekly">
                {renderLeaderboard(weeklyLeaders)}
              </TabsContent>
              
              <TabsContent value="monthly">
                {renderLeaderboard(monthlyLeaders)}
              </TabsContent>
              
              <TabsContent value="all-time">
                {renderLeaderboard(allTimeLeaders)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Most Trees Planted</CardTitle>
              <CardDescription>
                Top contributors in tree planting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Emma Johnson</span>
                  </div>
                  <Badge>32 trees</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Medal className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">David Kim</span>
                  </div>
                  <Badge variant="outline">28 trees</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-amber-700" />
                    <span className="font-medium">Sarah Williams</span>
                  </div>
                  <Badge variant="outline">25 trees</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Most Recycled</CardTitle>
              <CardDescription>
                Top contributors in recycling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Michael Chen</span>
                  </div>
                  <Badge>145 kg</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Medal className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">Olivia Martinez</span>
                  </div>
                  <Badge variant="outline">132 kg</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-amber-700" />
                    <span className="font-medium">James Wilson</span>
                  </div>
                  <Badge variant="outline">118 kg</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Energy Saved</CardTitle>
              <CardDescription>
                Top contributors in energy conservation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Sarah Williams</span>
                  </div>
                  <Badge>320 kWh</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Medal className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">Noah Garcia</span>
                  </div>
                  <Badge variant="outline">285 kWh</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-amber-700" />
                    <span className="font-medium">Ava Brown</span>
                  </div>
                  <Badge variant="outline">260 kWh</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}