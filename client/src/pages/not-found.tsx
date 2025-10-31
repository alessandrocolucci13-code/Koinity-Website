import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Film, Home } from "lucide-react";
import { SEO } from "@/components/seo";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Pagina Non Trovata"
        description="La pagina che stai cercando non esiste. Torna alla home page di Koinity o esplora le nostre proposte di film."
      />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Film className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-serif text-6xl font-bold mb-4" data-testid="text-404">404</h1>
          <h2 className="font-serif text-2xl font-bold mb-4">
            Pellicola non trovata
          </h2>
        <p className="text-muted-foreground mb-8">
          La pagina che stai cercando non esiste o è stata spostata. Forse il
          film che cercavi non è ancora stato proposto?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="gap-2" data-testid="button-home">
              <Home className="h-4 w-4" />
              Torna alla home
            </Button>
          </Link>
          <Link href="/vota">
            <Button variant="outline" data-testid="button-vota">
              Esplora le proposte
            </Button>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
