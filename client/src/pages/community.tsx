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
            <span className="community-stat-number" data-target="70">0</span>
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

      <section className="community-values">
        <div className="values-grid">
          <div className="value-card passion">
            <div className="value-card-content">
              <div className="value-icon">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="value-title">Passione</h3>
              <p className="value-description">
                Condividi l'amore per il cinema con altri appassionati
              </p>
            </div>
          </div>

          <div className="value-card dialogue">
            <div className="value-card-content">
              <div className="value-icon">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="value-title">Dialogo</h3>
              <p className="value-description">
                Partecipa alle conversazioni e coordina con la community
              </p>
            </div>
          </div>

          <div className="value-card sharing">
            <div className="value-card-content">
              <div className="value-icon">
                <Share2 className="h-8 w-8" />
              </div>
              <h3 className="value-title">Condivisione</h3>
              <p className="value-description">
                Fai scoprire grandi film a nuove persone
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">

      </div>
      </div>

      <section className="community-rules">
        <div className="rules-header">
          <h2 className="rules-title">Regole della Community</h2>
          <p className="rules-subtitle">
            Alcune linee guida per mantenere la community rispettosa e produttiva
          </p>
        </div>

        <div className="rules-list">
          <div className="rule-item">
            <div className="rule-number">1</div>
            <div className="rule-content">
              <h3 className="rule-title">Rispetto reciproco</h3>
              <p className="rule-description">
                Tratta tutti con rispetto, anche quando le opinioni divergono. 
                Nessuna forma di discriminazione o linguaggio offensivo è tollerata.
              </p>
            </div>
          </div>

          <div className="rule-item">
            <div className="rule-number">2</div>
            <div className="rule-content">
              <h3 className="rule-title">Proposte genuine</h3>
              <p className="rule-description">
                Proponi film che vorresti davvero vedere, non spam o contenuti inappropriati. 
                La community si basa sulla passione autentica per il cinema.
              </p>
            </div>
          </div>

          <div className="rule-item">
            <div className="rule-number">3</div>
            <div className="rule-content">
              <h3 className="rule-title">Vota con sincerità</h3>
              <p className="rule-description">
                Vota solo per i film che sei disposto a vedere in sala. 
                La tua partecipazione attiva rende possibile l'esperienza cinematografica.
              </p>
            </div>
          </div>

          <div className="rule-item">
            <div className="rule-number">4</div>
            <div className="rule-content">
              <h3 className="rule-title">Condividi e coinvolgi</h3>
              <p className="rule-description">
                Invita amici che condividono la tua passione per il cinema. 
                Più siamo, più film straordinari porteremo nelle nostre sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">

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
