/**
 * Home.tsx
 * Landing page: brief intro + testimonial highlights.
 * Notes:
 * - Styles are scoped via Home.module.scss for consistency.
 * - Keep this page lightweight; deeper details live on Services/About.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

import servicePc from '../assets/service-pc.jpg';
import serviceSupport from '../assets/service-support.jpg';
import serviceData from '../assets/service-data.jpg';
import serviceAdmin from '../assets/service-admin.jpg';

/** Stronger typing helps prevent accidental shape changes later. */
type Testimonial = { name: string; quote: string };

const testimonials: Testimonial[] = [
  {
    name: 'Charlie G.',
    quote:
      'I came to a roadblock with my business payroll. I received multiple unreasonable quotes from others (who didn’t solve my problem). Nick got my business back up and running within 24 hours at half the price. I would rate higher than 5 stars if I could!',
  },
  {
    name: 'Ethan P.',
    quote:
      'As someone who was stressing out that their laptop wouldn’t work by tomorrow, not only was it a true hidden gem to find a service that offered tech support 24/7, but to also speak with someone like Nick who is incredibly helpful, knowledgeable and knows how to turn any situation into a positive. I could not recommend TechSimple-TO enough!',
  },
  {
    name: 'Jack W.',
    quote:
      'This company was exactly what I needed. They designed and assembled an incredibly powerful computer for me complete with remote rec support as well as helping my to generate spreadsheets and tech solutions specific to my business. Can’t say enough good things about this company!',
  },
];

// Helper: truncate a string to N words (adds an ellipsis when truncated)
const truncateWords = (text: string, count: number) => {
  const words = text.trim().split(/\s+/);
  return words.length <= count ? text : words.slice(0, count).join(' ') + '…';
};

const Home: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
  <>
    {/* Intro: simple welcome block in a card-style wrapper */}
    <section className={`${styles.wrapper} ${styles.fadeIn}`} aria-labelledby="home-title">
      <div className={styles.intro}>
        <h2 id="home-title" className={styles.title}>
          Welcome to TechSimple-TO
        </h2>
        <p className={styles.lead}>
          We specialize in tech support, PC builds, and administrative solutions tailored for small
          businesses. Let us simplify technology for you.
        </p>
      </div>
    </section>

    {/* Services snapshot: 3–4 cards linking to the Services page */}
    <section className={styles.section} aria-labelledby="services-title">
      <div className={styles.card}>
        <h2 id="services-title" className={styles.sectionTitle}>What We Do</h2>
        <p className={styles.sectionLead}>
          Practical help with clear outcomes—no jargon, no runaround.
        </p>
      

        <ul className={styles.cardGrid} role="list">
          <li className={styles.card}>
            <img className={styles.cardImg} src={servicePc} alt="Custom PC build" />
            <h3 className={styles.cardHeading}>Custom PC Builds</h3>
            <p>Design, parts selection, assembly, and tuning for your workflow and budget.</p>
          </li>
          <li className={styles.card}>
            <img className={styles.cardImg} src={serviceSupport} alt="24/7 support" />
            <h3 className={styles.cardHeading}>24/7 Tech Support</h3>
            <p>Urgent fixes, remote assistance, and proactive maintenance when you need it.</p>
          </li>
          <li className={styles.card}>
            <img className={styles.cardImg} src={serviceData} alt="Data backup and migration" />
            <h3 className={styles.cardHeading}>Data &amp; Migration</h3>
            <p>Backups, transfers, and setup that keep your files safe and accessible.</p>
          </li>
          <li className={styles.card}>
            <img className={styles.cardImg} src={serviceAdmin} alt="Admin automation" />
            <h3 className={styles.cardHeading}>Admin Automation</h3>
            <p>Spreadsheets, scripts, and tools tailored to your business processes.</p>
          </li>
        </ul>
      </div>
    </section>

     {/* Process: 3 simple steps */}
    <section className={styles.section} aria-labelledby="process-title">
      <div className={styles.card}>
        <h2 id="process-title" className={styles.sectionTitle}>How It Works</h2>
        <ol className={styles.steps} aria-label="Our three-step process">
          <li className={styles.step}>
            <span className={styles.stepNum}>1</span>
            <div>
              <h3 className={styles.stepTitle}>Chat</h3>
              <p>Tell us your goals, constraints, and timeline. We’ll recommend a path.</p>
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum}>2</span>
            <div>
              <h3 className={styles.stepTitle}>Build</h3>
              <p>We design and assemble your solution—hardware, software, or both.</p>
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNum}>3</span>
            <div>
              <h3 className={styles.stepTitle}>Support</h3>
              <p>We make sure everything runs smoothly and stay on-call if you need us.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    {/* CTA band: high-contrast nudge before testimonials */}
    <section className={styles.ctaBand} aria-labelledby="cta-title">
      <div className={styles.ctaBandInner}>
        <h2 className={styles.h2w} id="cta-title">Ready to make tech simple?</h2>
        <div className={styles.sectionCtaRow}>
          <Link className={styles.ctaSecondary} to="/contact">Contact Us</Link>
        </div>
      </div>
    </section>

    {/* Testimonials: semantic list for improved screen reader navigation */}
    <section className={styles.testimonials} aria-labelledby="testimonials-title">
      <div className={styles.card}>
        <h2 id="testimonials-title">What Our Clients Say</h2>
        <p>We pride ourselves on delivering exceptional service. Here’s what our clients have to say:</p>
      

        <ul className={styles.cardGrid}>
          {testimonials.map((t, i) => (
            <li className={styles.card} key={t.name}>
              <p className={styles.stars} aria-label="5 out of 5 stars">★★★★★</p>
              <blockquote className={styles.quote}>
                <p id={`quote-${i}`}>&ldquo;{expanded[t.name] ? t.quote : truncateWords(t.quote, 12)}&rdquo;</p>
              </blockquote>
              <button
                type="button"
                className={styles.readMore}
                aria-expanded={!!expanded[t.name]}
                aria-controls={`quote-${i}`}
                onClick={() => setExpanded((e) => ({ ...e, [t.name]: !e[t.name] }))}
              >
                {expanded[t.name] ? 'Show less' : 'Read more'}
              </button>
              <footer className={styles.name}>— {t.name}</footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
  );
};

export default Home;
