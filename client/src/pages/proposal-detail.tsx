import { useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { MapPin, Calendar, Clock, ExternalLink, Check, Clapperboard } from "lucide-react";
import type { Proposal } from "@shared/schema";

export default function ProposalDetail() {
  const [, params] = useRoute("/vota/:slug");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: proposals, isLoading } = useQuery<Proposal[]>({
    queryKey: ["/api/proposals"],
  });

  const proposal = proposals?.find((p) => p.slug === params?.slug);

  const voteMutation = useMutation({
    mutationFn: async (proposalId: string) => {
      return await apiRequest("PATCH", `/api/proposals/${proposalId}/vote`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/proposals"] });
      toast({
        title: "Pre-prenotazione confermata!",
        description: "Ti avviseremo quando sarà possibile acquistare i biglietti.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">
            Proposta non trovata
          </h1>
          <p className="text-muted-foreground">
            La proposta che stai cercando non esiste o è stata rimossa.
          </p>
        </div>
      </div>
    );
  }

  const percentage = (proposal.votes / proposal.goal) * 100;
  const tiers = [
    { threshold: 25, label: "Sconto 5%", reached: percentage >= 25 },
    { threshold: 50, label: "Sconto 10%", reached: percentage >= 50 },
    { threshold: 75, label: "Sconto 15%", reached: percentage >= 75 },
    { threshold: 100, label: "Proiezione confermata!", reached: percentage >= 100 },
  ];

  return (
    <>
      <SEO
        title={proposal ? `${proposal.title} - Proposta Film` : "Proposta Film"}
        description={proposal ? `Vota per portare ${proposal.title} in sala a ${proposal.city}. ${proposal.synopsis || 'Scopri i dettagli e partecipa alla proiezione on-demand.'}` : "Scopri i dettagli di questa proposta film."}
        image={proposal?.posterUrl}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="aspect-[2/3] relative overflow-hidden rounded-2xl bg-muted">
              {proposal.posterUrl ? (
                <img
                  src={proposal.posterUrl}
                  alt={proposal.title}
                  className="object-cover w-full h-full"
                  data-testid="img-poster"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Clapperboard className="h-24 w-24" />
                </div>
              )}
              {proposal.rightsStatus === "unknown" && (
                <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
                  Non in distribuzione
                </Badge>
              )}
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => voteMutation.mutate(proposal.id)}
              disabled={voteMutation.isPending}
              data-testid="button-vote"
            >
              {voteMutation.isPending ? "Votando..." : "Vota / Pre-prenota"}
            </Button>

            {proposal.trailer && (
              <Button
                variant="outline"
                className="w-full"
                asChild
                data-testid="button-trailer"
              >
                <a
                  href={proposal.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Guarda il trailer
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4" data-testid="text-title">
              {proposal.title}
            </h1>

            {proposal.tags && proposal.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {proposal.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" data-testid={`badge-tag-${tag}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span data-testid="text-city">{proposal.city}</span>
              </div>
              {proposal.venueHint && (
                <div className="text-muted-foreground" data-testid="text-venue">
                  Cinema: {proposal.venueHint}
                </div>
              )}
              {proposal.targetDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="text-date">{proposal.targetDate}</span>
                </div>
              )}
              {proposal.duration && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span data-testid="text-duration">{proposal.duration}</span>
                </div>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progresso voti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressBar votes={proposal.votes} goal={proposal.goal} />
              <p className="text-sm text-muted-foreground">
                Mancano ancora <span className="font-semibold text-foreground">{proposal.goal - proposal.votes}</span> voti per confermare la proiezione.
              </p>
            </CardContent>
          </Card>

          {proposal.synopsis && (
            <Card>
              <CardHeader>
                <CardTitle>Sinossi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-synopsis">
                  {proposal.synopsis}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Timeline sconti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tiers.map((tier) => (
                  <div
                    key={tier.threshold}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      tier.reached
                        ? "bg-primary/10 border-primary/30"
                        : "bg-muted/30 border-border"
                    }`}
                    data-testid={`tier-${tier.threshold}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tier.reached ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {tier.reached ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-bold">{tier.threshold}%</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${tier.reached ? "text-foreground" : "text-muted-foreground"}`}>
                        {tier.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tier.threshold === 100 ? proposal.goal : Math.round((tier.threshold / 100) * proposal.goal)} voti
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversazione</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Marco R.</p>
                  <p className="text-sm text-muted-foreground">
                    Sarebbe fantastico vedere questo film sul grande schermo! Chi viene?
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Giulia B.</p>
                  <p className="text-sm text-muted-foreground">
                    Ho già pre-prenotato! Spero si raggiunga la soglia presto.
                  </p>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  La funzionalità di commenti sarà disponibile a breve.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}
