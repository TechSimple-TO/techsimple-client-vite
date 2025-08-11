import React from 'react';
import styles from './About.module.scss';

const About: React.FC = () => (
  <section className={styles.wrapper} fade-in>
    <h2>About TechSimple-TO</h2>
    <p>Founded in Toronto, TechSimple-TO is your trusted partner in all things tech. We blend technical expertise with a personal approach to deliver effective, no-nonsense solutions.</p>
  </section>
);

export default About;