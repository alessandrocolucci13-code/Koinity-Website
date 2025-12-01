import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import { MapPin, Calendar, Clock, Clapperboard, Play, ArrowRight } from "lucide-react";
import type { Proposal } from "@shared/schema";

interface ProposalCardProps {
  proposal: Proposal;
  onVote?: (proposalId: string) => void;
}

// Genera orario coerente basato sull'ID del film
function getScreeningTime(proposalId: string): string {
  const hash = proposalId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const hour = 14 + (hash % 8); // 14:00 - 21:00
  const minutes = (hash % 4) * 15; // 00, 15, 30, 45
  return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  const screeningTime = getScreeningTime(proposal.id);
  
  return (
    <Card className="proposal-card flex flex-col h-full" data-testid={`card-proposal-${proposal.id}`}>
      <Link href={`/vota/${proposal.slug}`}>
        <a className="block">
          <div className="proposal-image aspect-[2/3] relative overflow-hidden bg-muted">
            {proposal.posterUrl ? (
              <>
                <img
                  src={proposal.posterUrl}
                  alt={proposal.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="proposal-overlay" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Clapperboard className="h-16 w-16" />
              </div>
            )}
            {proposal.rightsStatus === "unknown" && (
              <Badge
                className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm"
                data-testid={`badge-rights-${proposal.id}`}
              >
                Non in distribuzione
              </Badge>
            )}
          </div>
        </a>
      </Link>

      <CardContent className="flex-1 p-4 space-y-4">
        <Link href={`/vota/${proposal.slug}`}>
          <a>
            <h3 className="font-serif text-lg font-bold line-clamp-2 hover:text-primary transition-colors" style={{fontWeight: 700}} data-testid={`text-title-${proposal.id}`}>
              {proposal.title}
            </h3>
          </a>
        </Link>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span data-testid={`text-city-${proposal.id}`}>{proposal.city}</span>
          </div>
          {proposal.targetDate && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
              <span data-testid={`text-date-${proposal.id}`}>{proposal.targetDate}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
            <span data-testid={`text-time-${proposal.id}`}>{screeningTime}</span>
          </div>
        </div>

        {proposal.tags && proposal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {proposal.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs" data-testid={`badge-tag-${tag}`}>
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="pt-2">
          <ProgressBar votes={proposal.votes} goal={proposal.goal} />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2 flex-col">
        <Link href={`/vota/${proposal.slug}`}>
          <Button
            variant="outline"
            className="w-full gap-2"
            data-testid={`button-trailer-${proposal.id}`}
          >
            <Play className="h-4 w-4" />
            Guarda il trailer
          </Button>
        </Link>
        <Button
          className="w-full gap-2"
          onClick={(e) => {
            e.preventDefault();
            onVote?.(proposal.id);
          }}
          style={{backgroundColor: 'hsl(var(--yellow))', color: '#000', fontWeight: 600}}
          data-testid={`button-vote-${proposal.id}`}
        >
          <ArrowRight className="h-4 w-4" />
          Vota / Pre-prenota
        </Button>
      </CardFooter>
    </Card>
  );
}
