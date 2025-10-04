"use client"; // client component
export const dynamic = "force-dynamic";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import fetchApi from "@/components/useAxios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const data = await fetchApi("/user/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (data?.token) {
        document.cookie = `auth=${data.token}; path=/;`;
        toast.success("Logged in successfully!");
        window.location.href = "/dashboard"; 
      } else {
        toast.error("Invalid login response");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-6">
      <Card className="max-w-md w-full p-8 shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username" className="mb-1 block">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-1 block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
