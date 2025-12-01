import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { demoRequestSchema, type DemoRequest } from "@shared/schema";

export default function Cinema() {
  const { toast } = useToast();

  const form = useForm<DemoRequest>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      cinemaNome: "",
      città: "",
      message: "",
    },
  });

  const onSubmit = (data: DemoRequest) => {
    console.log("Demo request:", data);
    toast({
      title: "Richiesta inviata!",
      description: "Ti contatteremo presto per programmare una demo.",
    });
    form.reset();
  };

  return (
    <>
      <SEO
        title="Cinema Partner"
        description="Porta Koinity nel tuo cinema. Offri ai tuoi clienti proiezioni on-demand e riempi le sale con film richiesti dalla community. Richiedi una demo gratuita."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Film className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
            Per i Cinema
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Porta in sala ciò che il tuo pubblico vuole davvero. Eventi speciali,
            classici, festival: domanda chiara, rischio ridotto.
          </p>
        </div>

        <Card className="mb-12 bg-gradient-to-br from-primary/10 to-primary/5 border-yellow-border border-2">
          <CardContent className="p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Il valore per gli esercenti
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Koinity ti permette di programmare proiezioni basate sulla domanda
              reale del tuo pubblico locale. Riduci il rischio di sale vuote e
              scopri quali film la tua community vuole davvero vedere.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Domanda locale</h3>
              <p className="text-sm text-muted-foreground">
                Scopri cosa vuole vedere il tuo pubblico prima di programmare.
                Ogni proposta rappresenta domanda reale.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Programmazione mirata</h3>
              <p className="text-sm text-muted-foreground">
                Organizza eventi speciali, rassegne di classici o anteprime con
                la certezza di riempire la sala.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Rischio ridotto</h3>
              <p className="text-sm text-muted-foreground">
                Le pre-prenotazioni garantiscono un numero minimo di spettatori
                prima di confermare la proiezione.
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Film className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Eventi speciali</h3>
              <p className="text-sm text-muted-foreground">
                Crea esperienze uniche con film fuori distribuzione, festival e
                rassegne tematiche.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Come funziona</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">Monitora le proposte</h4>
                <p className="text-sm text-muted-foreground">
                  Accedi alla dashboard per vedere le proposte nella tua città e i
                  livelli di interesse.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Valuta la domanda</h4>
                <p className="text-sm text-muted-foreground">
                  Quando una proposta raggiunge la soglia, ricevi una notifica e
                  puoi decidere se ospitare la proiezione.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Organizza l'evento</h4>
                <p className="text-sm text-muted-foreground">
                  Confermi date e orari, e la community riceve la notifica per
                  acquistare i biglietti.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-1">Sala piena</h4>
                <p className="text-sm text-muted-foreground">
                  Proietti il film con la certezza di avere un pubblico
                  appassionato e coinvolto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Richiedi una Demo</CardTitle>
            <CardDescription>
              Scopri come Koinity può aiutare il tuo cinema a programmare eventi
              di successo basati sulla domanda reale.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Mario Rossi" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="mario@cinema.it"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cinemaNome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome del cinema</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Cinema Odeon"
                            {...field}
                            data-testid="input-cinema-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="città"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Città</FormLabel>
                        <FormControl>
                          <Input placeholder="Milano" {...field} data-testid="input-city" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Messaggio (opzionale)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Raccontaci del tuo cinema..."
                          {...field}
                          rows={4}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" data-testid="button-submit">
                  Richiedi una demo
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}
