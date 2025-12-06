import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Send, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import koinityLogo from "@assets/Logo_Koinity-removebg-preview_1764564269821.png";

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
    <footer className="footer">
      <div className="footer-content">
        
        {/* Grid Principale */}
        <div className="footer-grid">
          
          {/* Colonna 1: Brand */}
          <div className="footer-column footer-brand">
            <Link href="/">
              <a className="footer-logo" data-testid="link-footer-logo">
                <img src={koinityLogo} alt="Koinity" className="h-10 w-auto" />
              </a>
            </Link>
            <p className="footer-tagline">
              La piattaforma di cinema on-demand dove la community sceglie cosa vedere in sala.
            </p>
            <div className="footer-social">
              <a href="https://t.me/+9G_y3W8Lt_g4ZTg0" className="social-link" target="_blank" rel="noopener noreferrer" data-testid="button-social-telegram" aria-label="Telegram">
                <Send className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/koinity/?viewAsMember=true" className="social-link" target="_blank" rel="noopener noreferrer" data-testid="button-social-linkedin" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/koinity/" className="social-link" target="_blank" rel="noopener noreferrer" data-testid="button-social-instagram" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Colonna 2: Esplora */}
          <div className="footer-column">
            <h3 className="footer-title">Esplora</h3>
            <nav className="footer-links">
              <Link href="/vota">
                <a className="footer-link" data-testid="link-footer-vota">Vota & Partecipa</a>
              </Link>
              <Link href="/proponi">
                <a className="footer-link" data-testid="link-footer-proponi">Proponi un Film</a>
              </Link>
              <Link href="/community">
                <a className="footer-link" data-testid="link-footer-community">Community</a>
              </Link>
              <Link href="/blog">
                <a className="footer-link" data-testid="link-footer-blog">Blog</a>
              </Link>
            </nav>
          </div>
          
          {/* Colonna 3: Azienda */}
          <div className="footer-column">
            <h3 className="footer-title">Azienda</h3>
            <nav className="footer-links">
              <Link href="/chi-siamo">
                <a className="footer-link" data-testid="link-footer-chi-siamo">Chi Siamo</a>
              </Link>
              <Link href="/cinema">
                <a className="footer-link" data-testid="link-footer-cinema">Per i Cinema</a>
              </Link>
              <Link href="/contatti">
                <a className="footer-link" data-testid="link-footer-contatti">Contatti</a>
              </Link>
            </nav>
          </div>
          
          {/* Colonna 4: Newsletter */}
          <div className="footer-column newsletter-column">
            <h3 className="footer-title">Newsletter</h3>
            <p className="newsletter-description">
              Ricevi aggiornamenti su nuove proiezioni e eventi.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-newsletter-email"
              />
              <button type="submit" className="newsletter-button" data-testid="button-newsletter-submit">
                Iscriviti
              </button>
            </form>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Koinity. Tutti i diritti riservati.
          </p>
          <nav className="footer-legal">
            <Link href="/privacy">
              <a className="footer-legal-link" data-testid="link-footer-privacy">Privacy</a>
            </Link>
            <Link href="/termini">
              <a className="footer-legal-link" data-testid="link-footer-termini">Termini</a>
            </Link>
          </nav>
        </div>
        
      </div>
    </footer>
  );
}
