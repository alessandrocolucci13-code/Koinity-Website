import { type User, type InsertUser, type Proposal, type InsertProposal, type BlogPost, type InsertBlogPost, type DemoRequestRecord, type InsertDemoRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProposals(): Promise<Proposal[]>;
  getProposal(id: string): Promise<Proposal | undefined>;
  getProposalBySlug(slug: string): Promise<Proposal | undefined>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  incrementVotes(id: string): Promise<Proposal | undefined>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  
  submitContactForm(data: any): Promise<void>;
  submitDemoRequest(data: InsertDemoRequest): Promise<DemoRequestRecord>;
  getAllDemoRequests(): Promise<DemoRequestRecord[]>;
  submitAmbassadorForm(data: any): Promise<void>;
  subscribeNewsletter(data: any): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private proposals: Map<string, Proposal>;
  private blogPosts: Map<string, BlogPost>;
  private demoRequests: Map<string, DemoRequestRecord>;

  constructor() {
    this.users = new Map();
    this.proposals = new Map();
    this.blogPosts = new Map();
    this.demoRequests = new Map();
    this.seedData();
  }

  private seedData() {
    const mockProposals: Proposal[] = [
      {
        id: randomUUID(),
        slug: "la-la-land",
        title: "La La Land",
        city: "Milano",
        venueHint: "Cinema Beltrade",
        targetDate: "Marzo 2025",
        votes: 387,
        goal: 500,
        rightsStatus: "known",
        posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
        tags: ["Musical", "Drammatico", "Romance"],
        synopsis: "Un pianista jazz e un'attrice in erba si innamorano mentre lottano per realizzare i loro sogni a Los Angeles.",
        trailer: "https://youtube.com/watch?v=0pdqf4P9MB8",
        duration: "128 min",
        rightsNotes: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: "il-grande-lebowski",
        title: "Il grande Lebowski",
        city: "Roma",
        venueHint: "Cinema Farnese",
        targetDate: "Aprile 2025",
        votes: 245,
        goal: 400,
        rightsStatus: "unknown",
        posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
        tags: ["Commedia", "Classico", "Cult"],
        synopsis: "Un pigro di Los Angeles viene scambiato per un milionario con lo stesso nome e cerca giustizia con l'aiuto dei suoi amici.",
        trailer: null,
        duration: "117 min",
        rightsNotes: "Film classico, necessario contatto con distributore",
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: "2001-odissea-nello-spazio",
        title: "2001: Odissea nello spazio",
        city: "Torino",
        venueHint: null,
        targetDate: "Maggio 2025",
        votes: 412,
        goal: 450,
        rightsStatus: "special",
        posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
        tags: ["Fantascienza", "Classico", "Kubrick"],
        synopsis: "Un viaggio epico attraverso lo spazio e il tempo, esplorando l'evoluzione umana e l'intelligenza artificiale.",
        trailer: null,
        duration: "149 min",
        rightsNotes: "Evento speciale - 70mm",
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: "parasite",
        title: "Parasite",
        city: "Bologna",
        venueHint: "Cinema Lumière",
        targetDate: "Febbraio 2025",
        votes: 156,
        goal: 350,
        rightsStatus: "known",
        posterUrl: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
        tags: ["Thriller", "Drammatico", "Premio Oscar"],
        synopsis: "Una famiglia povera si infiltra in una ricca casa con conseguenze impreviste e drammatiche.",
        trailer: "https://youtube.com/watch?v=5xH0HfJHsaY",
        duration: "132 min",
        rightsNotes: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: "blade-runner-2049",
        title: "Blade Runner 2049",
        city: "Firenze",
        venueHint: "Cinema Odeon",
        targetDate: "Marzo 2025",
        votes: 298,
        goal: 500,
        rightsStatus: "known",
        posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
        tags: ["Fantascienza", "Thriller", "Noir"],
        synopsis: "Un nuovo blade runner scopre un segreto sepolto da tempo che potrebbe scatenare il caos.",
        trailer: null,
        duration: "164 min",
        rightsNotes: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: "caro-diario",
        title: "Caro diario",
        city: "Napoli",
        venueHint: null,
        targetDate: "Giugno 2025",
        votes: 89,
        goal: 300,
        rightsStatus: "unknown",
        posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
        tags: ["Commedia", "Drammatico", "Italiano"],
        synopsis: "Tre episodi della vita di Nanni Moretti: in Vespa per Roma, alle isole Eolie, e la lotta contro una malattia.",
        trailer: null,
        duration: "100 min",
        rightsNotes: "Cinema italiano classico",
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: "la-forma-dellacqua",
        title: "La forma dell'acqua",
        city: "Milano",
        venueHint: "Anteo Palazzo del Cinema",
        targetDate: "Aprile 2025",
        votes: 467,
        goal: 500,
        rightsStatus: "known",
        posterUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
        tags: ["Fantasy", "Romance", "Premio Oscar"],
        synopsis: "Una donna muta lavora in un laboratorio governativo e si innamora di una creatura anfibia tenuta prigioniera.",
        trailer: null,
        duration: "123 min",
        rightsNotes: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        slug: "whiplash",
        title: "Whiplash",
        city: "Roma",
        venueHint: null,
        targetDate: "Marzo 2025",
        votes: 334,
        goal: 450,
        rightsStatus: "known",
        posterUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=600&fit=crop",
        tags: ["Drammatico", "Musical"],
        synopsis: "Un giovane batterista jazz ambizioso viene spinto ai suoi limiti da un istruttore spietato.",
        trailer: "https://youtube.com/watch?v=7d_jQycdQGo",
        duration: "106 min",
        rightsNotes: null,
        createdAt: new Date().toISOString(),
      },
    ];

    mockProposals.forEach((proposal) => {
      this.proposals.set(proposal.id, proposal);
    });

    const mockBlogPosts: BlogPost[] = [
      {
        id: randomUUID(),
        slug: "benvenuti-su-koinity",
        title: "Benvenuti su Koinity: Il cinema lo scegli tu",
        excerpt: "Scopri come Koinity sta rivoluzionando il modo in cui vediamo i film in sala, restituendo il potere di scelta alla community.",
        content: `Siamo entusiasti di presentare Koinity, la piattaforma che permette agli appassionati di cinema di votare e portare in sala i film che desiderano vedere.\n\nNon si tratta solo di ottenere sconti—anche se quelli aiutano—ma di creare una vera democrazia cinematografica. Troppi film straordinari non raggiungono mai le sale italiane, o vengono proiettati solo in poche città selezionate.\n\nCon Koinity, ogni film può trovare il suo pubblico. Proponi, vota, e quando raggiungiamo la soglia, coordiniamo la proiezione con i cinema locali.\n\nUnisciti a noi in questa avventura cinematografica!`,
        imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: randomUUID(),
        slug: "come-funziona-il-sistema-di-voto",
        title: "Come funziona il sistema di voto di Koinity",
        excerpt: "Una guida completa su come votare, pre-prenotare e sbloccare sconti sulla nostra piattaforma.",
        content: `Il sistema di voto di Koinity è progettato per essere semplice ma potente.\n\nQuando voti per un film, stai esprimendo interesse genuino nel vederlo in sala. Non è un sondaggio astratto—è un impegno reale.\n\nMan mano che i voti aumentano, si sbloccano livelli di sconto progressivi:\n- 25% della soglia: 5% di sconto\n- 50% della soglia: 10% di sconto\n- 75% della soglia: 15% di sconto\n- 100% della soglia: Proiezione confermata!\n\nUna volta raggiunta la soglia, coordinamo con il cinema locale per fissare data e orario, e tutti i votanti ricevono notifica per acquistare i biglietti.\n\nSemplice, trasparente, democratico.`,
        imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=450&fit=crop",
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: randomUUID(),
        slug: "primi-successi-milano-roma",
        title: "I primi successi: Milano e Roma abbracciano Koinity",
        excerpt: "Le prime proiezioni confermate a Milano e Roma dimostrano il potere della community cinematografica italiana.",
        content: `Siamo felici di annunciare che le prime proiezioni organizzate tramite Koinity sono state un successo straordinario!\n\nA Milano, "La La Land" ha raggiunto quota 387 voti in meno di tre settimane, superando ampiamente la soglia di 500 grazie al Cinema Beltrade. La serata è stata magica, con oltre 400 spettatori che hanno riempito la sala.\n\nA Roma, "Il grande Lebowski" sta raggiungendo rapidamente l'obiettivo al Cinema Farnese, con 245 pre-prenotazioni e crescita costante.\n\nQuesti risultati dimostrano che c'è fame di cinema di qualità, e che la community ha il potere di portarlo nelle sale.\n\nGrazie a tutti coloro che stanno rendendo possibile questa rivoluzione cinematografica!`,
        imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop",
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    mockBlogPosts.forEach((post) => {
      this.blogPosts.set(post.id, post);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProposals(): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProposal(id: string): Promise<Proposal | undefined> {
    return this.proposals.get(id);
  }

  async getProposalBySlug(slug: string): Promise<Proposal | undefined> {
    return Array.from(this.proposals.values()).find(
      (proposal) => proposal.slug === slug
    );
  }

  async createProposal(insertProposal: InsertProposal): Promise<Proposal> {
    const id = randomUUID();
    const proposal: Proposal = {
      ...insertProposal,
      id,
      votes: 0,
      createdAt: new Date().toISOString(),
    };
    this.proposals.set(id, proposal);
    return proposal;
  }

  async incrementVotes(id: string): Promise<Proposal | undefined> {
    const proposal = this.proposals.get(id);
    if (!proposal) return undefined;

    const updated: Proposal = {
      ...proposal,
      votes: proposal.votes + 1,
    };
    this.proposals.set(id, updated);
    return updated;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }

  async submitContactForm(data: any): Promise<void> {
    console.log("Contact form submission:", data);
  }

  async submitDemoRequest(data: InsertDemoRequest): Promise<DemoRequestRecord> {
    const id = randomUUID();
    const record: DemoRequestRecord = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    };
    this.demoRequests.set(id, record);
    console.log("Demo request saved:", record);
    return record;
  }

  async getAllDemoRequests(): Promise<DemoRequestRecord[]> {
    return Array.from(this.demoRequests.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async submitAmbassadorForm(data: any): Promise<void> {
    console.log("Ambassador form submission:", data);
  }

  async subscribeNewsletter(data: any): Promise<void> {
    console.log("Newsletter subscription:", data);
  }
}

export const storage = new MemStorage();
