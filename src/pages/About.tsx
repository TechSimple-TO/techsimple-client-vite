/**
 * About.tsx
 * Expanded “About” page for TechSimple-TO.
 * Uses CSS Modules for scoped styling and a small fade-in animation.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.scss';
import aboutGeneral from '../assets/about-general.jpg';

const About: React.FC = () => (
  // Wrapper applies spacing + fade-in animation
  <section className={styles.wrapper}>
    {/* Page title */}
    <div className={styles.introBox}>
      <h2 className={styles.title}>About TechSimple-TO</h2>

      {/* Lead paragraph: quick, friendly summary */}
      <p className={styles.lead}>
        Founded in Toronto, TechSimple-TO is your trusted partner for practical, no-nonsense
        technology solutions. We blend technical expertise with a personal approach to keep your
        devices, data, and workflows running smoothly—without the jargon.
      </p>
    </div>

    {/* Photo just below the About section */}
    <img
      className={styles.aboutImg}
      src={aboutGeneral}
      alt="TechSimple-TO"
      loading="lazy"
    />

    {/* Content is organized into small, scannable sections for readability */}
    
      {/* Mission / What we do */}
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>Our Mission</h3>
        <p>
          Make technology <strong>simple</strong> for real people and small businesses.
          Whether it’s a custom PC build, on-call support, or sorting out messy admin tasks,
          our goal is to deliver clear, effective results you can trust.
        </p>
      </article>

      {/* Services snapshot (lightweight—your full Services page does the deep dive) */}
    <div className={styles.cardGrid}>
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>What We Offer</h3>
        <ul className={styles.list}>
          <li>Custom PC design &amp; assembly</li>
          <li>24/7 tech support for urgent issues</li>
          <li>Data backup &amp; migration</li>
          <li>Admin automation &amp; spreadsheet solutions</li>
        </ul>
        <p className={styles.note}>
          See the <Link to="/services">Services</Link> page for details.
        </p>
      </article>

      {/* Values / How we work */}
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>How We Work</h3>
        <ul className={styles.list}>
          <li><strong>Clarity first:</strong> we explain options in plain language.</li>
          <li><strong>Speed matters:</strong> quick response, minimal downtime.</li>
          <li><strong>Right-sized solutions:</strong> we propose what you actually need.</li>
          <li><strong>Honest pricing:</strong> transparent quotes before we start.</li>
        </ul>
      </article>

      {/* Credentials / Testimonials nudge */}
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>Why Choose Us</h3>
        <p>
          Clients consistently rate us five stars for responsiveness, quality, and
          reliability. From payroll emergencies to next-day laptop recoveries, we
          focus on outcomes—fast.
        </p>
        <p className={styles.note}>
          Browse a few <Link to="/">testimonials</Link> on the home page.
        </p>
      </article>
    </div>

      {/* Service area / Contact CTA */}
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>Where We Work</h3>
        <p>
          Based in Toronto and available remotely across Canada. On-site service in the GTA
          can be arranged depending on the task and schedule.
        </p>
        <div className={styles.ctaRow}>
          <Link className="btn btn--primary" to="/contact">Get in Touch</Link>
        </div>
      </article>
  </section>
);

export default About;
