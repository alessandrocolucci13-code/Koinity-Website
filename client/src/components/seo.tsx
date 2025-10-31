import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

export function SEO({ title, description, image, type = "website" }: SEOProps) {
  const fullTitle = title.includes("Koinity") ? title : `${title} | Koinity`;
  const defaultImage = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=630&fit=crop";
  const ogImage = image || defaultImage;

  useEffect(() => {
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    const updateOrCreateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    updateOrCreateMeta("og:title", fullTitle);
    updateOrCreateMeta("og:description", description);
    updateOrCreateMeta("og:image", ogImage);
    updateOrCreateMeta("og:type", type);
    updateOrCreateMeta("og:site_name", "Koinity");

    updateOrCreateMeta("twitter:card", "summary_large_image");
    updateOrCreateMeta("twitter:title", fullTitle);
    updateOrCreateMeta("twitter:description", description);
    updateOrCreateMeta("twitter:image", ogImage);
  }, [fullTitle, description, ogImage, type]);

  return null;
}
