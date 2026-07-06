import type { Metadata } from "next";
import { business } from "@/lib/site";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak to the friendly Moor & Coast Care team in Whitby. Request a free, no-obligation care consultation by phone, email or the enquiry form.",
};

export default function ContactPage() {
  const { address } = business;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about the care you need"
        lead="Whether you're arranging care for yourself or a loved one, our friendly team is here to help — with no obligation."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Enquiry form */}
          <div className="reveal rounded-3xl bg-white p-8 shadow-[var(--shadow-soft)] sm:p-10">
            <h2 className="text-2xl font-semibold">Request a free consultation</h2>
            <p className="mt-2 text-ink-muted">
              Fill in the form and we&apos;ll get back to you very soon.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Contact details */}
          <div className="reveal space-y-8">
            <ContactRow label="Call us" icon="phone">
              <a
                href={business.phoneHref}
                className="text-lg font-semibold text-navy hover:text-gold-600"
              >
                {business.phone}
              </a>
            </ContactRow>

            <ContactRow label="Email us" icon="mail">
              <a
                href={`mailto:${business.email}`}
                className="text-lg font-semibold text-navy hover:text-gold-600 break-all"
              >
                {business.email}
              </a>
            </ContactRow>

            <ContactRow label="Visit us" icon="pin">
              <address className="not-italic leading-relaxed text-ink-muted">
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city}, {address.region}
                <br />
                {address.postcode}
              </address>
            </ContactRow>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  label,
  icon,
  children,
}: {
  label: string;
  icon: "phone" | "mail" | "pin";
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-sand bg-warm-white p-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-gold">
        <ContactIcon name={icon} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
          {label}
        </p>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}

function ContactIcon({ name }: { name: "phone" | "mail" | "pin" }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "phone")
    return (
      <svg {...common}>
        <path d="M6 3h3l1.5 5-2 1a11 11 0 005 5l1-2 5 1.5v3a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" />
      </svg>
    );
  if (name === "mail")
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
