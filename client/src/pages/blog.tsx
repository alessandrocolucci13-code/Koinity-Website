import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/seo";
import { useState } from "react";
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
      <section className="blog-hero">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-icon">🔥</span>
            <span>Sempre Aggiornato</span>
          </div>

          {/* Title */}
          <h1 className="blog-title">
            Blog & <span className="highlight">Aggiornamenti</span>
          </h1>

          {/* Subtitle */}
          <p className="blog-subtitle">
            Novità, approfondimenti e storie dalla community Koinity. 
            Resta aggiornato sul mondo del cinema on-demand.
          </p>

          {/* Stats */}
          <div className="blog-stats">
            <div className="stat-item">
              <span className="stat-number">{posts?.length || "50"}+</span>
              <span className="stat-label">Articoli</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12K+</span>
              <span className="stat-label">Lettori/Mese</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Settimanale</span>
              <span className="stat-label">Frequenza</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-tab ${selectedCategory === category.id ? "active" : ""}`}
                data-testid={`filter-${category.id}`}
              >
                <span className="filter-icon">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="blog-search">
            <input
              type="text"
              className="search-input"
              placeholder="Cerca articoli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
            <button className="search-button" data-testid="button-search">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span className="scroll-text">Scopri</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* BLOG POSTS SECTION */}
      <section className="blog-posts-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                      className="overflow-hidden hover-elevate transition-all duration-300 h-full flex flex-col"
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
