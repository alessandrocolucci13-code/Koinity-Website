import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users } from "lucide-react";
import { SEO } from "@/components/seo";

export default function ChiSiamo() {
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

        <Card className="mb-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
              La nostra mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Koinity nasce dalla passione per il cinema e dalla convinzione che
              le persone dovrebbero poter scegliere cosa vedere sul grande
              schermo. Troppi film straordinari non raggiungono mai le sale
              italiane, o vengono proiettati solo in poche città.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              La nostra piattaforma permette alla community di votare i film che
              desidera vedere in sala e, quando la domanda è sufficiente,
              coordiniamo proiezioni on-demand con i cinema locali. Non si tratta
              solo di sconti—anche se quelli aiutano—ma di restituire il potere
              di programmazione nelle mani degli spettatori.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Passione</h3>
              <p className="text-sm text-muted-foreground">
                Crediamo nel potere del cinema di ispirare, emozionare e unire le
                persone.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Innovazione</h3>
              <p className="text-sm text-muted-foreground">
                Usiamo la tecnologia per rendere il cinema più accessibile e
                democratico.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Community</h3>
              <p className="text-sm text-muted-foreground">
                La forza della nostra piattaforma è nella sua community
                appassionata.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
              La nostra storia
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Koinity è nata nel 2024 dall'idea di un gruppo di cinefili
                frustrati dall'impossibilità di vedere certi film in sala. Dopo
                aver organizzato manualmente alcune proiezioni private, ci siamo
                resi conto che c'era una domanda enorme per questo tipo di
                esperienza.
              </p>
              <p>
                Abbiamo deciso di costruire una piattaforma che potesse scalare
                questa idea, permettendo a chiunque di proporre e votare film,
                coordinando automaticamente con i cinema quando la domanda è
                sufficiente.
              </p>
              <p>
                Oggi, Koinity sta crescendo in tutta Italia, portando film
                straordinari nelle sale e creando esperienze cinematografiche
                uniche guidate dalla community.
              </p>
            </div>
          </CardContent>
        </Card>

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
