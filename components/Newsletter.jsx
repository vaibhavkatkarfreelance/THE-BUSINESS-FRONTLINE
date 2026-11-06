"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ status: "idle", message: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState({ status: "error", message: "Please enter a corporate email address (e.g. executive@company.com)." });
      return;
    }
    setState({ status: "success", message: `Thank you. The executive briefing confirmation has been dispatched to ${email.trim()}.` });
    setEmail("");
  };

  return (
    <section aria-labelledby="newsletter-title" className="border-t border-sand-deep bg-sand/90 text-ink">
      <div className="wrap grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">The Daily Briefing</span>
          <h2 id="newsletter-title" className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl text-ink">
            Intelligence Before the Market Opens.
          </h2>
          <p className="mt-3 max-w-md text-base text-muted leading-relaxed">
            Join 250,000+ senior executives receiving our curated morning briefing on C-suite strategy, technological shifts, and capital markets.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted">
            <ShieldCheck size={16} className="text-accent" />
            <span>Curated exclusively for C-level directors and founders.</span>
          </div>
        </div>
        <div>
          {state.status === "success" ? (
            <div role="status" className="flex items-start gap-3 rounded-sm border border-accent/40 bg-accent-soft p-6">
              <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={24} aria-hidden="true" />
              <div>
                <h3 className="font-serif text-lg font-bold text-ink">Subscription Confirmed</h3>
                <p className="mt-1 text-sm text-muted">{state.message}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="rounded-sm border border-sand-deep bg-white p-6 shadow-sm">
              <label htmlFor="newsletter-email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink">
                Executive Work Email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@enterprise.com"
                  autoComplete="email"
                  aria-invalid={state.status === "error"}
                  aria-describedby="newsletter-msg"
                  className="field flex-1 !py-3"
                />
                <button type="submit" className="btn-accent shrink-0 !py-3 text-xs font-bold uppercase tracking-wider">
                  Join Briefing
                </button>
              </div>
              <p
                id="newsletter-msg"
                role={state.status === "error" ? "alert" : undefined}
                className={`mt-3 text-xs ${state.status === "error" ? "text-red-600 font-semibold" : "text-muted"}`}
              >
                {state.status === "error" ? state.message : "Strictly zero spam. Unsubscribe with one click anytime."}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
