import { ArrowRight, BookOpen, Feather, MoveRight } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { AuthorLayout } from "@/components/author-site";
import { Button } from "@/components/ui/button";
import bookCover from "@/assets/life-new-beginning-cover.jpg.asset.json";
import { author, featuredBook } from "@/lib/author-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Jerry Nobles | Stories of life and new beginnings" },
      { name: "description", content: "Discover Life New Beginning and the stories of author A Jerry Nobles." },
      { property: "og:title", content: "A Jerry Nobles | Stories of life and new beginnings" },
      { property: "og:description", content: "Discover Life New Beginning and the stories of author A Jerry Nobles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <AuthorLayout>
      <section className="mx-auto grid max-w-7xl items-center gap-9 px-5 pb-12 pt-9 sm:px-8 sm:pb-16 sm:pt-14 md:grid-cols-[1.04fr_0.96fr] md:gap-12 lg:gap-20">
        <div className="order-2 md:order-1">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-7 bg-accent-foreground" /> A story by {author.name}
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[1.12] text-primary sm:text-5xl lg:text-6xl">
            Every life has a <span className="text-foreground">turning point.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            At the crossroads, a new beginning is always possible.
          </p>
          <div className="mt-6 border-l-2 border-accent pl-4">
            <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{featuredBook.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              Thoughtful, everyday characters. Life-changing choices. A brighter path ahead.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-sm px-5 py-5" size="lg">
              <Link to="/books">Explore the book <ArrowRight aria-hidden="true" size={17} /></Link>
            </Button>
            <Button asChild className="rounded-sm" size="lg" variant="ghost">
              <Link to="/about">Meet the author <MoveRight aria-hidden="true" size={17} /></Link>
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen aria-hidden="true" className="text-primary" size={16} />
            Stories inspired by real-life experiences.
          </p>
        </div>

        <figure className="relative order-1 mx-auto w-full max-w-[390px] md:order-2 md:max-w-[450px]">
          <div className="relative overflow-hidden rounded-[3px] bg-secondary shadow-[0_24px_55px_-28px_var(--color-primary)]">
            <img
              alt="Front cover of Life New Beginning by A Jerry Nobles, showing a traveler at a crossroads beneath an open sky."
              className="aspect-[0.78] w-full object-cover object-[83%_center]"
              height="1024"
              src={bookCover.url}
              width="1536"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Feather aria-hidden="true" className="text-primary" size={14} /> A novel about the paths we choose</span>
            <span className="h-px flex-1 bg-border" />
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-border bg-secondary/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 sm:py-10 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">The heart of the story</p>
            <p className="mt-2 max-w-3xl font-display text-2xl leading-snug text-foreground sm:text-3xl">
              “A deep belief that new beginnings are always possible.”
            </p>
          </div>
          <Button asChild className="w-fit rounded-sm" variant="outline">
            <Link to="/about">More about {author.name} <ArrowRight aria-hidden="true" size={16} /></Link>
          </Button>
        </div>
      </section>
    </AuthorLayout>
  );
}