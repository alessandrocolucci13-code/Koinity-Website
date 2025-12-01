import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Film, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/chi-siamo", label: "Chi Siamo" },
    { href: "/community", label: "Community" },
    { href: "/vota", label: "Vota" },
    { href: "/cinema", label: "Per i Cinema" },
    { href: "/blog", label: "Blog" },
    { href: "/contatti", label: "Contatti" },
    { href: "/proponi", label: "Proponi un film" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <a className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">Koinity</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`text-sm font-medium transition-colors hover-elevate active-elevate-2 px-3 py-2 rounded-md ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`block px-3 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2 ${
                    location === item.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
