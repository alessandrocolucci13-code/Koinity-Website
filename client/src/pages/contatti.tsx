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
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/seo";
import { contactFormSchema, type ContactForm } from "@shared/schema";

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
          {/* Badge Online/Available */}
          <div className="hero-badge" data-testid="badge-support">
            <span className="badge-icon"></span>
            <span>Supporto Attivo</span>
          </div>

          {/* Title */}
          <h1 className="contact-title" data-testid="text-page-title">
            Contatti
          </h1>

          {/* Subtitle */}
          <p className="contact-subtitle">
            Hai domande o suggerimenti? Siamo qui per aiutarti.
          </p>

          {/* Quick Stats */}
          <div className="contact-stats">
            <div className="stat-item">
              <div className="stat-icon">⚡</div>
              <span className="stat-value" data-testid="text-response-time">&lt; 24h</span>
              <span className="stat-label">Tempo risposta</span>
            </div>

            <div className="stat-item">
              <div className="stat-icon">📧</div>
              <span className="stat-value" data-testid="text-email-response">100%</span>
              <span className="stat-label">Email risposte</span>
            </div>

            <div className="stat-item">
              <div className="stat-icon">😊</div>
              <span className="stat-value" data-testid="text-satisfaction">4.8/5</span>
              <span className="stat-label">Soddisfazione</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Supporto in italiano</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Team dedicato</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Risposta garantita</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Invia un messaggio</CardTitle>
                <CardDescription>
                  Compila il modulo e ti risponderemo il prima possibile.
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
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Mario Rossi"
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
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Messaggio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Come possiamo aiutarti?"
                              {...field}
                              rows={6}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" data-testid="button-submit">
                      Invia messaggio
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      info@koinity.it
                    </p>
                    <p className="text-sm text-muted-foreground">
                      press@koinity.it (per la stampa)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Sede</h3>
                    <p className="text-sm text-muted-foreground">
                      Milano, Italia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Supporto</h3>
                    <p className="text-sm text-muted-foreground">
                      Disponibile via email
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Mappa</h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    Mappa interattiva disponibile a breve
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
