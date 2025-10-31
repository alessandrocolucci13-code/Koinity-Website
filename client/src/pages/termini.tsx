import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/seo";

export default function Termini() {
  return (
    <>
      <SEO
        title="Termini e Condizioni"
        description="Termini e condizioni d'uso della piattaforma Koinity. Leggi i nostri termini prima di utilizzare il servizio di cinema on-demand."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
            Termini e Condizioni
          </h1>
          <p className="text-muted-foreground">
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Accettazione dei termini</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Accedendo e utilizzando Koinity, accetti di essere vincolato da
                questi Termini e Condizioni d'Uso, da tutte le leggi e
                regolamenti applicabili, e accetti di essere responsabile per il
                rispetto di tutte le leggi locali applicabili. Se non sei
                d'accordo con uno qualsiasi di questi termini, ti è proibito
                utilizzare o accedere a questo sito.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Utilizzo del servizio</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-3">
              <p>Ti impegni a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fornire informazioni accurate e veritiere</li>
                <li>Mantenere la sicurezza del tuo account</li>
                <li>Notificarci immediatamente di qualsiasi uso non autorizzato</li>
                <li>Non utilizzare il servizio per scopi illegali</li>
                <li>Non interferire con il corretto funzionamento del servizio</li>
                <li>Rispettare gli altri utenti e la community</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Proposte e voti</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Quando proponi un film o voti per una proposta:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Garantisci di non violare diritti di terze parti</li>
                <li>Comprendi che le proposte sono soggette a verifica</li>
                <li>
                  I voti e le pre-prenotazioni non costituiscono un obbligo
                  contrattuale fino alla conferma della proiezione
                </li>
                <li>
                  Koinity si riserva il diritto di rimuovere proposte
                  inappropriate
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Pre-prenotazioni e pagamenti</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Le pre-prenotazioni servono a misurare l'interesse per una
                proiezione. L'acquisto effettivo dei biglietti avverrà solo dopo
                la conferma della proiezione da parte del cinema partner.
                Eventuali sconti applicati dipenderanno dal raggiungimento delle
                soglie indicate. Koinity non è responsabile per la mancata
                organizzazione di una proiezione se la soglia minima non viene
                raggiunta.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Proprietà intellettuale</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Tutti i contenuti presenti su Koinity, inclusi testo, grafica,
                loghi, icone, immagini e software, sono di proprietà di Koinity
                o dei suoi fornitori di contenuti e sono protetti dalle leggi
                italiane e internazionali sul copyright. Il nome "Koinity", il
                logo e tutti i marchi correlati sono marchi di Koinity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Limitazione di responsabilità</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Koinity fornisce la piattaforma "così com'è" e "come disponibile"
                senza garanzie di alcun tipo. Non garantiamo che il servizio sarà
                ininterrotto o privo di errori. In nessun caso Koinity sarà
                responsabile per danni indiretti, incidentali, speciali o
                consequenziali derivanti dall'uso o dall'impossibilità di
                utilizzare il servizio.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Modifiche ai termini</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Koinity si riserva il diritto di modificare questi termini in
                qualsiasi momento. Le modifiche entreranno in vigore
                immediatamente dopo la pubblicazione sul sito. L'uso continuato
                del servizio dopo la pubblicazione delle modifiche costituisce
                l'accettazione di tali modifiche.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Legge applicabile</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Questi termini sono regolati dalle leggi italiane. Qualsiasi
                controversia relativa a questi termini sarà soggetta alla
                giurisdizione esclusiva dei tribunali italiani.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Contatti</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Per domande riguardo questi termini e condizioni, contattaci a:
                legal@koinity.it
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}
