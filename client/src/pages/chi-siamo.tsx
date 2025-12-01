import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Calendar } from "lucide-react";
import { SEO } from "@/components/seo";
import { useEffect, useRef, useState } from "react";

export default function ChiSiamo() {
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleMission, setVisibleMission] = useState(false);
  const [visibleValues, setVisibleValues] = useState(false);
  const [visibleTimeline, setVisibleTimeline] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.target === missionRef.current) setVisibleMission(true);
          if (entry.target === valuesRef.current) setVisibleValues(true);
          if (entry.target === timelineRef.current) setVisibleTimeline(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (timelineRef.current) observer.observe(timelineRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Chi Siamo"
        description="Scopri la missione di Koinity: rendere accessibile qualsiasi film in sala attraverso il potere della community. Scopri chi siamo e i nostri valori fondamentali."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
            Chi Siamo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            La nostra missione è ridare potere alla community cinematografica,
            rendendo accessibile qualsiasi film in sala.
          </p>
        </div>

        <div ref={missionRef} className={`mission-card mb-12 p-12 rounded-2xl transition-all duration-300 ${visibleMission ? 'visible' : ''}`} style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,214,0,0.05))', border: '1px solid rgba(255,214,0,0.3)'}}>
          <h2 className="mission-title font-serif mb-8 text-center">
            La nostra mission
          </h2>
          <p className="mission-paragraph text-muted-foreground">
            Koinity nasce dalla passione per il cinema e dalla convinzione che
            le persone dovrebbero poter scegliere cosa vedere sul grande
            schermo. Troppi film straordinari non raggiungono mai le sale
            italiane, o vengono proiettati solo in poche città.
          </p>
          <p className="mission-paragraph text-muted-foreground">
            La nostra piattaforma permette alla community di votare i film che
            desidera vedere in sala e, quando la domanda è sufficiente,
            coordiniamo proiezioni on-demand con i cinema locali. Non si tratta
            solo di sconti—anche se quelli aiutano—ma di restituire il potere
            di programmazione nelle mani degli spettatori.
          </p>
        </div>

        <div ref={valuesRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ${visibleValues ? '' : ''}`}>
          <div className={`value-card p-8 rounded-2xl transition-all duration-300 ${visibleValues ? 'visible' : ''}`} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="value-icon flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-3">Passione</h3>
            <p className="text-sm text-muted-foreground">
              Crediamo nel potere del cinema di ispirare, emozionare e unire le
              persone.
            </p>
          </div>

          <div className={`value-card p-8 rounded-2xl transition-all duration-300 ${visibleValues ? 'visible' : ''}`} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="value-icon flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-3">Innovazione</h3>
            <p className="text-sm text-muted-foreground">
              Usiamo la tecnologia per rendere il cinema più accessibile e
              democratico.
            </p>
          </div>

          <div className={`value-card p-8 rounded-2xl transition-all duration-300 ${visibleValues ? 'visible' : ''}`} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="value-icon flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-3">Community</h3>
            <p className="text-sm text-muted-foreground">
              La forza della nostra piattaforma è nella sua community
              appassionata.
            </p>
          </div>
        </div>

        <section ref={timelineRef} className={`story-section ${visibleTimeline ? '' : ''}`}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
            La nostra storia
          </h2>
          <div className="story-timeline">
            {/* Card 1 - 2024 - Sinistra */}
            <div className={`story-card align-left ${visibleTimeline ? 'visible' : ''}`}>
              <div className="story-year">
                <span className="story-icon">🎬</span>
                2024
              </div>
              <p className="story-text">
                Koinity nasce dall'idea di un gruppo di cinefili frustrati dall'impossibilità di vedere certi film in sala. Dopo aver organizzato manualmente alcune proiezioni private, ci siamo resi conto che c'era una domanda enorme per questo tipo di esperienza.
              </p>
            </div>

            <div className="story-connector"></div>

            {/* Card 2 - Sviluppo - Destra */}
            <div className={`story-card align-right ${visibleTimeline ? 'visible' : ''}`}>
              <div className="story-year">
                <span className="story-icon">💡</span>
                Sviluppo
              </div>
              <p className="story-text">
                Abbiamo deciso di costruire una piattaforma che potesse scalare questa idea, permettendo a chiunque di proporre e votare film, coordinando automaticamente con i cinema quando la domanda è sufficiente.
              </p>
            </div>

            <div className="story-connector"></div>

            {/* Card 3 - Oggi - Sinistra */}
            <div className={`story-card align-left ${visibleTimeline ? 'visible' : ''}`}>
              <div className="story-year">
                <span className="story-icon">🚀</span>
                Oggi
              </div>
              <p className="story-text">
                Koinity sta crescendo in tutta Italia, portando film straordinari nelle sale e creando esperienze cinematografiche uniche guidate dalla community.
              </p>
            </div>
          </div>
        </section>

        <Card className="mb-12">
          <CardContent className="p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
              Il team
            </h2>
            <p className="text-muted-foreground mb-6">
              Siamo un team appassionato di cinema, tecnologia e community
              building, dedicato a rendere il cinema più accessibile e
              democratico.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                    <Users className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold">Team Member</h4>
                  <p className="text-sm text-muted-foreground">Role</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Press Kit
            </h2>
            <p className="text-muted-foreground mb-6">
              Materiali per la stampa, loghi e informazioni sulla company.
            </p>
            <p className="text-sm text-muted-foreground">
              Per richieste stampa: press@koinity.it
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}
