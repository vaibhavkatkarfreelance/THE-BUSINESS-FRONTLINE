"use client";

import { useState } from "react";
import { CheckCircle2, Send, ShieldCheck } from "lucide-react";

function Field({ id, label, values, errors, onChange, as: Tag = "input", ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink/80">{label}</label>
      <Tag
        id={id}
        name={id}
        value={values[id]}
        onChange={onChange}
        aria-invalid={Boolean(errors[id])}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        className="field"
        {...rest}
      />
      {errors[id] && <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-red-600">{errors[id]}</p>}
    </div>
  );
}

const inquiryTypes = [
  "Editorial Story Pitch",
  "C-Suite Cover Feature Nomination",
  "Media Kit & Advertising",
  "Digital Reprints & Licensing",
  "General Inquiries",
];

const empty = {
  name: "",
  email: "",
  company: "",
  inquiryType: inquiryTypes[0],
  subject: "",
  message: "",
};

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid corporate email address.";
  if (v.subject.trim().length < 3) e.subject = "Enter a subject (at least 3 characters).";
  if (v.message.trim().length < 15) e.message = "Write a message of at least 15 characters so our editors can review.";
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) setSent(true);
  };

  if (sent)
    return (
      <div role="status" className="rounded-sm border border-accent/40 bg-accent-soft p-8 text-center animate-in fade-in">
        <CheckCircle2 size={44} className="mx-auto text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl font-bold text-ink">Inquiry Submitted Successfully</h3>
        <p className="mt-2 text-sm text-muted max-w-md mx-auto">
          Thank you, <strong>{values.name}</strong>. Your inquiry regarding <em>{values.inquiryType}</em> has been logged. Our editorial bureau will respond within two business days.
        </p>
        <button
          type="button"
          onClick={() => { setValues(empty); setSent(false); }}
          className="btn-accent mt-6 text-xs font-bold uppercase tracking-wider !py-2.5 !px-5"
        >
          Send Another Message
        </button>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-5" aria-label="Executive contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field values={values} errors={errors} onChange={change} id="name" label="Full Name *" autoComplete="name" placeholder="E.g. Marcus Sterling" />
        <Field values={values} errors={errors} onChange={change} id="email" label="Corporate Email *" type="email" autoComplete="email" placeholder="executive@company.com" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field values={values} errors={errors} onChange={change} id="company" label="Organization / Company" placeholder="E.g. Global Tech Partners" />
        <div>
          <label htmlFor="inquiryType" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink/80">Inquiry Department *</label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={values.inquiryType}
            onChange={change}
            className="field"
          >
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <Field values={values} errors={errors} onChange={change} id="subject" label="Subject *" placeholder="Brief summary of your inquiry..." />

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink/80">Message / Editorial Brief *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={change}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="field"
          placeholder="Please share details regarding your pitch, nomination, or inquiry..."
        />
        {errors.message && <p id="message-error" className="mt-1.5 text-xs font-semibold text-red-600">{errors.message}</p>}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        <button type="submit" className="btn-accent text-xs font-bold uppercase tracking-wider !py-3.5 !px-8">
          <Send size={15} aria-hidden="true" />
          Submit Executive Inquiry
        </button>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <ShieldCheck size={14} className="text-accent" />
          <span>Strictly confidential executive communication.</span>
        </div>
      </div>
    </form>
  );
}
