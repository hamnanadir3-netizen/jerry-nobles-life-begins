import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Feather, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "Books", to: "/books" },
  { label: "About the author", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function AuthorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-1.5 px-5 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-end sm:gap-6 sm:px-8">
          <a className="inline-flex items-center gap-2 transition-opacity hover:opacity-80" href="mailto:noblesj45@yahoo.com">
            <Mail aria-hidden="true" size={14} />
            <span>noblesj45@yahoo.com</span>
          </a>
          <a className="inline-flex items-center gap-2 transition-opacity hover:opacity-80" href="tel:+19034674805">
            <Phone aria-hidden="true" size={14} />
            <span>903 467 4805</span>
          </a>
        </div>
      </div>

      <header className="border-b border-border bg-background/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
          <Link aria-label="A Jerry Nobles — Home" className="group inline-flex items-center gap-3 self-start" to="/">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Feather aria-hidden="true" size={19} />
            </span>
            <span className="font-display text-xl font-semibold leading-tight text-primary">A Jerry Nobles</span>
          </Link>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-3 text-sm sm:gap-x-7 sm:border-0 sm:pt-0">
            {links.map((link) => (
              <Link
                activeProps={{ className: "text-primary font-semibold" }}
                aria-current="page"
                className="text-muted-foreground transition-colors hover:text-primary"
                key={link.to}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-16 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-9">
          <div>
            <p className="font-display text-xl">Stories of life. Hope for what’s next.</p>
            <p className="mt-1 text-sm text-primary-foreground/75">A Jerry Nobles · Author of Life New Beginning</p>
          </div>
          <a className="inline-flex items-center gap-2 self-start text-sm transition-opacity hover:opacity-80 sm:self-auto" href="mailto:noblesj45@yahoo.com">
            Get in touch <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </footer>
    </div>
  );
}