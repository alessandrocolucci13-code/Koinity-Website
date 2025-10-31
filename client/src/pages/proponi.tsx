import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { insertProposalSchema, type InsertProposal } from "@shared/schema";
import { SEO } from "@/components/seo";
import { Film } from "lucide-react";
import { z } from "zod";

const proposalFormSchema = insertProposalSchema.extend({
  trailer: z.string().url("Inserisci un URL valido").optional().or(z.literal("")),
  venueHint: z.string().optional(),
  targetDate: z.string().optional(),
  duration: z.string().optional(),
  synopsis: z.string().optional(),
  rightsNotes: z.string().optional(),
  posterUrl: z.string().url("Inserisci un URL valido").optional().or(z.literal("")),
  tagsInput: z.string().optional(),
});

type ProposalFormData = z.infer<typeof proposalFormSchema>;

export default function Proponi() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      city: "",
      venueHint: "",
      targetDate: "",
      duration: "",
      synopsis: "",
      trailer: "",
      rightsNotes: "",
      posterUrl: "",
      rightsStatus: "unknown",
      goal: 500,
      tagsInput: "",
    },
  });

  const createProposalMutation = useMutation({
    mutationFn: async (data: InsertProposal) => {
      return await apiRequest("POST", "/api/proposals", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/proposals"] });
      toast({
        title: "Proposta inviata con successo!",
        description: "La tua proposta è ora visibile alla community.",
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

  const onSubmit = (data: ProposalFormData) => {
    const tags = data.tagsInput
      ? data.tagsInput.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const proposalData: InsertProposal = {
      ...data,
      slug,
      tags,
      trailer: data.trailer || undefined,
      venueHint: data.venueHint || undefined,
      targetDate: data.targetDate || undefined,
      duration: data.duration || undefined,
      synopsis: data.synopsis || undefined,
      rightsNotes: data.rightsNotes || undefined,
      posterUrl: data.posterUrl || undefined,
    };

    createProposalMutation.mutate(proposalData);
  };

  return (
    <>
      <SEO
        title="Proponi un Film"
        description="Segnala un film che vorresti vedere in sala. Compila il modulo con i dettagli e, se raggiungeremo la soglia di voti, organizzeremo una proiezione nella tua città."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Film className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-4xl font-bold mb-4" data-testid="text-page-title">
            Proponi un Film
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Segnala un film che vorresti vedere in sala. Se raggiungeremo la
            soglia di voti, organizzeremo una proiezione nella tua città.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dettagli della proposta</CardTitle>
            <CardDescription>
              Compila il modulo con le informazioni del film che vorresti
              portare in sala.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titolo del film *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="es. La La Land"
                          {...field}
                          data-testid="input-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="synopsis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sinossi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Breve descrizione del film..."
                          {...field}
                          data-testid="input-synopsis"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Città *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="es. Milano"
                            {...field}
                            data-testid="input-city"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="venueHint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cinema preferito</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="es. Cinema Beltrade"
                            {...field}
                            data-testid="input-venue"
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Opzionale
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="targetDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data target</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="es. Marzo 2025"
                            {...field}
                            data-testid="input-date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durata</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="es. 128 min"
                            {...field}
                            data-testid="input-duration"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="trailer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Trailer</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://youtube.com/..."
                          {...field}
                          data-testid="input-trailer"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="posterUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Locandina</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://..."
                          {...field}
                          data-testid="input-poster"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Link a un'immagine della locandina del film
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rightsStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stato diritti</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-rights-status">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="unknown">
                            Non in distribuzione / Sconosciuto
                          </SelectItem>
                          <SelectItem value="known">
                            In distribuzione
                          </SelectItem>
                          <SelectItem value="special">
                            Evento speciale
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rightsNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note sui diritti</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Eventuali informazioni aggiuntive sui diritti di distribuzione..."
                          {...field}
                          data-testid="input-rights-notes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tagsInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Generi / Tag</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="es. Drammatico, Musical, Romance (separati da virgola)"
                          {...field}
                          data-testid="input-tags"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Inserisci i generi separati da virgola
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soglia voti target</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          data-testid="input-goal"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Numero di voti necessari per confermare la proiezione
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={createProposalMutation.isPending}
                  data-testid="button-submit-proposal"
                >
                  {createProposalMutation.isPending
                    ? "Invio in corso..."
                    : "Invia proposta"}
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
