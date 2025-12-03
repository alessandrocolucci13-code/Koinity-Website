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
import { Film, TrendingUp, Calendar, DollarSign, Handshake, ArrowRight, ChevronDown, CheckCircle, BarChart3, Clock, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { demoRequestSchema, type DemoRequest } from "@shared/schema";
import { useEffect, useRef, useState } from "react";
import laRepubblicaLogo from "@assets/La_Repubblica_logo_1764714212430.png";
import cinetecaLogo from "@assets/Cineteca-Logo_1764714212431.png";
import almaMaterLogo from "@assets/copy_of_logo_1764714212431.png";
import almacubeLogo from "@assets/image-removebg-preview_(27)_1764714212432.png";

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
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background/95 to-background py-20 md:py-32">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 107, 53, 0.1) 10px, rgba(255, 107, 53, 0.1) 11px)'
          }}>
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center justify-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full backdrop-blur-sm hover-elevate transition-all">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Handshake className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Partner Certificato</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              Riempi le tue sale con{' '}
              <span className="text-primary">
                eventi su misura
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Porta in sala ciò che il tuo pubblico vuole davvero. Eventi speciali, 
              classici, festival: domanda chiara, rischio ridotto, sale piene.
            </p>

            {/* Stats Section */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 mb-12 p-6 md:p-8 bg-gradient-to-r from-foreground/5 to-primary/5 border border-primary/20 rounded-2xl backdrop-blur-md"
            >
              <div className="text-center py-2">
                <div className={`text-4xl md:text-5xl font-black text-primary transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
                  {animated ? '95%' : '0%'}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">
                  Tasso di Riempimento
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">Sale mediamente piene</div>
              </div>

              <div className="text-center py-2 md:border-l md:border-primary/20">
                <div className={`text-4xl md:text-5xl font-black text-primary transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
                  {animated ? '200+' : '0+'}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">
                  Eventi Organizzati
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">Nell'ultimo anno</div>
              </div>

              <div className="text-center py-2 md:border-l md:border-primary/20">
                <div className={`text-4xl md:text-5xl font-black text-primary transition-all duration-1000 ${animated ? 'opacity-100' : 'opacity-0'}`}>
                  {animated ? '50+' : '0+'}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">
                  Cinema Partner
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">In tutta Italia</div>
              </div>

              <div className="text-center py-2 md:border-l md:border-primary/20">
                <div className="text-4xl md:text-5xl font-black text-primary">
                  Zero
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">
                  Rischio Commerciale
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">Prenotazioni garantite</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                size="lg"
                className="text-base px-8 h-14 rounded-xl group"
                data-testid="button-demo-request"
              >
                <span>Richiedi una Demo</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="!border-yellow-border !border-2 text-base px-8 h-14 rounded-xl group"
                onClick={() => document.querySelector('#come-funziona')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-learn-more"
              >
                <span>Scopri Come Funziona</span>
                <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>

            {/* Trust section */}
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Si fidano di noi</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <img
                  src={laRepubblicaLogo}
                  alt="La Repubblica"
                  className="h-10 md:h-12 w-auto"
                  style={{
                    opacity: 0.7,
                    filter: 'brightness(0.85) saturate(0.6)',
                  }}
                  data-testid="logo-la-repubblica"
                />
                <img
                  src={cinetecaLogo}
                  alt="Cineteca Bologna"
                  className="h-10 md:h-12 w-auto"
                  style={{
                    opacity: 0.7,
                    filter: 'brightness(0.85) saturate(0.6)',
                  }}
                  data-testid="logo-cineteca"
                />
                <img
                  src={almaMaterLogo}
                  alt="Alma Mater Studiorum"
                  className="h-10 md:h-12 w-auto"
                  style={{
                    opacity: 0.7,
                    filter: 'brightness(0.85) saturate(0.6)',
                  }}
                  data-testid="logo-alma-mater"
                />
                <img
                  src={almacubeLogo}
                  alt="Almacube"
                  className="h-10 md:h-12 w-auto"
                  style={{
                    opacity: 0.7,
                    filter: 'brightness(0.85) saturate(0.6)',
                  }}
                  data-testid="logo-almacube"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFITS SECTION */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-serif text-4xl md:text-5xl font-black text-foreground mb-6">
              Il valore per gli{' '}
              <span className="text-primary">esercenti</span>
            </h2>
            <div className="bg-gradient-to-r from-foreground/5 to-primary/5 border border-primary/20 rounded-2xl backdrop-blur-sm p-6 md:p-8 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Koinity ti permette di programmare proiezioni basate sulla domanda reale del tuo pubblico locale. Riduci il rischio di sale vuote e scopri quali film la tua community vuole davvero vedere.
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Domanda locale - Verde */}
            <div className="benefit-card benefit-card-green group">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-black text-sm group-hover:rotate-180 group-hover:scale-125 transition-all duration-300" data-testid="badge-1">
                1
              </div>
              
              <div className="relative mb-5">
                <div className="benefit-icon-container">
                  <div className="benefit-ring benefit-ring-green"></div>
                  <div className="benefit-icon-bg benefit-icon-bg-green"></div>
                  <TrendingUp className="benefit-icon w-9 h-9 text-white relative z-10" />
                </div>
              </div>
              
              <h3 className="benefit-title text-white group-hover:text-green-400 transition-colors text-xl font-black mb-3" data-testid="title-demand">
                Domanda locale
              </h3>
              <p className="benefit-description text-muted-foreground group-hover:text-foreground transition-colors text-sm leading-relaxed mb-4">
                Scopri cosa vuole vedere il tuo pubblico prima di programmare. Ogni proposta rappresenta domanda reale.
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-foreground/80 bg-background/40 px-3 py-1.5 rounded border border-green-500/20">
                <span className="text-green-400">👥</span>
                <span className="text-green-400">300+</span>
                <span className="text-foreground/60">prenotazioni</span>
              </div>
            </div>

            {/* Card 2: Programmazione mirata - Blu */}
            <div className="benefit-card benefit-card-blue group">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-black text-sm group-hover:rotate-180 group-hover:scale-125 transition-all duration-300" data-testid="badge-2">
                2
              </div>
              
              <div className="relative mb-5">
                <div className="benefit-icon-container">
                  <div className="benefit-ring benefit-ring-blue"></div>
                  <div className="benefit-icon-bg benefit-icon-bg-blue"></div>
                  <Calendar className="benefit-icon w-9 h-9 text-white relative z-10" />
                </div>
              </div>
              
              <h3 className="benefit-title text-white group-hover:text-blue-400 transition-colors text-xl font-black mb-3" data-testid="title-programming">
                Programmazione mirata
              </h3>
              <p className="benefit-description text-muted-foreground group-hover:text-foreground transition-colors text-sm leading-relaxed mb-4">
                Organizza eventi speciali e rassegne con la certezza di riempire la sala.
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-foreground/80 bg-background/40 px-3 py-1.5 rounded border border-blue-500/20">
                <span className="text-blue-400">📅</span>
                <span className="text-blue-400">100%</span>
                <span className="text-foreground/60">confermato</span>
              </div>
            </div>

            {/* Card 3: Rischio ridotto - Giallo */}
            <div className="benefit-card benefit-card-yellow group">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black text-sm group-hover:rotate-180 group-hover:scale-125 transition-all duration-300" data-testid="badge-3">
                3
              </div>
              
              <div className="relative mb-5">
                <div className="benefit-icon-container">
                  <div className="benefit-ring benefit-ring-yellow"></div>
                  <div className="benefit-icon-bg benefit-icon-bg-yellow"></div>
                  <DollarSign className="benefit-icon w-9 h-9 text-white relative z-10" />
                </div>
              </div>
              
              <h3 className="benefit-title text-white group-hover:text-primary transition-colors text-xl font-black mb-3" data-testid="title-risk">
                Rischio ridotto
              </h3>
              <p className="benefit-description text-muted-foreground group-hover:text-foreground transition-colors text-sm leading-relaxed mb-4">
                Le pre-prenotazioni garantiscono spettatori prima di confermare.
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-foreground/80 bg-background/40 px-3 py-1.5 rounded border border-primary/20">
                <span className="text-primary">🛡️</span>
                <span className="text-primary">Zero Rischio</span>
                <span className="text-foreground/60">garantito</span>
              </div>
            </div>

            {/* Card 4: Eventi speciali - Viola */}
            <div className="benefit-card benefit-card-purple group">
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-black text-sm group-hover:rotate-180 group-hover:scale-125 transition-all duration-300" data-testid="badge-4">
                4
              </div>
              
              <div className="relative mb-5">
                <div className="benefit-icon-container">
                  <div className="benefit-ring benefit-ring-purple"></div>
                  <div className="benefit-icon-bg benefit-icon-bg-purple"></div>
                  <Film className="benefit-icon w-9 h-9 text-white relative z-10" />
                </div>
              </div>
              
              <h3 className="benefit-title text-white group-hover:text-purple-400 transition-colors text-xl font-black mb-3" data-testid="title-events">
                Eventi speciali
              </h3>
              <p className="benefit-description text-muted-foreground group-hover:text-foreground transition-colors text-sm leading-relaxed mb-4">
                Crea esperienze uniche con film fuori distribuzione e festival tematici.
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-foreground/80 bg-background/40 px-3 py-1.5 rounded border border-purple-500/20">
                <span className="text-purple-400">🎬</span>
                <span className="text-purple-400">Unico</span>
                <span className="text-foreground/60">esperienza</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">

        {/* COME FUNZIONA SECTION */}
        <section id="come-funziona" className="py-16 md:py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 bg-primary/15 border border-primary/30 rounded-full">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Processo Semplice</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-foreground mb-4">
              Come funziona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quattro semplici passaggi per portare gli eventi più richiesti nelle tue sale cinematografiche
            </p>
          </div>

          {/* Steps Container */}
          <div className="steps-container relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="timeline-line"></div>

            {/* Step 1 */}
            <div className="step-item">
              <div className="step-content">
                <h3 className="step-title">Monitora le proposte</h3>
                <p className="step-description">
                  Accedi alla dashboard per vedere le proposte nella tua città e i livelli di interesse reale.
                </p>
                <div className="step-info mt-4">
                  <Clock className="w-4 h-4" />
                  <span>Aggiornamento continuo</span>
                </div>
              </div>
              <div className="step-number-container">
                <div className="step-ring"></div>
                <div className="step-number-bg">
                  <span className="step-number">1</span>
                  <BarChart3 className="step-icon" />
                </div>
              </div>
              <div className="step-visual">
                <BarChart3 className="visual-icon w-16 h-16 text-primary" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-item">
              <div className="step-visual">
                <CheckCircle className="visual-icon w-16 h-16 text-green-400" />
              </div>
              <div className="step-number-container">
                <div className="step-ring"></div>
                <div className="step-number-bg">
                  <span className="step-number">2</span>
                  <CheckCircle className="step-icon" />
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Valuta la domanda</h3>
                <p className="step-description">
                  Quando una proposta raggiunge la soglia, ricevi una notifica e puoi decidere se ospitare.
                </p>
                <div className="step-info mt-4">
                  <Zap className="w-4 h-4" />
                  <span>Notifiche in tempo reale</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-item">
              <div className="step-content">
                <h3 className="step-title">Organizza l'evento</h3>
                <p className="step-description">
                  Confermi date e orari, e la community riceve la notifica per acquistare i biglietti.
                </p>
                <div className="step-info mt-4">
                  <Calendar className="w-4 h-4" />
                  <span>Gestione semplice</span>
                </div>
              </div>
              <div className="step-number-container">
                <div className="step-ring"></div>
                <div className="step-number-bg">
                  <span className="step-number">3</span>
                  <Calendar className="step-icon" />
                </div>
              </div>
              <div className="step-visual">
                <Calendar className="visual-icon w-16 h-16 text-blue-400" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="step-item">
              <div className="step-visual">
                <Film className="visual-icon w-16 h-16 text-yellow-400" />
              </div>
              <div className="step-number-container">
                <div className="step-ring"></div>
                <div className="step-number-bg">
                  <span className="step-number">4</span>
                  <Film className="step-icon" />
                </div>
              </div>
              <div className="step-content">
                <h3 className="step-title">Sala piena garantita</h3>
                <p className="step-description">
                  Proietti il film con la certezza di avere un pubblico appassionato e coinvolto.
                </p>
                <div className="step-info mt-4">
                  <CheckCircle className="w-4 h-4" />
                  <span>Incassi certi</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="steps-cta mt-16 md:mt-20">
            <h3 className="cta-title mb-2">Pronto a iniziare?</h3>
            <p className="cta-description mb-8">
              Scopri come Koinity può rivoluzionare la programmazione del tuo cinema
            </p>
            <Button
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-base px-8 h-12"
              data-testid="button-cta-demo"
            >
              <span>Richiedi una Demo</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

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
