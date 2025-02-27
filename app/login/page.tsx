"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted">
      <Link href="/" className="absolute top-8 left-8 flex items-center">
        <Leaf className="h-6 w-6 text-green-600" />
        <span className="text-xl font-bold ml-2">EcoTrack</span>
      </Link>
      <div className="w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  );
}