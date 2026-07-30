import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import FadeIn from "@/components/ui/FadeIn";

const categories = ["all", "real-estate", "technology", "investment", "market"] as const;

export default function BlogContent() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all"
    ? blogPosts
    : blogPosts.filter((p) => p.category === filter);

  const featured = blogPosts[0];

  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Insights</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Blog & Media</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real estate tips, tech insights, and Nigerian market updates.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <FadeIn>
          <Link to={`/blog/${featured.slug}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden aspect-[21/9]">
              <AppImage src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="text-gold text-xs font-semibold uppercase tracking-wider">{featured.category}</span>
                <h2 className="font-display text-2xl md:text-4xl font-bold mt-2 group-hover:text-gold transition-colors">{featured.title}</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl hidden md:block">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <span>{featured.author}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {featured.readTime} min read</span>
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === cat ? "bg-gold text-background" : "glass hover:bg-muted"
              }`}
            >
              {cat === "all" ? "All" : cat.replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.08}>
              <Link to={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <AppImage src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                </div>
                <span className="text-gold text-xs font-semibold uppercase">{post.category.replace("-", " ")}</span>
                <h3 className="font-display text-lg font-bold mt-1 group-hover:text-gold transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1 text-gold group-hover:gap-2 transition-all">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
