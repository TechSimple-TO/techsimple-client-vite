import React, { useState } from 'react';
import { send } from 'emailjs-com';
import styles from './Contact.module.scss';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', title: '', message: '' });
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.title || !form.message || !validEmail(form.email)) {
      setStatus({ ok: false, msg: 'Please fill all fields with a valid email.' });
      return;
    }
    try {
      await send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        form,
        import.meta.env.VITE_EMAILJS_USER_ID!
      );
      setStatus({ ok: true, msg: 'Message sent successfully!' });
      setForm({ name: '', email: '', title: '', message: '' });
    } catch {
      setStatus({ ok: false, msg: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <div>
      <h2>Contact</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.group}>
          <label>Name:</label>
          <input className={styles.input} name="name" value={form.name} onChange={onChange} required />
        </div>
        <div className={styles.group}>
          <label>Email:</label>
          <input className={styles.input} type="email" name="email" value={form.email} onChange={onChange} required />
        </div>
        <div className={styles.group}>
          <label>Title:</label>
          <input className={styles.input} name="title" value={form.title} onChange={onChange} required />
        </div>
        <div className={styles.group}>
          <label>Message:</label>
          <textarea className={styles.textarea} name="message" value={form.message} onChange={onChange} required />
        </div>
        <button className={styles.button} type="submit">Send Message</button>
        {status && (
          <p className={`${styles.status} ${status.ok ? styles.success : styles.error}`}>{status.msg}</p>
        )}
      </form>
    </div>
  );
};

export default Contact;
