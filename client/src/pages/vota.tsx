import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ProposalCard } from "@/components/proposal-card";
import { SkeletonProposalCard } from "@/components/skeleton-proposal-card";
import { Filters } from "@/components/filters";
import { PreBookingModal } from "@/components/pre-booking-modal";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import type { Proposal } from "@shared/schema";

export default function Vota() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [genre, setGenre] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: proposals, isLoading } = useQuery<Proposal[]>({
    queryKey: ["/api/proposals"],
  });

  const voteMutation = useMutation({
    mutationFn: async (proposalId: string) => {
      return await apiRequest("PATCH", `/api/proposals/${proposalId}/vote`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/proposals"] });
      toast({
        title: "Voto registrato!",
        description: "Grazie per aver votato. La tua voce conta!",
      });
      setModalOpen(false);
      setSelectedProposal(null);
    },
  });

  const filteredProposals = proposals?.filter((proposal) => {
    const matchesSearch =
      search === "" ||
      proposal.title.toLowerCase().includes(search.toLowerCase()) ||
      proposal.synopsis?.toLowerCase().includes(search.toLowerCase());

    const matchesCity = city === "all" || proposal.city === city;

    const matchesGenre =
      genre === "all" ||
      proposal.tags?.some((tag) => tag.toLowerCase() === genre.toLowerCase());

    return matchesSearch && matchesCity && matchesGenre;
  });

  const handleVoteClick = (proposalId: string) => {
    const proposal = proposals?.find((p) => p.id === proposalId);
    if (proposal) {
      setSelectedProposal(proposal);
      setModalOpen(true);
    }
  };

  const handleConfirmVote = () => {
    if (selectedProposal) {
      voteMutation.mutate(selectedProposal.id);
    }
  };

  return (
    <>
      <SEO
        title="Vota & Partecipa"
        description="Esplora le proposte della community Koinity e vota per i film che vorresti vedere in sala. Ogni voto ci avvicina alla proiezione. Scopri i film più votati nella tua città."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
          Vota & Partecipa
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Esplora le proposte della community e vota per i film che vorresti
          vedere in sala. Ogni voto ci avvicina alla proiezione!
        </p>
      </div>

      <div className="mb-8">
        <Filters
          search={search}
          onSearchChange={setSearch}
          city={city}
          onCityChange={setCity}
          genre={genre}
          onGenreChange={setGenre}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonProposalCard key={i} />
          ))}
        </div>
      ) : filteredProposals && filteredProposals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onVote={handleVoteClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            Nessuna proposta trovata con i filtri selezionati.
          </p>
        </div>
      )}

      <PreBookingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        proposal={selectedProposal}
        onConfirm={handleConfirmVote}
      />
      </div>
    </>
  );
}
