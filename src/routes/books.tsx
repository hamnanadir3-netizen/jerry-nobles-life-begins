import { ArrowRight, BookOpen, Check } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { AuthorLayout } from "@/components/author-site";
import { Button } from "@/components/ui/button";
import bookCover from "@/assets/life-new-beginning-cover.jpg.asset.json";
import { author, featuredBook } from "@/lib/author-content";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books by A Jerry Nobles | Life New Beginning" },
      { name: "description", content: "Explore Life New Beginning, the first featured book by author A Jerry Nobles." },
      { property: "og:title", content: "Books by A Jerry Nobles | Life New Beginning" },
      { property: "og:description", content: "Explore Life New Beginning, the first featured book by author A Jerry Nobles." },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  return (
    <AuthorLayout>
      <section className="border-b border-border bg-secondary/55">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">The bookshelf</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">Books by {author.name}</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">One story, many turning points—and the possibility of finding a brighter path.</p>
        </div>
      </section>

      <article className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-9 sm:px-8 sm:py-14 md:grid-cols-[minmax(260px,0.8fr)_1.2fr] md:gap-14 lg:gap-20">
        <figure className="mx-auto w-full max-w-[350px]">
          <div className="overflow-hidden rounded-[3px] bg-secondary shadow-[0_24px_55px_-28px_var(--color-primary)]">
            <img
              alt="Cover of Life New Beginning by A Jerry Nobles, featuring a figure standing at a signpost pointing toward change, faith, opportunity and a brighter tomorrow."
              className="aspect-[0.78] w-full object-cover object-[83%_center]"
              height="1024"
              src={bookCover.url}
              width="1536"
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen aria-hidden="true" className="text-primary" size={14} />
            Written by {author.name}
          </figcaption>
        </figure>

        <div className="py-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">A story of turning points</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">{featuredBook.title}</h2>
          <p className="mt-2 font-display text-lg italic text-muted-foreground">By {author.name}</p>
          <div className="my-6 h-px max-w-[110px] bg-accent-foreground" />
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">{featuredBook.description}</p>
          <blockquote className="mt-6 border-l-2 border-accent pl-5 font-display text-xl leading-relaxed text-foreground sm:text-2xl">
            “New beginnings are always possible.”
          </blockquote>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {featuredBook.themes.map((theme) => (
              <li className="flex items-start gap-2 text-sm text-muted-foreground" key={theme}>
                <Check aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={16} />{theme}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-sm px-5" size="lg">
              <Link to="/contact">Ask about the book <ArrowRight aria-hidden="true" size={16} /></Link>
            </Button>
            <Button asChild className="rounded-sm" size="lg" variant="outline">
              <Link to="/about">About the author</Link>
            </Button>
          </div>
        </div>
      </article>
    </AuthorLayout>
  );
}