"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/Button";
import { SanitySiteConfig } from "@/lib/types";

export function Navbar({ config }: { config: SanitySiteConfig }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "border-border bg-background/80 backdrop-blur-md shadow-sm"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-blue">
              RM
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary relative py-1",
                        isActive ? "text-primary" : "text-textMuted"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-2 border-l border-border pl-6">
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild className="w-10 h-10 px-0 relative group">
                {config.githubUrl && (
                  <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="w-5 h-5 text-textMuted group-hover:text-textPrimary transition-colors" />
                  </a>
                )}
              </Button>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 px-0"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5 text-textPrimary" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-background border-b border-border flex flex-col"
          >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between border-b border-border">
              <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-blue" onClick={() => setMobileMenuOpen(false)}>
                RM
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 px-0"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 text-textPrimary" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto py-8">
              <ul className="flex flex-col container mx-auto px-4 gap-4">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-4 text-2xl font-bold transition-colors",
                          isActive ? "text-primary" : "text-textMuted"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border flex gap-4">
                {config.githubUrl && (
                  <a href={config.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface rounded-full text-textMuted hover:text-textPrimary hover:bg-surface-2 transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
