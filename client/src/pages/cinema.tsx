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
import { Film, TrendingUp, Calendar, DollarSign, Handshake, ArrowRight, ChevronDown, CheckCircle, BarChart3, Clock, Zap, Sparkles, Shield, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { demoRequestSchema, type DemoRequest } from "@shared/schema";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import almaLogo from "@assets/image_1765066171128.png";
import unicornLogo from "@assets/image_1765066182463.png";
import repubblica from "@assets/image_1765066188916.png";
import utsApple from "@assets/image_1765066194828.png";
import almacube from "@assets/image_1765066201011.png";
import cineteca from "@assets/image_1765066207172.png";

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

  const demoMutation = useMutation({
    mutationFn: (data: DemoRequest) => 
      apiRequest("POST", "/api/demo-request", data),
    onSuccess: () => {
      toast({
        title: "Richiesta inviata!",
        description: "Ti contatteremo presto per programmare una demo.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DemoRequest) => {
    demoMutation.mutate(data);
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
            <h1 className="blog-title">
              Riempi le tue sale con <span className="highlight">eventi su misura</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Porta in sala ciò che il tuo pubblico vuole davvero. Eventi speciali, 
              classici, festival: domanda chiara, rischio ridotto, sale piene.
            </p>

            {/* Stats Section */}
            <div
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 mb-12 p-6 md:p-8 bg-gradient-to-r from-foreground/5 to-primary/5 border border-primary/20 rounded-2xl backdrop-blur-md"
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

            {/* Trust section title */}
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 mt-8">Si fidano di noi</p>

            {/* Partner Logos Box */}
            <div className="bg-white rounded-2xl p-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-8">
                {/* Row 1 */}
                <div className="flex items-center justify-center">
                  <img src={almaLogo} alt="Alma Mater Studiorum" className="h-24 object-contain" data-testid="logo-alma" />
                </div>
                <div className="flex items-center justify-center">
                  <img src={unicornLogo} alt="Unicorn Factory Lisboa" className="h-24 object-contain" data-testid="logo-unicorn" />
                </div>
                <div className="flex items-center justify-center">
                  <img src={repubblica} alt="la Repubblica" className="h-24 object-contain" data-testid="logo-repubblica" />
                </div>
                
                {/* Row 2 */}
                <div className="flex items-center justify-center">
                  <img src={utsApple} alt="UTS Apple Foundation" className="h-24 object-contain" data-testid="logo-uts" />
                </div>
                <div className="flex items-center justify-center">
                  <img src={almacube} alt="ALMACUBE" className="h-24 object-contain" data-testid="logo-almacube" />
                </div>
                <div className="flex items-center justify-center">
                  <img src={cineteca} alt="Cineteca Bologna" className="h-24 object-contain" data-testid="logo-cineteca" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFITS SECTION */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="section-header">
            <h2 className="h2">
              Il valore per gli{' '}
              <span className="highlight">esercenti</span>
            </h2>
          </div>
          <div className="bg-gradient-to-r from-foreground/5 to-primary/5 border border-primary/20 rounded-2xl backdrop-blur-sm p-6 md:p-8 max-w-3xl mx-auto mb-16 md:mb-24">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Koinity ti permette di programmare proiezioni basate sulla domanda reale del tuo pubblico locale. Riduci il rischio di sale vuote e scopri quali film la tua community vuole davvero vedere.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Domanda locale */}
            <div className="benefit-card benefit-card-green">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">📈</span>
              </div>
              <div className="benefit-content">
                <h3 className="benefit-title" data-testid="title-demand">Domanda locale</h3>
                <p className="benefit-description">
                  Scopri cosa vuole vedere il tuo pubblico prima di programmare. Ogni proposta rappresenta domanda reale.
                </p>
                <span className="benefit-metric">
                  <span>👥</span>
                  300+ prenotazioni medie
                </span>
              </div>
            </div>

            {/* Card 2: Programmazione mirata */}
            <div className="benefit-card benefit-card-blue">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">📅</span>
              </div>
              <div className="benefit-content">
                <h3 className="benefit-title" data-testid="title-programming">Programmazione mirata</h3>
                <p className="benefit-description">
                  Organizza eventi speciali e rassegne con la certezza di riempire la sala.
                </p>
                <span className="benefit-metric">
                  <span>✓</span>
                  100% confermato
                </span>
              </div>
            </div>

            {/* Card 3: Rischio ridotto */}
            <div className="benefit-card benefit-card-yellow">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">💰</span>
              </div>
              <div className="benefit-content">
                <h3 className="benefit-title" data-testid="title-risk">Rischio ridotto</h3>
                <p className="benefit-description">
                  Le pre-prenotazioni garantiscono spettatori prima di confermare la proiezione.
                </p>
                <span className="benefit-metric">
                  <span>🛡️</span>
                  Zero rischio garantito
                </span>
              </div>
            </div>

            {/* Card 4: Eventi speciali */}
            <div className="benefit-card benefit-card-purple">
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">🎪</span>
              </div>
              <div className="benefit-content">
                <h3 className="benefit-title" data-testid="title-events">Eventi speciali</h3>
                <p className="benefit-description">
                  Crea esperienze uniche con film fuori distribuzione e festival tematici.
                </p>
                <span className="benefit-metric">
                  <span>⭐</span>
                  Unica esperienza
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-4xl mx-auto">

        {/* COME FUNZIONA SECTION */}
        <section id="come-funziona" className="how-it-works-section">
          {/* Header */}
          <div className="section-header">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 bg-primary/15 border border-primary/30 rounded-full">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Processo Semplice</span>
            </div>
            <h2 className="h2">Come <span className="highlight">funziona</span></h2>
            <p className="section-subtitle">Quattro semplici passaggi per riempire le tue sale</p>
          </div>

          {/* Steps Grid 2x2 */}
          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <div className="step-number">
                1
                <BarChart3 className="step-number-icon" />
              </div>
              <div className="step-icon-container">
                <div className="step-icon-bg"></div>
                <BarChart3 className="step-icon" />
              </div>
              <div className="step-content">
                <h3 className="step-title">Monitora le proposte</h3>
                <p className="step-description">Accedi alla dashboard per vedere le proposte nella tua città e i livelli di interesse reale.</p>
                <span className="step-info">
                  <Clock className="w-4 h-4" />
                  Aggiornamento continuo
                </span>
              </div>
              <div className="step-connector-h c1-2"></div>
              <div className="step-connector-v c1-3"></div>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <div className="step-number">
                2
                <CheckCircle className="step-number-icon" />
              </div>
              <div className="step-icon-container">
                <div className="step-icon-bg"></div>
                <CheckCircle className="step-icon" />
              </div>
              <div className="step-content">
                <h3 className="step-title">Valuta la domanda</h3>
                <p className="step-description">Quando una proposta raggiunge la soglia, ricevi notifica e decidi se confermare. Pubblico garantito.</p>
                <span className="step-info">
                  <Zap className="w-4 h-4" />
                  Soglia: 50-100 prenotazioni
                </span>
              </div>
              <div className="step-connector-v c2-4"></div>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <div className="step-number">
                3
                <Calendar className="step-number-icon" />
              </div>
              <div className="step-icon-container">
                <div className="step-icon-bg"></div>
                <Calendar className="step-icon" />
              </div>
              <div className="step-content">
                <h3 className="step-title">Organizza l'evento</h3>
                <p className="step-description">Confermi date e orari, la community riceve notifica per acquistare. Coordinamento automatico.</p>
                <span className="step-info">
                  <Handshake className="w-4 h-4" />
                  Flessibilità totale
                </span>
              </div>
              <div className="step-connector-h c3-4"></div>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <div className="step-number">
                4
                <Film className="step-number-icon" />
              </div>
              <div className="step-icon-container">
                <div className="step-icon-bg"></div>
                <Film className="step-icon" />
              </div>
              <div className="step-content">
                <h3 className="step-title">Sala piena</h3>
                <p className="step-description">Proietti con la certezza di un pubblico appassionato. Zero rischio, massima soddisfazione.</p>
                <span className="step-info">
                  <TrendingUp className="w-4 h-4" />
                  95% riempimento medio
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO SECTION - Two Column Premium Layout */}
        <section className="demo-section">
          <div className="demo-container">
            {/* LEFT COLUMN - Info */}
            <div className="demo-info">
              <span className="demo-badge">
                <Sparkles className="w-4 h-4" />
                DEMO GRATUITA
              </span>
              <h2 className="demo-title">Scopri il Potenziale del Tuo Cinema</h2>
              <p className="demo-subtitle">
                Una consulenza personalizzata di 30 minuti per mostrarti come aumentare i ricavi programmando film che la tua community vuole davvero.
              </p>
              
              {/* What to expect */}
              <div className="demo-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">📊</div>
                  <div className="benefit-text">
                    <h4>Analisi Personalizzata</h4>
                    <p>Esaminiamo i dati del tuo cinema e il mercato locale</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎯</div>
                  <div className="benefit-text">
                    <h4>Strategie su Misura</h4>
                    <p>Scopri come programmare film con domanda garantita</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <div className="benefit-text">
                    <h4>ROI Immediato</h4>
                    <p>Vedi subito come aumentare i tuoi incassi</p>
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="demo-trust">
                <div className="trust-item">
                  <Shield className="w-4 h-4 trust-icon" />
                  <span>100% Gratuito</span>
                </div>
                <div className="trust-item">
                  <Clock className="w-4 h-4 trust-icon" />
                  <span>30 minuti</span>
                </div>
                <div className="trust-item">
                  <Headphones className="w-4 h-4 trust-icon" />
                  <span>Supporto dedicato</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Premium Form */}
            <div className="demo-form-container">
              <div className="form-header">
                <h3 className="form-title">Richiedi la Tua Demo</h3>
                <p className="form-subtitle">Compila il form e sarai contattato entro 24 ore</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="demo-form">
                  <div className="form-row">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="form-group">
                          <FormControl>
                            <Input 
                              placeholder=" " 
                              {...field} 
                              data-testid="input-name"
                              className="form-input"
                            />
                          </FormControl>
                          <FormLabel className="form-label">Nome completo</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="form-group">
                          <FormControl>
                            <Input
                              type="email"
                              placeholder=" "
                              {...field}
                              data-testid="input-email"
                              className="form-input"
                            />
                          </FormControl>
                          <FormLabel className="form-label">Email</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="form-row">
                    <FormField
                      control={form.control}
                      name="cinemaNome"
                      render={({ field }) => (
                        <FormItem className="form-group">
                          <FormControl>
                            <Input
                              placeholder=" "
                              {...field}
                              data-testid="input-cinema-name"
                              className="form-input"
                            />
                          </FormControl>
                          <FormLabel className="form-label">Nome del cinema</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="città"
                      render={({ field }) => (
                        <FormItem className="form-group">
                          <FormControl>
                            <Input 
                              placeholder=" " 
                              {...field} 
                              data-testid="input-city"
                              className="form-input"
                            />
                          </FormControl>
                          <FormLabel className="form-label">Città</FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="form-group">
                        <FormControl>
                          <Textarea
                            placeholder=" "
                            {...field}
                            data-testid="input-message"
                            className="form-textarea"
                          />
                        </FormControl>
                        <FormLabel className="form-label">Messaggio (opzionale)</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    data-testid="button-submit"
                    className="form-submit"
                  >
                    Richiedi Demo Gratuita
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
