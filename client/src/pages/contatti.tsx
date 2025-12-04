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
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { contactFormSchema, type ContactForm } from "@shared/schema";
import { Link } from "wouter";
import { Mail, MapPin, MessageCircle, Zap, CheckCircle, Star } from "lucide-react";

export default function Contatti() {
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form:", data);
    toast({
      title: "Messaggio inviato!",
      description: "Ti risponderemo al più presto.",
    });
    form.reset();
  };

  return (
    <>
      <SEO
        title="Contatti"
        description="Hai domande su Koinity? Contattaci e saremo felici di aiutarti. Trova i nostri recapiti e compila il modulo di contatto."
      />
      
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="hero-content">
          <div className="hero-badge" data-testid="badge-support">
            <span className="badge-icon"></span>
            <span>Supporto Attivo</span>
          </div>

          <h1 className="contact-title" data-testid="text-page-title">
            Contatti
          </h1>

          <p className="contact-subtitle">
            Hai domande o suggerimenti? Siamo qui per aiutarti.
          </p>

          <div className="contact-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <Zap className="w-6 h-6 text-[#FFD600]" />
              </div>
              <span className="stat-value" data-testid="text-response-time">&lt; 24h</span>
              <span className="stat-label">Tempo risposta</span>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Mail className="w-6 h-6 text-[#FFD600]" />
              </div>
              <span className="stat-value" data-testid="text-email-response">100%</span>
              <span className="stat-label">Email risposte</span>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Star className="w-6 h-6 text-[#FFD600]" />
              </div>
              <span className="stat-value" data-testid="text-satisfaction">4.8/5</span>
              <span className="stat-label">Soddisfazione</span>
            </div>
          </div>

          <div className="trust-indicators">
            <div className="trust-item">
              <CheckCircle className="w-4 h-4 text-[#22C55E]" />
              <span>Supporto in italiano</span>
            </div>
            <div className="trust-item">
              <CheckCircle className="w-4 h-4 text-[#22C55E]" />
              <span>Team dedicato</span>
            </div>
            <div className="trust-item">
              <CheckCircle className="w-4 h-4 text-[#22C55E]" />
              <span>Risposta garantita</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO CARDS */}
      <section className="quick-info-section">
        <div className="quick-info-grid">
          <div className="info-card" data-testid="card-email">
            <div className="info-icon-wrapper">
              <Mail className="w-6 h-6 text-[#FFD600]" />
            </div>
            <div className="info-content">
              <h3 className="info-title">Email</h3>
              <p className="info-value">
                <a href="mailto:info@koinity.it">info@koinity.it</a>
              </p>
              <p className="info-note">Per la stampa: press@koinity.it</p>
            </div>
          </div>

          <div className="info-card" data-testid="card-sede">
            <div className="info-icon-wrapper">
              <MapPin className="w-6 h-6 text-[#FFD600]" />
            </div>
            <div className="info-content">
              <h3 className="info-title">Sede</h3>
              <p className="info-value">Milano, Italia</p>
              <p className="info-note">Operativi in tutta Italia</p>
            </div>
          </div>

          <div className="info-card" data-testid="card-support">
            <div className="info-icon-wrapper">
              <MessageCircle className="w-6 h-6 text-[#FFD600]" />
            </div>
            <div className="info-content">
              <h3 className="info-title">Supporto</h3>
              <p className="info-value">Disponibile via email</p>
              <p className="info-note">Rispondiamo entro 24 ore</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="form-section">
        <div className="form-header">
          <h2 className="form-title">Invia un messaggio</h2>
          <p className="form-subtitle">
            Compila il modulo e ti risponderemo il prima possibile.
          </p>
        </div>

        <div className="contact-form-container">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="contact-form">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="form-group">
                    <FormLabel className="form-label-inline">Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mario Rossi"
                        className="form-input"
                        {...field}
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-group">
                    <FormLabel className="form-label-inline">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="mario@example.com"
                        className="form-input"
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
                name="message"
                render={({ field }) => (
                  <FormItem className="form-group">
                    <FormLabel className="form-label-inline">Messaggio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Come possiamo aiutarti?"
                        className="form-textarea"
                        rows={6}
                        {...field}
                        data-testid="input-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="form-submit" data-testid="button-submit">
                Invia messaggio
              </Button>

              <p className="form-privacy">
                Inviando questo modulo accetti la nostra{" "}
                <Link href="/privacy">Privacy Policy</Link> e i nostri{" "}
                <Link href="/termini">Termini di Servizio</Link>.
              </p>
            </form>
          </Form>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <div className="map-header">
          <h2 className="map-title">Dove siamo</h2>
          <p className="map-subtitle">La nostra sede si trova nel cuore di Milano</p>
        </div>
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-placeholder-icon">
              <MapPin className="w-12 h-12 text-[#FFD600]" />
            </div>
            <p className="map-placeholder-text">Milano, Italia</p>
          </div>
        </div>
      </section>
    </>
  );
}
