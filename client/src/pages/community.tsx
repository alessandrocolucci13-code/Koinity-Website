import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
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
import { Heart, MessageSquare, Share2, Send, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { ambassadorFormSchema, type AmbassadorForm } from "@shared/schema";

export default function Community() {
  const { toast } = useToast();
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateCounters = () => {
      const counters = statsRef.current?.querySelectorAll('.community-stat-number');
      if (!counters) return;

      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        updateCounter();
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScrollIndicatorClick = () => {
      const target = document.querySelector('.community-values');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (scrollIndicatorRef.current) {
      scrollIndicatorRef.current.addEventListener('click', handleScrollIndicatorClick);
      return () => scrollIndicatorRef.current?.removeEventListener('click', handleScrollIndicatorClick);
    }
  }, []);

  const form = useForm<AmbassadorForm>({
    resolver: zodResolver(ambassadorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      città: "",
      motivation: "",
    },
  });

  const onSubmit = (data: AmbassadorForm) => {
    console.log("Ambassador form:", data);
    toast({
      title: "Candidatura inviata!",
      description: "Ti contatteremo presto per discutere della tua candidatura.",
    });
    form.reset();
  };

  return (
    <>
      <SEO
        title="Community & Ambassador"
        description="Unisciti alla community Koinity e diventa un Ambassador nella tua città. Aiutaci a diffondere la cultura cinematografica e porta i film che ami in sala."
      />
      
      <section className="community-hero">
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="community-hero-badge">
          <div className="badge-container">
            <div className="badge-ring"></div>
            <div className="badge-ring"></div>
            <div className="badge-ring"></div>
            <span className="badge-icon">👥</span>
          </div>
        </div>

        <h1 className="community-title" data-testid="text-page-title">Community Koinity</h1>
        <p className="community-subtitle">
          Siamo una community di appassionati di cinema che credono nel potere della 
          scelta collettiva. Insieme, portiamo in sala i film che amiamo.
        </p>

        <div className="community-stats" ref={statsRef}>
          <div className="community-stat-item">
            <span className="community-stat-number" data-target="50">0</span>
            <span className="community-stat-label">Membri</span>
          </div>
          <div className="community-stat-item">
            <span className="community-stat-number" data-target="4">0</span>
            <span className="community-stat-label">Città</span>
          </div>
        </div>

        <div className="scroll-indicator" ref={scrollIndicatorRef}>
          <span className="scroll-indicator-text">Scopri di più</span>
          <div className="scroll-indicator-arrow"></div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="community-values"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold">Passione</h3>
              <p className="text-sm text-muted-foreground">
                Condividi l'amore per il cinema con altri appassionati
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold">Dialogo</h3>
              <p className="text-sm text-muted-foreground">
                Partecipa alle conversazioni e coordina con la community
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate transition-all duration-300">
            <CardContent className="pt-8 pb-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold">Condivisione</h3>
              <p className="text-sm text-muted-foreground">
                Fai scoprire grandi film a nuove persone
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Regole della Community</CardTitle>
            <CardDescription>
              Alcune linee guida per mantenere la community rispettosa e produttiva
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Rispetto reciproco</h4>
                  <p className="text-sm text-muted-foreground">
                    Tratta tutti con rispetto, anche quando le opinioni divergono.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Proposte genuine</h4>
                  <p className="text-sm text-muted-foreground">
                    Proponi film che vorresti davvero vedere, non spam o contenuti inappropriati.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Vota con sincerità</h4>
                  <p className="text-sm text-muted-foreground">
                    Vota solo per i film che sei disposto a vedere in sala.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Condividi e coinvolgi</h4>
                  <p className="text-sm text-muted-foreground">
                    Invita amici che condividono la tua passione per il cinema.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-gradient-to-br from-primary/10 to-primary/5" style={{borderColor: 'hsl(var(--yellow))'}}>
          <CardContent className="pt-8 pb-8">
            <h3 className="font-serif text-2xl font-bold mb-3">Canali Community</h3>
            <p className="text-muted-foreground mb-6">
              Unisciti alle nostre community esterne per rimanere aggiornato e
              partecipare alle discussioni.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://t.me/+9G_y3W8Lt_g4ZTg0" target="_blank" rel="noopener noreferrer">
                <Button data-testid="button-telegram" className="gap-2" style={{backgroundColor: 'hsl(var(--yellow))', color: '#000'}}>
                  <Send className="h-4 w-4" />
                  Telegram
                </Button>
              </a>
              <a href="https://www.instagram.com/koinity/" target="_blank" rel="noopener noreferrer">
                <Button data-testid="button-instagram" className="gap-2" style={{backgroundColor: 'hsl(var(--yellow))', color: '#000'}}>
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Diventa Ambassador</CardTitle>
            <CardDescription>
              Gli ambassador di Koinity aiutano a far crescere la community nella
              propria città, organizzano eventi e coordinano le proiezioni locali.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          placeholder="mario@example.com"
                          {...field}
                          data-testid="input-email"
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

                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perché vuoi diventare ambassador?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Racconta la tua motivazione..."
                          {...field}
                          rows={4}
                          data-testid="input-motivation"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" data-testid="button-submit">
                  Invia candidatura
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
