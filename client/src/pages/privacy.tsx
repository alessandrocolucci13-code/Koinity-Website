import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/seo";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Informativa sulla privacy di Koinity. Scopri come trattiamo e proteggiamo i tuoi dati personali quando utilizzi la nostra piattaforma."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Introduzione</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Koinity ("noi", "nostro") rispetta la tua privacy e si impegna a
                proteggere i tuoi dati personali. Questa informativa sulla
                privacy ti informa su come trattiamo i tuoi dati personali quando
                visiti il nostro sito web e ti informa sui tuoi diritti in
                materia di privacy e su come la legge ti protegge.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Dati che raccogliamo</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-3">
              <p>Possiamo raccogliere, utilizzare, archiviare e trasferire diversi tipi di dati personali su di te, tra cui:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Dati di identità:</strong> nome, cognome</li>
                <li><strong>Dati di contatto:</strong> indirizzo email, città</li>
                <li><strong>Dati tecnici:</strong> indirizzo IP, tipo di browser, fuso orario</li>
                <li><strong>Dati di utilizzo:</strong> informazioni su come utilizzi il nostro sito web</li>
                <li><strong>Dati delle proposte:</strong> film proposti, voti, pre-prenotazioni</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Come utilizziamo i tuoi dati</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-3">
              <p>Utilizziamo i tuoi dati personali per:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Permetterti di utilizzare i servizi della piattaforma</li>
                <li>Gestire proposte, voti e pre-prenotazioni</li>
                <li>Comunicare con te riguardo ai servizi</li>
                <li>Migliorare il nostro sito web e i nostri servizi</li>
                <li>Inviarti comunicazioni di marketing (con il tuo consenso)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Sicurezza dei dati</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Abbiamo implementato misure di sicurezza appropriate per
                prevenire che i tuoi dati personali vengano accidentalmente
                persi, utilizzati, modificati o divulgati in modo non
                autorizzato. Limitiamo l'accesso ai tuoi dati personali a quei
                dipendenti, agenti, appaltatori e altre terze parti che hanno
                bisogno di conoscere tali dati.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. I tuoi diritti legali</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed space-y-3">
              <p>Ai sensi del GDPR, hai il diritto di:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Richiedere l'accesso ai tuoi dati personali</li>
                <li>Richiedere la correzione dei tuoi dati personali</li>
                <li>Richiedere la cancellazione dei tuoi dati personali</li>
                <li>Opporti al trattamento dei tuoi dati personali</li>
                <li>Richiedere la limitazione del trattamento</li>
                <li>Richiedere il trasferimento dei tuoi dati personali</li>
                <li>Revocare il consenso</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookie</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Il nostro sito web utilizza cookie per migliorare la tua
                esperienza di navigazione. I cookie sono piccoli file di testo
                che vengono memorizzati sul tuo dispositivo quando visiti il
                nostro sito. Puoi impostare il tuo browser per rifiutare tutti o
                alcuni cookie del browser, o per avvisarti quando i siti web
                impostano o accedono ai cookie.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Contatti</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground leading-relaxed">
              <p>
                Se hai domande su questa informativa sulla privacy o sulle
                nostre pratiche di privacy, contattaci a: privacy@koinity.it
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}
