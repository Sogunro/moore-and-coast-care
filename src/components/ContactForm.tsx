"use client";

import { useState } from "react";
import { Button } from "./Button";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-sand bg-white px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-gold focus:outline-none";

const labelClass = "mb-1.5 block text-sm font-semibold text-navy";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(
          "Thank you — we've received your enquiry and will be in touch very soon."
        );
        form.reset();
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't send your message. Please call us instead and we'll help right away."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot — visually hidden, ignored by users, filled by bots. */}
      <div aria-hidden className="absolute left-[-9999px]" >
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input id="name" name="name" required maxLength={100} className={fieldClass} placeholder="Jane Smith" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input id="phone" name="phone" required maxLength={32} inputMode="tel" className={fieldClass} placeholder="07000 000000" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required maxLength={254} className={fieldClass} placeholder="jane@example.com" />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          className={`${fieldClass} resize-y`}
          placeholder="Tell us a little about the care you're looking for…"
        />
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto disabled:opacity-60">
        {status === "submitting" ? "Sending…" : "Request a free consultation"}
      </Button>

      {message && (
        <p
          role="status"
          className={`text-sm font-medium ${
            status === "success" ? "text-sage-600" : "text-[#b4442f]"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
