import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import { blogPosts } from "@/data/blog";

function renderContent(content: string) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  return content.split(/\n\n+/).map((paragraph) => {
    const parts = paragraph.split(urlPattern);
    return (
      <p key={paragraph} className="text-muted-foreground leading-relaxed mb-4">
        {parts.map((part) =>
          part.startsWith("http") ? (
            <a key={part} href={part} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors">
              {part}
            </a>
          ) : (
            part
          )
        )}
      </p>
    );
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/404" replace />;

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  return (
    <article>
      <section className="pt-24">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>

        <div className="relative aspect-[21/9] max-w-5xl mx-auto">
          <AppImage src={post.image} alt={post.title} fill className="object-cover rounded-2xl" priority sizes="100vw" />
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">
            {post.category.replace("-", " ")}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <span>By {post.author}</span>
            <span>{post.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} min read</span>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
            {renderContent(post.content)}
            <p className="text-muted-foreground leading-relaxed">
              At Endless Infinity Properties, we believe that informed investors make better decisions.
            </p>
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="font-display text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="group glass rounded-xl overflow-hidden">
                    <div className="relative aspect-video">
                      <AppImage src={r.image} alt={r.title} fill className="object-cover" sizes="50vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-gold transition-colors">{r.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{r.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
