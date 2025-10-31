import { Film, ThumbsUp, Unlock, Users } from "lucide-react";

const steps = [
  {
    icon: Film,
    title: "Proponi",
    description: "Segnala un film, aggiungi trailer e città.",
  },
  {
    icon: ThumbsUp,
    title: "Vota",
    description: "Partecipa al voto o pre-impegnati al biglietto.",
  },
  {
    icon: Unlock,
    title: "Sblocca",
    description: "Al raggiungimento della soglia, la proiezione si conferma.",
  },
  {
    icon: Users,
    title: "Vai in sala",
    description: "Esperienza condivisa, conversazioni e—se si sbloccano—sconti.",
  },
];

export function Stepper() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={step.title}
            className="relative flex flex-col items-center text-center"
            data-testid={`step-${index + 1}`}
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2" data-testid={`text-step-title-${index + 1}`}>{step.title}</h3>
            <p className="text-sm text-muted-foreground" data-testid={`text-step-description-${index + 1}`}>
              {step.description}
            </p>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}
