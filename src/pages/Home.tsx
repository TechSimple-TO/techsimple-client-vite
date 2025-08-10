// src/pages/Home.tsx
import React from 'react';
import styles from './Home.module.scss';

const testimonials = [
  {
    name: 'Charlie G.',
    quote: 'I came to a roadblock with my business payroll. I received multiple unreasonable quotes from others (who didn’t solve my problem). Nick got my business back up and running within 24 hours at half the price. I would rate higher than 5 stars if I could!'
  },
  {
    name: 'Ethan P.',
    quote: 'As someone who was stressing out that their laptop wouldn’t work by tomorrow, not only was it a true hidden gem to find a service that offered tech support 24/7, but to also speak with someone like Nick who is incredibly helpful, knowledgeable and knows how to turn any situation into a positive. I could not recommend TechSimple-TO enough!'
  },
  {
    name: 'Jack W.',
    quote: 'This company was exactly what I needed. They designed and assembled an incredibly powerful computer for me complete with remote rec support as well as helping my to generate spreadsheets and tech solutions specific to my business. Can’t say enough good things about this company!'
  }
];

const Home: React.FC = () => (
  <section className={styles.wrapper}>
    <div className={styles.intro}>
      <h2 className={styles.title}>Welcome to TechSimple-TO</h2>
      <p className={styles.lead}>
        We specialize in tech support, PC builds, and administrative solutions tailored for small businesses.
        Let us simplify technology for you.
      </p>
    </div>

    <h3>What Clients Are Saying</h3>
      <div className={styles.cardGrid}>
    {testimonials.map((t, i) => (
      <div className={styles.card} key={i}>
        <p className={styles.stars}>★★★★★</p>
        <p style={{ fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
        <p className={styles.name}>{t.name}</p>
      </div>
    ))}
</div>
  </section>
);

export default Home;

