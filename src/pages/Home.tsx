// src/pages/Home.tsx
import React from 'react';

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
  <section className="fade-in">
    <h2>Welcome to TechSimple-TO</h2>
    <p>We specialize in tech support, PC builds, and administrative solutions tailored for small businesses. Let us simplify technology for you.</p>

    <h2 style={{ marginTop: '3rem' }}>What Clients Are Saying</h2>
    <div className="card-grid">
      {testimonials.map((t, i) => (
        <div className="card" key={i}>
          <p style={{ fontSize: '1.2rem', color: '#FFDC82', marginBottom: '0.5rem' }}>★★★★★</p>
          <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>&ldquo;{t.quote}&rdquo;</p>
          <p><strong>{t.name}</strong></p>
        </div>
      ))}
    </div>
  </section>
);

export default Home;
