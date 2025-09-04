/**
 * Contact.tsx
 * Polished contact form with inline validation, submit state, and success feedback.
 * Uses EmailJS environment variables:
 *  - VITE_EMAILJS_SERVICE_ID
 *  - VITE_EMAILJS_TEMPLATE_ID
 *  - VITE_EMAILJS_PUBLIC_KEY
 */

import React, { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.scss';

type FormState = { name: string; email: string; title: string; message: string };

const initialForm: FormState = { name: '', email: '', title: '', message: '' };

// Simple email validator
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    title: false,
    message: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((t) => ({ ...t, [e.target.name as keyof FormState]: true }));

  // Compute field-level errors (only strings for easy display)
  const errors = useMemo(() => {
    return {
      name: form.name.trim() ? '' : 'Please enter your name.',
      email: form.email.trim()
        ? isEmail(form.email)
          ? ''
          : 'Please enter a valid email (e.g., name@example.com).'
        : 'Email is required.',
      title: form.title.trim() ? '' : 'Please add a short subject.',
      message: form.message.trim() ? '' : 'Please tell us how we can help.',
    } as Record<keyof FormState, string>;
  }, [form]);

  // Form valid if all error strings are empty
  const formValid = !Object.values(errors).some(Boolean);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // mark all as touched to reveal any hidden errors
    setTouched({ name: true, email: true, title: true, message: true });

    if (!formValid) {
      setStatus({ ok: false, msg: 'Please fix the highlighted fields.' });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS environment variables');
      }

      await emailjs.send(serviceId, templateId, form, { publicKey });
      setStatus({ ok: true, msg: 'Thanks! Your message was sent successfully.' });
      setForm(initialForm);
      setTouched({ name: false, email: false, title: false, message: false });
    } catch (err) {
      console.error('EmailJS error', err);
      setStatus({
        ok: false,
        msg: 'Something went wrong sending your message. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.wrapper} aria-labelledby="contact-title">
      {/* Left: Form card */}
      <div className={styles.formCard}>
        <h2 id="contact-title" className={styles.title}>
          Contact TechSimple-TO
        </h2>
        <p className={styles.lead}>
          Have a question or need a hand? Send a note and we’ll get back quickly.
        </p>

        <form onSubmit={onSubmit} noValidate aria-describedby="form-status" className={styles.form}>
          {/* Name */}
          <div className={styles.group}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className={`${styles.input} ${touched.name && errors.name ? styles.invalid : ''}`}
              name="name"
              value={form.name}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Jane Doe"
              autoComplete="name"
              required
            />
            {touched.name && errors.name && (
              <small role="alert" className={styles.errorText}>{errors.name}</small>
            )}
          </div>

          {/* Email */}
          <div className={styles.group}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className={`${styles.input} ${touched.email && errors.email ? styles.invalid : ''}`}
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
            {touched.email && errors.email && (
              <small role="alert" className={styles.errorText}>{errors.email}</small>
            )}
          </div>

          {/* Title */}
          <div className={styles.group}>
            <label htmlFor="title">Subject</label>
            <input
              id="title"
              className={`${styles.input} ${touched.title && errors.title ? styles.invalid : ''}`}
              name="title"
              value={form.title}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Short summary (e.g., PC build consultation)"
              required
            />
            {touched.title && errors.title && (
              <small role="alert" className={styles.errorText}>{errors.title}</small>
            )}
          </div>

          {/* Message */}
          <div className={styles.group}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              className={`${styles.textarea} ${touched.message && errors.message ? styles.invalid : ''}`}
              name="message"
              value={form.message}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Tell us a bit about what you need…"
              required
            />
            {touched.message && errors.message && (
              <small role="alert" className={styles.errorText}>{errors.message}</small>
            )}
          </div>

          {/* Submit */}
          <div className={styles.actions}>
            <button className="btn btn--primary" type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Message'}
            </button>
          </div>

          {/* Status region (success/error) */}
          <div id="form-status" aria-live="polite" className={styles.statusRegion}>
            {status && (
              <p className={`${styles.status} ${status.ok ? styles.success : styles.error}`}>
                {status.msg}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Right: Info card */}
      <aside className={styles.infoCard} aria-label="Contact information">
        <h3 className={styles.infoTitle}>Prefer email?</h3>
        <p>
          Reach us at{' '}
          <a href="mailto:admin@techsimple-to.ca" className={styles.link}>
            admin@techsimple-to.ca
          </a>
        </p>

        <h4 className={styles.infoSub}>Hours</h4>
        <p>Mon–Fri: 9:00–18:00 • 24/7 support for urgent issues</p>

        <h4 className={styles.infoSub}>Service Area</h4>
        <p>Toronto (GTA) &amp; Remote across Canada</p>

        <div className={styles.noteBox}>
          <p>
            Tip: For PC builds, include your target apps/games and budget—we’ll recommend a parts list.
          </p>
        </div>
      </aside>
    </section>
  );
};

export default Contact;
