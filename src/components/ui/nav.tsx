"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <nav className="border-b border-border bg-background text-foreground">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo / Name */}
        <h1 className="text-2xl font-bold tracking-wide">
          <Link href="/">JonDon</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          <Link href="/" className="hover:text-muted-foreground">
            Home
          </Link>
          <Link href="/about" className="hover:text-muted-foreground">
            About
          </Link>
          <Link href="/projects" className="hover:text-muted-foreground">
            Projects
          </Link>
          <Link href="/blogs" className="hover:text-muted-foreground">
            Blogs
          </Link>
          <Link href="/resume" className="hover:text-muted-foreground">
            Resume
          </Link>
          <Link href="/dashboard" className="hover:text-muted-foreground">
            Dashboard
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() =>
              resolvedTheme &&
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none rounded-md p-2 hover:bg-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-muted-foreground">
            Home
          </Link>
          <Link href="/about" className="block hover:text-muted-foreground">
            About
          </Link>
          <Link href="/projects" className="block hover:text-muted-foreground">
            Projects
          </Link>
          <Link href="/blogs" className="block hover:text-muted-foreground">
            Blogs
          </Link>
          <Link href="/resume" className="block hover:text-muted-foreground">
            Resume
          </Link>
          <Link href="/dashboard" className="block hover:text-muted-foreground">
            Dashboard
          </Link>

          {/* Theme Toggle (mobile) */}
          <button
            onClick={() =>
              resolvedTheme &&
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      )}
    </nav>
  );
}
