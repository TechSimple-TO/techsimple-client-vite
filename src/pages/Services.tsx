/**
 * Services.tsx
 * Full services overview page.
 * - Intro block with title/lead
 * - Image-backed service cards in a responsive grid
 * - “Why work with us” bullets
 * - CTA band to contact
 * Uses CSS Modules for scoped styles.
 */

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.scss';

// Import images (Vite will optimize/hash these)
import servicePc from '../assets/service-pc.jpg';
import serviceSupport from '../assets/service-support.jpg';
import serviceData from '../assets/service-data.jpg';
import serviceAdmin from '../assets/service-admin.jpg';
import serviceWebsite from '../assets/service-website.jpg';
import serviceRepair from '../assets/service-repair.jpg';

type Service = {
  title: string;
  description: string;
  img: string;
  details: string;
  examples: string[];
};

const services: Service[] = [
  {
    title: 'Custom PC Builds',
    description:
      'Expertly designed systems for gaming, creative work, or business. We handle parts selection, assembly, tuning, and testing.',
    img: servicePc,
    details:
      'From airflow and thermals to workload-tuned parts, we design, assemble, and stress-test PCs that match your budget and goals—no upsell, just results.',
    examples: [
      'Gaming rigs with reliable 144+ FPS targets',
      'Creator builds for Adobe/DaVinci/Blender',
      'Small-business workstations and quiet office PCs',
      'Parts sourcing, BIOS tuning, cable management',
    ],
  },
  {
    title: 'Tech Support (24/7)',
    description:
      'Remote or on-site help for urgent issues, performance problems, malware cleanup, device setup, and more—anytime you need it.',
    img: serviceSupport,
    details:
      'Fast, plain‑English support by phone, remote, or on‑site. We triage and resolve issues without the jargon or runaround.',
    examples: [
      'Malware cleanup and performance tuning',
      'Printer/Wi‑Fi/device setup and troubleshooting',
      'Email, accounts, and permissions sorted out',
      'Proactive checkups to prevent repeat problems',
    ],
  },
  {
    title: 'Data & Migration',
    description:
      'Move to a new machine with confidence. Backups, transfers, and data integrity checks so nothing is lost in the shuffle.',
    img: serviceData,
    details:
      'We plan and verify migrations so your files, apps, and settings are exactly where you need them on day one—safely backed up along the way.',
    examples: [
      'Full PC‑to‑PC data transfer and validation',
      'Cloud drive consolidation (Drive, OneDrive, iCloud)',
      'Backup strategy with versioning and restore tests',
      'Email/Outlook moves with rules and signatures',
    ],
  },
  {
    title: 'Admin Automation',
    description:
      'Streamline repetitive work with spreadsheets, scripts, and lightweight tools tailored to your small business processes.',
    img: serviceAdmin,
    details:
      'We turn your recurring admin tasks into simple, reliable workflows—spreadsheets, scripts, and small tools that save hours every week.',
    examples: [
      'Spreadsheet templates with error‑proof formulas',
      'Bulk invoice/PO generators and CSV imports',
      'Data clean‑up and simple dashboards',
      'Email/report automation on a schedule',
    ],
  },
  {
    title: 'Website Development & Modernization',
    description:
      'Design and rebuild modern sites, streamline small-business workflows (booking, invoicing, analytics), and migrate off legacy tools with minimal downtime.',
    img: serviceWebsite,
    details:
      'Modern, fast websites with the essentials built‑in—SEO basics, analytics, contact/booking, and a maintainable setup you actually control.',
    examples: [
      'Rebuild legacy sites with mobile‑first layouts',
      'Online booking/contact forms wired to email/CRMs',
      'Lightweight sites with great Core Web Vitals',
      'Migration off dead plugins and fragile stacks',
    ],
  },
  {
    title: 'Hardware Repairs',
    description:
      'Diagnostics and repairs for laptops/desktops: SSD/RAM upgrades, thermal servicing, screen/keyboard/battery replacements, deep cleaning, and tune‑ups.',
    img: serviceRepair,
    details:
      'Clear diagnosis and upfront quotes—repairs and upgrades done right, with parts we trust and careful attention to longevity and thermals.',
    examples: [
      'SSD/RAM upgrades and OS refreshes',
      'Thermal paste and deep clean for overheating',
      'Laptop screens, keyboards, and battery swaps',
      'No‑boot recovery and data preservation',
    ],
  },
];

const Services: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (title: string) => setExpanded((t) => (t === title ? null : title));
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (expanded && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [expanded]);

  return (
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
      {services.map((s) => {
        const isExpanded = expanded === s.title;
        const panelId = 'svc-expanded-panel';
        return (
          <li className={styles.card} key={s.title}>
            <img className={styles.cardImg} src={s.img} alt={s.title} loading="lazy" />
            <h3 className={styles.cardHeading}>{s.title}</h3>
            <p>{s.description}</p>
            <div className={styles.cardActions}>
              <button
                type="button"
                className={`btn ${isExpanded ? 'btn--primary' : 'btn--primary'}`}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggle(s.title)}
              >
                {isExpanded ? 'Hide Details' : 'Learn More'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>

    {expanded && (() => {
      const svc = services.find((x) => x.title === expanded)!;
      return (
        <div
          id="svc-expanded-panel"
          className={styles.expandedPanel}
          aria-live="polite"
          ref={panelRef}
        >
          <img className={styles.expandedImg} src={svc.img} alt={svc.title} />
          <h3 className={styles.cardHeading}>{svc.title}</h3>
          <p>{svc.details || svc.description}</p>
          {svc.examples?.length ? (
            <ul className={styles.examples} aria-label="Examples">
              {svc.examples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    })()}

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
          <Link className="btn btn--secondary" to="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  </section>
  );
};

export default Services;
