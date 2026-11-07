import { ArrowRight, Mail, Phone } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { AuthorLayout } from "@/components/author-site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { author } from "@/lib/author-content";
import { contactFormSchema, submitContactMessage } from "@/lib/contact-form.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${author.name} | Send a message` },
      { name: "description", content: `Get in touch with author ${author.name} by email, phone, or the contact form.` },
      { property: "og:title", content: `Contact ${author.name} | Send a message` },
      { property: "og:description", content: `Get in touch with author ${author.name} by email, phone, or the contact form.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

type ContactValues = { name: string; email: string; message: string };
type ContactField = keyof ContactValues;

function ContactPage() {
  const [values, setValues] = useState<ContactValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage("");

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Partial<Record<ContactField, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if ((field === "name" || field === "email" || field === "message") && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      await submitContactMessage({ data: parsed.data });
      setValues({ name: "", email: "", message: "" });
      setFormMessage("Your message has been received.");
    } catch (error) {
      setFormMessage(error instanceof Error ? error.message : "We could not send your message right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function updateValue(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  return (
    <AuthorLayout>
      <section className="border-b border-border bg-secondary/55">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">A note, a question, a conversation</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">Get in touch</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">For book enquiries and messages for {author.name}.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-9 sm:px-8 sm:py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <aside className="flex flex-col gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-primary">Contact details</p>
            <h2 className="mt-3 font-display text-2xl font-medium text-foreground">Reach {author.name}</h2>
          </div>
          <a className="group flex items-start gap-4 border-b border-border pb-5" href={`mailto:${author.email}`}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"><Mail aria-hidden="true" size={18} /></span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Email</span>
              <span className="mt-1 block break-all text-sm font-medium text-foreground transition-colors group-hover:text-primary">{author.email}</span>
            </span>
          </a>
          <a className="group flex items-start gap-4 border-b border-border pb-5" href={author.telephoneLink}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"><Phone aria-hidden="true" size={18} /></span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Phone</span>
              <span className="mt-1 block text-sm font-medium text-foreground transition-colors group-hover:text-primary">{author.phone}</span>
            </span>
          </a>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">Your contact details will not appear publicly.</p>
        </aside>

        <div className="border-t border-border pt-7 md:border-l md:border-t-0 md:pl-9 md:pt-0 lg:pl-12">
          <h2 className="font-display text-2xl font-medium text-foreground">Send a message</h2>
          <form className="mt-6 space-y-5" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="contact-name">Your name</label>
                <Input
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                  id="contact-name"
                  maxLength={100}
                  onChange={(event) => updateValue("name", event.target.value)}
                  placeholder="Name"
                  required
                  value={values.name}
                />
                {errors.name ? <p className="text-sm text-destructive" id="contact-name-error">{errors.name}</p> : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground" htmlFor="contact-email">Email address</label>
                <Input
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  id="contact-email"
                  maxLength={255}
                  onChange={(event) => updateValue("email", event.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={values.email}
                />
                {errors.email ? <p className="text-sm text-destructive" id="contact-email-error">{errors.email}</p> : null}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground" htmlFor="contact-message">Message</label>
              <Textarea
                aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
                aria-invalid={Boolean(errors.message)}
                className="min-h-32 resize-y"
                id="contact-message"
                maxLength={2000}
                onChange={(event) => updateValue("message", event.target.value)}
                placeholder="Write your message…"
                required
                value={values.message}
              />
              {errors.message ? <p className="text-sm text-destructive" id="contact-message-error">{errors.message}</p> : <p className="text-xs text-muted-foreground" id="contact-message-hint">Up to 2,000 characters.</p>}
            </div>
            <div aria-live="polite" className="min-h-5 text-sm" role="status">
              {formMessage ? <p className={formMessage === "Your message has been received." ? "text-primary" : "text-destructive"}>{formMessage}</p> : null}
            </div>
            <Button className="rounded-sm px-5" disabled={submitting} size="lg" type="submit">
              {submitting ? "Sending…" : "Send a message"}
              {!submitting ? <ArrowRight aria-hidden="true" size={16} /> : null}
            </Button>
          </form>
        </div>
      </section>
    </AuthorLayout>
  );
}