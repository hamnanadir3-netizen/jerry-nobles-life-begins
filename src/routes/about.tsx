import { ArrowRight, Feather } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { AuthorLayout } from "@/components/author-site";
import { Button } from "@/components/ui/button";
import bookCover from "@/assets/life-new-beginning-cover.jpg.asset.json";
import { author, featuredBook } from "@/lib/author-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${author.name} | The storyteller behind Life New Beginning` },
      { name: "description", content: "Meet A Jerry Nobles, a storyteller inspired by real-life experiences and the hope of new beginnings." },
      { property: "og:title", content: `About ${author.name} | The storyteller behind Life New Beginning` },
      { property: "og:description", content: "Meet A Jerry Nobles, a storyteller inspired by real-life experiences and the hope of new beginnings." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AuthorLayout>
      <section className="border-b border-border bg-secondary/55">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"><Feather aria-hidden="true" size={15} /> Behind the stories</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">About the author</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">The storyteller behind <span className="font-semibold text-foreground">{featuredBook.title}</span>.</p>
        </div>
      </section>

      <article className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-9 sm:px-8 sm:py-14 md:grid-cols-[minmax(260px,0.78fr)_1.22fr] md:gap-14 lg:gap-20">
        <figure className="mx-auto w-full max-w-[340px]">
          <div className="overflow-hidden rounded-[3px] bg-secondary shadow-[0_24px_55px_-28px_var(--color-primary)]">
            <img
              alt="Cover of Life New Beginning by A Jerry Nobles, a story about facing crossroads and finding a brighter path."
              className="aspect-[0.78] w-full object-cover object-[83%_center]"
              height="1024"
              src={bookCover.url}
              width="1536"
            />
          </div>
          <figcaption className="mt-3 font-display text-sm italic text-muted-foreground">{featuredBook.title} · {author.name}</figcaption>
        </figure>

        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">A Jerry Nobles</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">A storyteller drawn to life’s turning points.</h2>
          <div className="my-6 h-px max-w-[110px] bg-accent-foreground" />
          <p className="text-base leading-8 text-muted-foreground sm:text-lg">{author.biography}</p>

          <blockquote className="mt-7 border-l-2 border-accent pl-5 font-display text-xl leading-relaxed text-primary sm:text-2xl">
            “New beginnings are always possible.”
          </blockquote>

          <div className="mt-9 border-t border-border pt-6">
            <p className="font-display text-xl font-medium text-foreground">The story continues in {featuredBook.title}.</p>
            <Button asChild className="mt-5 rounded-sm" variant="outline">
              <Link to="/books">Discover the book <ArrowRight aria-hidden="true" size={16} /></Link>
            </Button>
          </div>
        </div>
      </article>
    </AuthorLayout>
  );
}