import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/stepper";
import { ProposalCard } from "@/components/proposal-card";
import { SkeletonProposalCard } from "@/components/skeleton-proposal-card";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Zap, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/seo";
import type { Proposal } from "@shared/schema";
import cinemaSeatsImage from "@assets/image_1764560979384.png";

export default function Home() {
  const { data: proposals, isLoading } = useQuery<Proposal[]>({
    queryKey: ["/api/proposals"],
  });

  const featuredProposals = proposals?.slice(0, 6) || [];

  return (
    <>
      <SEO
        title="Il cinema lo scegli tu | Koinity"
        description="Koinity è la piattaforma di cinema on-demand dove la community vota cosa vedere in sala—anche titoli fuori distribuzione. Proponi, vota e porta i film che ami al cinema."
      />
      <div className="flex flex-col">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background" style={{backgroundImage: `url(${cinemaSeatsImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/90 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" data-testid="text-hero-title">
              Il cinema lo scegli tu.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-subtitle">
              Koinity è la piattaforma di cinema on-demand dove la community vota
              cosa vedere in sala—anche titoli fuori distribuzione.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/vota">
                <Button size="lg" className="text-base px-8" data-testid="button-hero-community">
                  Unisciti alla community
                </Button>
              </Link>
              <Link href="/proponi">
                <Button size="lg" variant="outline" className="text-base px-8 !border-yellow-border !border-2" data-testid="button-hero-proponi">
                  Proponi un film
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4" data-testid="text-how-it-works-title">
              Come funziona
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Porta il cinema che ami nelle sale della tua città in quattro
              semplici passi.
            </p>
          </div>
          <Stepper />
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4" data-testid="text-why-koinity-title">
              Perché Koinity
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un nuovo modo di vivere il cinema, guidato dalla community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl" data-testid="text-pillar-community-title">Community-led</h3>
                <p className="text-muted-foreground" data-testid="text-pillar-community-description">
                  La programmazione parte dalle persone.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl" data-testid="text-pillar-ondemand-title">On-Demand</h3>
                <p className="text-muted-foreground" data-testid="text-pillar-ondemand-description">
                  Schermi pieni grazie a domanda reale.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <MessageCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl" data-testid="text-pillar-conversation-title">Conversazione</h3>
                <p className="text-muted-foreground" data-testid="text-pillar-conversation-description">
                  Thread leggeri per coordinarsi e invitare amici.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4" data-testid="text-featured-title">
              In evidenza vicino a te
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Scopri i film che la community vuole portare in sala.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonProposalCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/vota">
              <Button size="lg" data-testid="button-view-all-proposals">
                Vedi tutte le proposte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 overflow-hidden">
            <CardContent className="p-12 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Unisciti alla community
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Inizia a votare i film che vuoi vedere in sala e contribuisci a
                creare esperienze cinematografiche uniche.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/vota">
                  <Button size="lg">Esplora le proposte</Button>
                </Link>
                <Link href="/proponi">
                  <Button size="lg" variant="outline">
                    Proponi un film
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      </div>
    </>
  );
}
