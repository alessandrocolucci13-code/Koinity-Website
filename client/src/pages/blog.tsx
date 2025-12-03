import { Link } from "wouter";
import { Calendar, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/seo";
import type { BlogPost } from "@shared/schema";
import { useState } from "react";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "Tutti", icon: "📚" },
    { id: "cinema", label: "Cinema", icon: "🎬" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "novita", label: "Novità", icon: "🚀" },
    { id: "guide", label: "Guide", icon: "💡" },
  ];

  const filteredPosts = posts?.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const getCategoryBadge = (category?: string) => {
    const categoryMap: Record<string, string> = {
      cinema: "🎬 Cinema",
      community: "👥 Community",
      novita: "🚀 Novità",
      guide: "💡 Guide",
    };
    return categoryMap[category || "cinema"] || "📚 Blog";
  };

  const estimateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

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

          {/* Category Filters */}
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`filter-tab ${selectedCategory === category.id ? "active" : ""}`}
                data-testid={`button-filter-${category.id}`}
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
              🔍
            </button>
          </div>

          {/* Newsletter CTA */}
          <a href="#newsletter" className="hero-newsletter">
            <span className="newsletter-icon">📧</span>
            <span>Iscriviti alla newsletter settimanale</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" data-testid="scroll-indicator">
          <span className="scroll-text">Scopri</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* BLOG POSTS SECTION */}
      <section className="blog-posts-section" id="blog-posts-section">
        <div className="section-header">
          <h2 className="section-title">Ultimi Articoli</h2>
          <p className="section-subtitle">
            Scopri le ultime novità dal mondo Koinity
          </p>
        </div>

        {isLoading ? (
          <div className="blog-posts-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="blog-card-skeleton" data-testid={`skeleton-${i}`}></div>
            ))}
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <div className="blog-posts-grid">
            {filteredPosts.map((post) => {
              const readTime = estimateReadTime(post.excerpt);
              return (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article 
                    className="blog-card"
                    data-testid={`card-blog-${post.id}`}
                  >
                    
                    <div className="blog-image-container">
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="blog-image"
                        />
                      )}
                      <div className="blog-image-overlay"></div>
                      <span className="blog-category-badge">
                        {getCategoryBadge(post.category)}
                      </span>
                    </div>
                    
                    <div className="blog-content">
                      <h3 className="blog-card-title" data-testid={`text-title-${post.id}`}>
                        {post.title}
                      </h3>
                      <p className="blog-description" data-testid={`text-excerpt-${post.id}`}>
                        {post.excerpt}
                      </p>
                      
                      <div className="blog-footer">
                        <div className="blog-date">
                          <span className="date-icon">📅</span>
                          <span data-testid={`text-date-${post.id}`}>
                            {new Date(post.publishedAt).toLocaleDateString("it-IT", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="blog-read-time">
                          <span className="read-icon">⏱️</span>
                          <span>{readTime} min</span>
                        </div>
                      </div>
                      
                      <a href={`/blog/${post.slug}`} className="blog-read-more">
                        <span>Leggi l'articolo</span>
                        <span className="read-more-arrow">→</span>
                      </a>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {searchQuery || selectedCategory !== "all" 
                ? "Nessun articolo trovato. Prova una ricerca diversa."
                : "Nessun articolo pubblicato ancora. Torna presto!"}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
