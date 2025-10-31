import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import { MapPin, Calendar, Clapperboard } from "lucide-react";
import type { Proposal } from "@shared/schema";

interface ProposalCardProps {
  proposal: Proposal;
  onVote?: (proposalId: string) => void;
}

export function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 flex flex-col h-full" data-testid={`card-proposal-${proposal.id}`}>
      <Link href={`/vota/${proposal.slug}`}>
        <a className="block">
          <div className="aspect-[2/3] relative overflow-hidden bg-muted">
            {proposal.posterUrl ? (
              <img
                src={proposal.posterUrl}
                alt={proposal.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
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

      <CardContent className="flex-1 p-4 space-y-3">
        <Link href={`/vota/${proposal.slug}`}>
          <a>
            <h3 className="font-serif text-lg font-bold line-clamp-2 hover:text-primary transition-colors" data-testid={`text-title-${proposal.id}`}>
              {proposal.title}
            </h3>
          </a>
        </Link>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span data-testid={`text-city-${proposal.id}`}>{proposal.city}</span>
          </div>
          {proposal.targetDate && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span data-testid={`text-date-${proposal.id}`}>{proposal.targetDate}</span>
            </div>
          )}
        </div>

        {proposal.tags && proposal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {proposal.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs" data-testid={`badge-tag-${tag}`}>
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <ProgressBar votes={proposal.votes} goal={proposal.goal} />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            onVote?.(proposal.id);
          }}
          data-testid={`button-vote-${proposal.id}`}
        >
          Vota / Pre-prenota
        </Button>
      </CardFooter>
    </Card>
  );
}
