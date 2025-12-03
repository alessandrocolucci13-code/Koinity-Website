import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/seo";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  const categories = [
    { id: "all", label: "Tutti", icon: "📚" },
    { id: "cinema", label: "Cinema", icon: "🎬" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "updates", label: "Novità", icon: "🚀" },
    { id: "guides", label: "Guide", icon: "💡" },
  ];

  return (
    <>
      <SEO
        title="Blog & Aggiornamenti"
        description="Novità, approfondimenti e storie dalla community Koinity. Scopri le ultime notizie sul cinema on-demand e le storie dei nostri membri."
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background py-20 md:py-32">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 107, 53, 0.1) 10px, rgba(255, 107, 53, 0.1) 11px)'
          }}>
        </div>

        {/* Gradient orb */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full backdrop-blur-sm">
              <span>🔥</span>
              <span className="text-sm font-bold uppercase tracking-wider text-primary">Sempre Aggiornato</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-6xl font-black text-foreground mb-6">
              Blog &{' '}
              <span className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                Aggiornamenti
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
              Novità, approfondimenti e storie dalla community Koinity. 
              Resta aggiornato sul mondo del cinema on-demand.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 md:gap-12 my-12 p-8 bg-gradient-to-r from-foreground/5 to-primary/5 border border-primary/20 rounded-2xl backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                  {posts?.length || "50"}+
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2 font-semibold">
                  Articoli
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                  12K+
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2 font-semibold">
                  Lettori/Mese
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-primary">
                  Settimanale
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2 font-semibold">
                  Frequenza
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-primary to-yellow-400 text-background"
                      : "bg-foreground/5 border border-foreground/15 text-foreground hover:bg-foreground/10 hover:border-primary/30"
                  }`}
                  data-testid={`filter-${category.id}`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                className="w-full px-6 py-3 pr-14 bg-foreground/5 border border-foreground/15 rounded-lg text-foreground placeholder-foreground/50 focus:outline-none focus:border-primary focus:bg-foreground/10 transition-all"
                placeholder="Cerca articoli..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                data-testid="button-search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG POSTS SECTION */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="aspect-[16/9] w-full" />
                    <CardContent className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card
                      className="overflow-hidden hover-elevate transition-all duration-300 h-full flex flex-col cursor-pointer"
                      data-testid={`card-blog-${post.id}`}
                    >
                      {post.imageUrl && (
                        <div className="aspect-[16/9] overflow-hidden bg-muted">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h2
                          className="font-serif text-2xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors"
                          data-testid={`text-title-${post.id}`}
                        >
                          {post.title}
                        </h2>
                        <p
                          className="text-muted-foreground mb-4 line-clamp-3 flex-1"
                          data-testid={`text-excerpt-${post.id}`}
                        >
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span data-testid={`text-date-${post.id}`}>
                            {new Date(post.publishedAt).toLocaleDateString("it-IT", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="text-center p-12">
                <p className="text-muted-foreground">
                  {searchQuery ? "Nessun articolo trovato per questa ricerca." : "Nessun articolo pubblicato ancora. Torna presto!"}
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
