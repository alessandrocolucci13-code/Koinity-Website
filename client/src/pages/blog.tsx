import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/seo";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <>
      <SEO
        title="Blog & Aggiornamenti"
        description="Novità, approfondimenti e storie dalla community Koinity. Scopri le ultime notizie sul cinema on-demand e le storie dei nostri membri."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
            Blog & Aggiornamenti
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Novità, approfondimenti e storie dalla community Koinity.
          </p>
        </div>

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
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover-elevate transition-all duration-300 h-full flex flex-col" data-testid={`card-blog-${post.id}`}>
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
                    <h2 className="font-serif text-2xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors" data-testid={`text-title-${post.id}`}>
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1" data-testid={`text-excerpt-${post.id}`}>
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
              Nessun articolo pubblicato ancora. Torna presto!
            </p>
          </Card>
        )}
      </div>
      </div>
    </>
  );
}
