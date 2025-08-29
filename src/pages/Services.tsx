/**
 * Services.tsx
 * Full services overview page.
 * - Intro block with title/lead
 * - Image-backed service cards in a responsive grid
 * - “Why work with us” bullets
 * - CTA band to contact/quote
 * Uses CSS Modules for scoped styles.
 */

import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.scss';

// Import images (Vite will optimize/hash these)
import servicePc from '../assets/service-pc.jpg';
import serviceSupport from '../assets/service-support.jpg';
import serviceData from '../assets/service-data.jpg';
import serviceAdmin from '../assets/service-admin.jpg';

type Service = {
  title: string;
  description: string;
  img: string;
};

const services: Service[] = [
  {
    title: 'Custom PC Builds',
    description:
      'Expertly designed systems for gaming, creative work, or business. We handle parts selection, assembly, tuning, and testing.',
    img: servicePc,
  },
  {
    title: 'Tech Support (24/7)',
    description:
      'Remote or on-site help for urgent issues, performance problems, malware cleanup, device setup, and more—anytime you need it.',
    img: serviceSupport,
  },
  {
    title: 'Data & Migration',
    description:
      'Move to a new machine with confidence. Backups, transfers, and data integrity checks so nothing is lost in the shuffle.',
    img: serviceData,
  },
  {
    title: 'Admin Automation',
    description:
      'Streamline repetitive work with spreadsheets, scripts, and lightweight tools tailored to your small business processes.',
    img: serviceAdmin,
  },
];

const Services: React.FC = () => (
  <section className={styles.wrapper} aria-labelledby="services-title">
    {/* Intro */}
    <div className={styles.intro}>
      <h2 id="services-title" className={styles.title}>Our Services</h2>
      <p className={styles.lead}>
        Practical, no-nonsense solutions with clear outcomes and honest pricing. Pick what you need
        or ask us for a recommendation—we’ll right-size it.
      </p>
    </div>

    {/* Services grid */}
    <ul className={styles.cardGrid} role="list">
      {services.map((s) => (
        <li className={styles.card} key={s.title}>
          <img className={styles.cardImg} src={s.img} alt={s.title} loading="lazy" />
          <h3 className={styles.cardHeading}>{s.title}</h3>
          <p>{s.description}</p>
          <div className={styles.cardActions}>
            <a className={styles.cta} href="/quote">Request a Quote</a>
            <Link className={styles.ctaSecondary} to="/contact">Ask a Question</Link>
          </div>
        </li>
      ))}
    </ul>

    {/* Why work with us */}
    <div className={styles.whyBox} aria-labelledby="why-title">
      <h3 id="why-title" className={styles.whyTitle}>Why Work With TechSimple-TO</h3>
      <ul className={styles.bullets}>
        <li><strong>Clarity first:</strong> options explained in plain language—no jargon.</li>
        <li><strong>Speed when it counts:</strong> quick response and minimal downtime.</li>
        <li><strong>Right-sized solutions:</strong> we propose what you actually need.</li>
        <li><strong>Transparent pricing:</strong> clear quotes before any work begins.</li>
      </ul>
    </div>

    {/* CTA band */}
    <section className={styles.ctaBand} aria-labelledby="services-cta">
      <div className={styles.ctaBandInner}>
        <h2 id="services-cta" className={styles.h2w}>Not sure where to start?</h2>
        <p className={styles.hintw}>Tell us your goals—we’ll recommend a plan in plain English.</p>
        <div className={styles.sectionCtaRow}>
          <a className={styles.cta} href="/quote">Get a Free Quote</a>
          <Link className={styles.ctaSecondary} to="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  </section>
);

export default Services;
