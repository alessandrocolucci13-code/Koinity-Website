import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Facebook, Twitter, Instagram } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Email non valida",
        description: "Per favore inserisci un indirizzo email valido.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Iscrizione completata!",
      description: "Riceverai presto le nostre novità.",
    });
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/">
              <a className="flex items-center gap-2 mb-4">
                <Film className="h-6 w-6 text-primary" />
                <span className="font-serif text-xl font-bold">Koinity</span>
              </a>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              La piattaforma di cinema on-demand dove la community sceglie cosa
              vedere in sala.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-social-facebook"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-social-twitter"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-social-instagram"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Esplora</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vota">
                  <a className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 -ml-2 rounded-md inline-block" data-testid="link-footer-vota">
                    Vota & Partecipa
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/proponi">
                  <a className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 -ml-2 rounded-md inline-block" data-testid="link-footer-proponi">
                    Proponi un Film
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <a className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 -ml-2 rounded-md inline-block" data-testid="link-footer-community">
                    Community
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 -ml-2 rounded-md inline-block" data-testid="link-footer-blog">
                    Blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Azienda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/chi-siamo">
                  <a className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 -ml-2 rounded-md inline-block" data-testid="link-footer-chi-siamo">
                    Chi Siamo
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cinema">
                  <a className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 -ml-2 rounded-md inline-block" data-testid="link-footer-cinema">
                    Per i Cinema
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contatti">
                  <a className="text-muted-foreground hover:text-foreground transition-colors hover-elevate px-2 py-1 -ml-2 rounded-md inline-block" data-testid="link-footer-contatti">
                    Contatti
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ricevi aggiornamenti su nuove proiezioni e eventi.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-newsletter-email"
              />
              <Button type="submit" className="w-full" data-testid="button-newsletter-submit">
                Iscriviti
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Koinity. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <Link href="/privacy">
              <a className="hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md" data-testid="link-footer-privacy">
                Privacy
              </a>
            </Link>
            <Link href="/termini">
              <a className="hover:text-foreground transition-colors hover-elevate px-2 py-1 rounded-md" data-testid="link-footer-termini">
                Termini
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
