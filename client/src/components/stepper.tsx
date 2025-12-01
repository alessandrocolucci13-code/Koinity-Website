import { Film, ThumbsUp, Unlock, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={step.title}
            className={`stepper-card relative flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg ${
              isVisible ? "opacity-100" : ""
            }`}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
            }}
            data-testid={`step-${index + 1}`}
          >
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                <Icon className="stepper-icon h-7 w-7 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
            </div>
            <h3 className="font-bold text-lg mb-3 font-semibold" data-testid={`text-step-title-${index + 1}`}>{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{lineHeight: '1.7'}} data-testid={`text-step-description-${index + 1}`}>
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
