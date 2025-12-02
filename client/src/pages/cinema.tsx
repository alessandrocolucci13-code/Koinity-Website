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
import { Film, TrendingUp, Calendar, DollarSign, Handshake, ArrowRight, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { demoRequestSchema, type DemoRequest } from "@shared/schema";
import { useEffect, useRef, useState } from "react";

export default function Cinema() {
  const { toast } = useToast();
  const [animated, setAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          observer.unobserve(statsRef.current!);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  return (
    <>
      <SEO
        title="Per i Cinema | Koinity"
        description="Riempi le tue sale con eventi su misura. Scopri come Koinity aiuta gli esercenti cinematografici a programmare proiezioni di successo basate sulla domanda reale della community."
      />

      {/* HERO SECTION */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20 md:py-32">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 214, 0, 0.1) 10px, rgba(255, 214, 0, 0.1) 11px)'
          }}>
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center justify-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-yellow-400/20 to-green-500/20 border border-yellow-400/30 rounded-full backdrop-blur-sm hover-elevate transition-all">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Handshake className="w-4 h-4 text-slate-900" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-yellow-400">Partner Certificato</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Riempi le tue sale con{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text text-transparent">
                eventi su misura
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Porta in sala ciò che il tuo pubblico vuole davvero. Eventi speciali, 
              classici, festival: domanda chiara, rischio ridotto, sale piene.
            </p>

            {/* Stats Section */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 mb-12 p-6 md:p-8 bg-gradient-to-r from-white/5 to-yellow-400/5 border border-white/10 rounded-2xl backdrop-blur-md"
            >
              <div className="text-center py-2">
                <div className={`text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
                  {animated ? '95%' : '0%'}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Tasso di Riempimento
                </div>
                <div className="text-xs text-slate-500 mt-1">Sale mediamente piene</div>
              </div>

              <div className="text-center py-2 md:border-l md:border-yellow-400/20">
                <div className={`text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
                  {animated ? '200+' : '0+'}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Eventi Organizzati
                </div>
                <div className="text-xs text-slate-500 mt-1">Nell'ultimo anno</div>
              </div>

              <div className="text-center py-2 md:border-l md:border-yellow-400/20">
                <div className={`text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
                  {animated ? '50+' : '0+'}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Cinema Partner
                </div>
                <div className="text-xs text-slate-500 mt-1">In tutta Italia</div>
              </div>

              <div className="text-center py-2 md:border-l md:border-yellow-400/20">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-green-500 bg-clip-text">
                  Zero
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Rischio Commerciale
                </div>
                <div className="text-xs text-slate-500 mt-1">Prenotazioni garantite</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-bold text-lg px-8 h-14 rounded-xl group"
                data-testid="button-demo-request"
              >
                <span>Richiedi una Demo</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-yellow-400/50 font-bold text-lg px-8 h-14 rounded-xl group"
                onClick={() => document.querySelector('#come-funziona')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-learn-more"
              >
                <span>Scopri Come Funziona</span>
                <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>

            {/* Trust section */}
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Si fidano di noi</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 hover:opacity-90 transition-opacity">
                <div className="text-slate-400 font-semibold text-sm">ANEC</div>
                <div className="text-slate-400 font-semibold text-sm">Associazione Cinema</div>
                <div className="text-slate-400 font-semibold text-sm">Festival Network</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Film className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4" data-testid="text-page-subtitle">
            Il valore per gli esercenti
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Koinity ti permette di programmare proiezioni basate sulla domanda reale del tuo pubblico locale.
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
