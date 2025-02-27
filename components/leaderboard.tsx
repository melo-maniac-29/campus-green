"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

export function LeaderboardSection() {
  const topUsers = useQuery(api.users.getTopUsers, { limit: 5 });

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Environmental Leaders</h2>
      
      {topUsers === undefined ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="ml-auto h-8 w-16" />
            </div>
          ))}
        </div>
      ) : topUsers.length === 0 ? (
        <p className="text-center text-muted-foreground">No users yet. Be the first to join!</p>
      ) : (
        <div className="space-y-4">
          {topUsers.map((entry, index) => (
            <div 
              key={entry._id} 
              className="flex items-center p-3 border rounded-md bg-green-50"
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold bg-green-100 rounded-full">
                {index + 1}
              </div>
              <div className="ml-4">
                <p className="font-medium">{entry.user?.name || "Unknown User"}</p>
                <p className="text-sm text-muted-foreground">Joined {new Date(entry.user?.joinedAt).toLocaleDateString()}</p>
              </div>
              <div className="ml-auto font-semibold text-green-600">
                {entry.totalPoints} pts
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}