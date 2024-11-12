"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { CircleUserRound, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Field Data Collection
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <CircleUserRound className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user.name}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/api/auth/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/api/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}