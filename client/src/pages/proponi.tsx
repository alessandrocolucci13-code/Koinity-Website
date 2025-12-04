import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { insertProposalSchema, type InsertProposal } from "@shared/schema";
import { SEO } from "@/components/seo";
import { Film, Link2, Lightbulb, ArrowRight, Check, AlertCircle } from "lucide-react";
import { z } from "zod";

const proposalFormSchema = insertProposalSchema.extend({
  trailer: z.string().url("Inserisci un URL valido").optional().or(z.literal("")),
  venueHint: z.string().optional(),
  targetDate: z.string().optional(),
  duration: z.string().optional(),
  synopsis: z.string().max(500, "Massimo 500 caratteri").optional(),
  rightsNotes: z.string().optional(),
  posterUrl: z.string().url("Inserisci un URL valido").optional().or(z.literal("")),
  tagsInput: z.string().optional(),
});

type ProposalFormData = z.infer<typeof proposalFormSchema>;

export default function Proponi() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [synopsisLength, setSynopsisLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const watchedFields = form.watch();

  useEffect(() => {
    const requiredFields = ['title', 'city', 'rightsStatus'];
    let filled = 0;
    
    if (watchedFields.title?.trim()) filled++;
    if (watchedFields.city?.trim()) filled++;
    if (watchedFields.rightsStatus) filled++;
    
    const percentage = Math.round((filled / requiredFields.length) * 100);
    setProgress(percentage);
  }, [watchedFields.title, watchedFields.city, watchedFields.rightsStatus]);

  const createProposalMutation = useMutation({
    mutationFn: async (data: InsertProposal) => {
      return await apiRequest("POST", "/api/proposals", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/proposals"] });
      setShowSuccess(true);
      toast({
        title: "Proposta inviata con successo!",
        description: "La tua proposta è ora visibile alla community.",
      });
      form.reset();
      setProgress(0);
      setSynopsisLength(0);
      
      setTimeout(() => setShowSuccess(false), 5000);
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

  const getCharCounterClass = () => {
    if (synopsisLength > 450) return "propose-char-counter danger";
    if (synopsisLength > 400) return "propose-char-counter warning";
    return "propose-char-counter";
  };

  return (
    <>
      <SEO
        title="Proponi un Film"
        description="Segnala un film che vorresti vedere in sala. Compila il modulo con i dettagli e, se raggiungeremo la soglia di voti, organizzeremo una proiezione nella tua città."
      />
      
      <div className="propose-page">
        {/* Hero Section */}
        <section className="propose-hero">
          <div className="propose-hero-badge">
            <Film className="w-5 h-5" />
            <span>Proponi Film</span>
          </div>
          <h1 className="propose-title" data-testid="text-page-title">
            Proponi un Film
          </h1>
          <p className="propose-subtitle">
            Segnala un film che vorresti vedere in sala. Se raggiungeremo 
            la soglia di voti, organizzeremo una proiezione nella tua città.
          </p>
        </section>

        {/* Form Section */}
        <section className="propose-form-section">
          <div className="propose-form-container">
            
            {/* Progress Indicator */}
            <div className="propose-progress">
              <div className="propose-progress-bar">
                <div 
                  className="propose-progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="propose-progress-text">{progress}% completato</span>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="propose-message success show">
                <Check className="propose-message-icon" />
                <div>
                  <strong>Proposta inviata!</strong>
                  <span className="propose-message-sub">Ti avviseremo quando raggiungeremo la soglia di voti.</span>
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                
                {/* Section: Dettagli Film */}
                <div className="propose-section-header">
                  <h2 className="propose-section-title">
                    <span className="propose-section-icon">
                      <Film className="w-5 h-5" />
                    </span>
                    Dettagli del film
                  </h2>
                  <p className="propose-section-description">
                    Compila il modulo con le informazioni del film che vorresti portare in sala.
                  </p>
                </div>

                {/* Titolo */}
                <div className="propose-form-group">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="propose-form-item">
                        <FormControl>
                          <Input
                            placeholder=" "
                            className="propose-input"
                            {...field}
                            data-testid="input-title"
                          />
                        </FormControl>
                        <label className="propose-floating-label">
                          Titolo del film <span className="propose-required">*</span>
                        </label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="propose-helper">
                    <Lightbulb className="propose-helper-icon" />
                    <span>es. La La Land</span>
                  </div>
                </div>

                {/* Sinossi */}
                <div className="propose-form-group propose-textarea-group">
                  <FormField
                    control={form.control}
                    name="synopsis"
                    render={({ field }) => (
                      <FormItem className="propose-form-item">
                        <FormControl>
                          <Textarea
                            placeholder=" "
                            className="propose-textarea"
                            maxLength={500}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setSynopsisLength(e.target.value.length);
                            }}
                            data-testid="input-synopsis"
                          />
                        </FormControl>
                        <label className="propose-floating-label">Sinossi</label>
                        <span className={getCharCounterClass()}>{synopsisLength}/500</span>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="propose-helper">
                    <Lightbulb className="propose-helper-icon" />
                    <span>Breve descrizione del film</span>
                  </div>
                </div>

                {/* Row: Città + Cinema */}
                <div className="propose-form-row">
                  <div className="propose-form-group">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="propose-form-item">
                          <FormControl>
                            <Input
                              placeholder=" "
                              className="propose-input"
                              {...field}
                              data-testid="input-city"
                            />
                          </FormControl>
                          <label className="propose-floating-label">
                            Città <span className="propose-required">*</span>
                          </label>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="propose-helper">
                      <Lightbulb className="propose-helper-icon" />
                      <span>es. Milano</span>
                    </div>
                  </div>

                  <div className="propose-form-group">
                    <FormField
                      control={form.control}
                      name="venueHint"
                      render={({ field }) => (
                        <FormItem className="propose-form-item">
                          <FormControl>
                            <Input
                              placeholder=" "
                              className="propose-input"
                              {...field}
                              data-testid="input-venue"
                            />
                          </FormControl>
                          <label className="propose-floating-label">Cinema preferito</label>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="propose-helper">
                      <Lightbulb className="propose-helper-icon" />
                      <span>Opzionale: es. Cinema Beltrade</span>
                    </div>
                  </div>
                </div>

                {/* Row: Data target + Durata */}
                <div className="propose-form-row">
                  <div className="propose-form-group">
                    <FormField
                      control={form.control}
                      name="targetDate"
                      render={({ field }) => (
                        <FormItem className="propose-form-item">
                          <FormControl>
                            <Input
                              placeholder=" "
                              className="propose-input"
                              {...field}
                              data-testid="input-date"
                            />
                          </FormControl>
                          <label className="propose-floating-label">Data target</label>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="propose-helper">
                      <Lightbulb className="propose-helper-icon" />
                      <span>es. Marzo 2025</span>
                    </div>
                  </div>

                  <div className="propose-form-group">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="propose-form-item">
                          <FormControl>
                            <Input
                              placeholder=" "
                              className="propose-input"
                              {...field}
                              data-testid="input-duration"
                            />
                          </FormControl>
                          <label className="propose-floating-label">Durata</label>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="propose-helper">
                      <Lightbulb className="propose-helper-icon" />
                      <span>es. 128 min</span>
                    </div>
                  </div>
                </div>

                {/* Section: Link e Informazioni */}
                <div className="propose-section-header propose-section-spacing">
                  <h2 className="propose-section-title">
                    <span className="propose-section-icon">
                      <Link2 className="w-5 h-5" />
                    </span>
                    Link e informazioni
                  </h2>
                </div>

                {/* Link Trailer */}
                <div className="propose-form-group">
                  <FormField
                    control={form.control}
                    name="trailer"
                    render={({ field }) => (
                      <FormItem className="propose-form-item">
                        <FormControl>
                          <Input
                            type="url"
                            placeholder=" "
                            className="propose-input"
                            {...field}
                            data-testid="input-trailer"
                          />
                        </FormControl>
                        <label className="propose-floating-label">Link Trailer</label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="propose-helper">
                    <Lightbulb className="propose-helper-icon" />
                    <span>https://youtube.com/...</span>
                  </div>
                </div>

                {/* URL Locandina */}
                <div className="propose-form-group">
                  <FormField
                    control={form.control}
                    name="posterUrl"
                    render={({ field }) => (
                      <FormItem className="propose-form-item">
                        <FormControl>
                          <Input
                            type="url"
                            placeholder=" "
                            className="propose-input"
                            {...field}
                            data-testid="input-poster"
                          />
                        </FormControl>
                        <label className="propose-floating-label">URL Locandina</label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="propose-helper">
                    <Lightbulb className="propose-helper-icon" />
                    <span>Link a un'immagine della locandina del film</span>
                  </div>
                </div>

                {/* Stato diritti */}
                <div className="propose-form-group">
                  <FormField
                    control={form.control}
                    name="rightsStatus"
                    render={({ field }) => (
                      <FormItem className="propose-form-item propose-select-item">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger 
                              className="propose-select"
                              data-testid="select-rights-status"
                            >
                              <SelectValue placeholder="Seleziona stato diritti" />
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
                        <label className="propose-floating-label propose-select-label">
                          Stato diritti <span className="propose-required">*</span>
                        </label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Note sui diritti */}
                <div className="propose-form-group">
                  <FormField
                    control={form.control}
                    name="rightsNotes"
                    render={({ field }) => (
                      <FormItem className="propose-form-item">
                        <FormControl>
                          <Textarea
                            placeholder=" "
                            className="propose-textarea propose-textarea-small"
                            {...field}
                            data-testid="input-rights-notes"
                          />
                        </FormControl>
                        <label className="propose-floating-label">Note sui diritti</label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="propose-helper">
                    <Lightbulb className="propose-helper-icon" />
                    <span>Eventuali informazioni aggiuntive sui diritti di distribuzione</span>
                  </div>
                </div>

                {/* Generi / Tag */}
                <div className="propose-form-group">
                  <FormField
                    control={form.control}
                    name="tagsInput"
                    render={({ field }) => (
                      <FormItem className="propose-form-item">
                        <FormControl>
                          <Input
                            placeholder=" "
                            className="propose-input"
                            {...field}
                            data-testid="input-tags"
                          />
                        </FormControl>
                        <label className="propose-floating-label">Generi / Tag</label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="propose-helper">
                    <Lightbulb className="propose-helper-icon" />
                    <span>es. Drammatico, Musical, Romance (separati da virgola)</span>
                  </div>
                </div>

                {/* Soglia voti target */}
                <div className="propose-form-group">
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem className="propose-form-item">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder=" "
                            className="propose-input"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            data-testid="input-goal"
                          />
                        </FormControl>
                        <label className="propose-floating-label">Soglia voti target</label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="propose-helper">
                    <Lightbulb className="propose-helper-icon" />
                    <span>Numero di voti necessari per confermare la proiezione</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`propose-submit ${createProposalMutation.isPending ? 'loading' : ''}`}
                  disabled={createProposalMutation.isPending}
                  data-testid="button-submit-proposal"
                >
                  <span>{createProposalMutation.isPending ? "Invio in corso..." : "Invia proposta"}</span>
                  {!createProposalMutation.isPending && <ArrowRight className="propose-submit-icon" />}
                </button>

              </form>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
}
