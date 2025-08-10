import React from 'react';
import styles from './Services.module.scss';

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
  <section className={styles.wrapper}>
    <h2 className={styles.title}> Our Services </h2>
    <div className={styles.cardGrid}>
      {services.map((service, index) => (
        <div className={styles.card} key={index}>
          <h3> {service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;