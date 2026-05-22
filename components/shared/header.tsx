'use client';
import { LogOut, Sprout, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Laundry
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="transition-colors hover:text-foreground text-muted-foreground"
          >
            Home
          </Link>
          <Link
            href="/book"
            className="transition-colors hover:text-foreground text-muted-foreground"
          >
            Book pickup
          </Link>
          <Link
            href="/track"
            className="transition-colors hover:text-foreground text-muted-foreground"
          >
            Track
          </Link>
          <Link
            href="/bookings"
            className="transition-colors hover:text-foreground text-muted-foreground"
          >
            My bookings
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <>
            <span className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <UserIcon className="h-4 w-4" />
              janedoe@gmail.com
            </span>
            <Button variant="ghost" size="default">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
            <ThemeToggle />
          </>

          {/* <>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </> */}
        </div>
      </div>
    </header>
  );
}
