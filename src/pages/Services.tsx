import React from 'react';

const services = [
  {
    title: 'Custom PC Builds',
    description: 'Expertly built systems tailored to your needs, whether it’s gaming, work, or content creation.'
  },
  {
    title: 'Tech Support',
    description: 'Reliable remote or on-site support for all your devices and software.'
  },
  {
    title: 'Admin Solutions',
    description: 'Streamline your small business operations with efficient administrative support.'
  }
];

const Services: React.FC = () => (
  <section className="fade-in">
    <h2>Our Services</h2>
    <div className="card-grid">
      {services.map((service, index) => (
        <div className="card" key={index}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;