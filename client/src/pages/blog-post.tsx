import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/seo";
import { Calendar, ArrowLeft } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const post = posts?.find((p) => p.slug === params?.slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-24 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="aspect-video w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <>
        <SEO
          title="Articolo Non Trovato"
          description="L'articolo che stai cercando non è stato trovato."
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl font-bold mb-4">
              Articolo non trovato
          </h1>
          <p className="text-muted-foreground mb-6">
            L'articolo che stai cercando non esiste o è stato rimosso.
          </p>
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Torna al blog
            </Button>
          </Link>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        type="article"
      />
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 gap-2 -ml-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Torna al blog
          </Button>
        </Link>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-6" data-testid="text-title">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.publishedAt} data-testid="text-date">
            {new Date(post.publishedAt).toLocaleDateString("it-IT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {post.imageUrl && (
          <div className="aspect-video overflow-hidden rounded-2xl mb-8 bg-muted">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="object-cover w-full h-full"
              data-testid="img-featured"
            />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          data-testid="text-content"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
        />
      </div>
      </article>
    </>
  );
}
