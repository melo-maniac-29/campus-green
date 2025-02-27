"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BarChart3, 
  ClipboardList, 
  Gift, 
  Leaf, 
  LogOut, 
  Menu, 
  Recycle, 
  Trophy, 
  User 
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username") || "";
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    window.location.href = "/";
  };

  const routes = [
    {
      label: "Dashboard",
      icon: Leaf,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Report",
      icon: ClipboardList,
      href: "/report",
      active: pathname === "/report",
    },
    {
      label: "Collect",
      icon: Recycle,
      href: "/collect",
      active: pathname === "/collect",
    },
    {
      label: "Rewards",
      icon: Gift,
      href: "/rewards",
      active: pathname === "/rewards",
    },
    {
      label: "Leaderboard",
      icon: Trophy,
      href: "/leaderboard",
      active: pathname === "/leaderboard",
    },
    {
      label: "Statistics",
      icon: BarChart3,
      href: "/statistics",
      active: pathname === "/statistics",
    },
  ];

  if (!isMounted) {
    return null;
  }

  const sidebarContent = (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="px-3 py-4">
        <Link href="/" className="flex items-center pl-3 mb-6">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold ml-2">EcoTrack</span>
        </Link>
        <div className="space-y-1">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 mb-6 px-3 py-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{username}</span>
              </div>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                    route.active ? "bg-accent" : "transparent"
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              ))}
              <Button 
                variant="ghost" 
                className="w-full justify-start px-3 py-2 mt-6"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </>
          ) : (
            <div className="px-3 py-2">
              <p className="text-sm text-muted-foreground mb-4">
                Please log in to access all features
              </p>
              <Link href="/login">
                <Button className="w-full" onClick={() => setOpen(false)}>
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-background border-r">
        <ScrollArea className="flex-1">
          {sidebarContent}
        </ScrollArea>
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <ScrollArea className="h-full">
            {sidebarContent}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}