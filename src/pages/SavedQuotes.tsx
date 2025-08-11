import React, { useEffect, useState } from 'react';
import styles from './SavedQuotes.module.scss';

type Quote = {
  id: string;
  name: string;
  total: number;
  createdAt: string;
  updatedAt?: string;
  components: { CPU: string; GPU: string; RAM: string; };
};

const API = 'http://localhost:3001/api/quotes';

const SavedQuotes: React.FC = () => {
  const [items, setItems] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  async function load() {
    setLoading(true);
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(x => x.id !== id));
  }

  function startEdit(q: Quote) {
    setEditRow(q.id);
    setEditName(q.name);
  }

  async function saveEdit(q: Quote) {
    const updated = { ...q, name: editName };
    const res = await fetch(`${API}/${q.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    setItems(prev => prev.map(x => x.id === q.id ? data : x));
    setEditRow(null);
  }

  if (loading) return <p>Loading…</p>;

  return (
    <section>
      <h2>Saved Quotes</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.row}>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>CPU</th>
            <th className={styles.th}>GPU</th>
            <th className={styles.th}>RAM</th>
            <th className={styles.th}>Total</th>
            <th className={styles.th}>Created</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(q => (
            <tr className={styles.row} key={q.id}>
              <td className={styles.td}>
                {editRow === q.id ? (
                  <input className={styles.inlineInput} value={editName} onChange={e => setEditName(e.target.value)} />
                ) : q.name}
              </td>
              <td className={styles.td}>{q.components.CPU}</td>
              <td className={styles.td}>{q.components.GPU}</td>
              <td className={styles.td}>{q.components.RAM}</td>
              <td className={styles.td}>${q.total}</td>
              <td className={styles.td}>{new Date(q.createdAt).toLocaleString()}</td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  {editRow === q.id ? (
                    <>
                      <button className={styles.btn} onClick={() => saveEdit(q)}>Save</button>
                      <button className={`${styles.btn} ${styles.secondary}`} onClick={() => setEditRow(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className={styles.btn} onClick={() => startEdit(q)}>Edit</button>
                      <button className={`${styles.btn} ${styles.secondary}`} onClick={() => remove(q.id)}>Delete</button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td className={styles.td} colSpan={7}>No quotes yet — save one from the Quote page.</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default SavedQuotes;
