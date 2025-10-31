import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Proposal } from "@shared/schema";

interface PreBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal | null;
  onConfirm: () => void;
}

export function PreBookingModal({
  open,
  onOpenChange,
  proposal,
  onConfirm,
}: PreBookingModalProps) {
  if (!proposal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="modal-pre-booking">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Conferma Pre-prenotazione
          </DialogTitle>
          <DialogDescription>
            Stai per pre-prenotare un biglietto per la proiezione di
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-3">
          <h3 className="font-serif text-xl font-bold text-foreground" data-testid="text-modal-title">
            {proposal.title}
          </h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p data-testid="text-modal-city">Città: {proposal.city}</p>
            {proposal.targetDate && <p data-testid="text-modal-date">Data: {proposal.targetDate}</p>}
            {proposal.venueHint && <p data-testid="text-modal-venue">Cinema: {proposal.venueHint}</p>}
          </div>

          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm">
              La tua pre-prenotazione aiuterà a raggiungere la soglia necessaria
              per confermare la proiezione. Riceverai una notifica quando
              sarà possibile acquistare i biglietti.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-modal-cancel"
          >
            Annulla
          </Button>
          <Button onClick={onConfirm} data-testid="button-modal-confirm">
            Conferma Pre-prenotazione
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
