import React, { useState } from 'react';
import styles from './Quote.module.scss';

interface Option { label: string; price: number; }

interface SelectorProps {
  label: string;
  options: Option[];
  onSelect: (o: Option) => void;
}

const ComponentSelector: React.FC<SelectorProps> = ({ label, options, onSelect }) => (
  <div className={styles.group}>
    <label><strong>{label}:</strong></label>
    <select className={styles.select} onChange={(e) => onSelect(options[parseInt(e.target.value)])}>
      <option value="">Select {label}</option>
      {options.map((opt, idx) => (
        <option value={idx} key={idx}>{opt.label} (${opt.price})</option>
      ))}
    </select>
  </div>
);

const QuoteSummary: React.FC<{ selections: Record<string, Option | null> }> = ({ selections }) => {
  const total = Object.values(selections).reduce((s, v) => (v ? s + v.price : s), 0);
  return (
    <div className={styles.summary}>
      <h3>Quote Summary</h3>
      <ul className={styles.list}>
        {Object.entries(selections).map(([k, v]) => (
          <li key={k}>{k}: {v ? `${v.label} ($${v.price})` : 'Not selected'}</li>
        ))}
      </ul>
      <div className={styles.total}>Total: ${total}</div>
    </div>
  );
};

const QuotePage: React.FC = () => {
  const componentOptions: Record<string, Option[]> = {
    CPU: [
      { label: 'AMD Ryzen 5 7600X', price: 220 },
      { label: 'Intel Core i5-13600K', price: 250 },
      { label: 'AMD Ryzen 7 7800X3D', price: 380 },
    ],
    GPU: [
      { label: 'NVIDIA RTX 4060', price: 299 },
      { label: 'AMD Radeon RX 7700 XT', price: 450 },
      { label: 'NVIDIA RTX 4070 Super', price: 599 },
    ],
    RAM: [
      { label: '16GB DDR5 5600MHz', price: 75 },
      { label: '32GB DDR5 6000MHz', price: 140 },
      { label: '64GB DDR5 6000MHz', price: 250 },
    ],
  };

  const [selections, setSelections] = useState<Record<string, Option | null>>({
    CPU: null, GPU: null, RAM: null,
  });

  return (
    <section className={styles.wrapper}>
      <h2>Custom PC Quote</h2>
      <p>Select your components below to generate a price estimate for your build.</p>

      {Object.entries(componentOptions).map(([type, options]) => (
        <ComponentSelector
          key={type}
          label={type}
          options={options}
          onSelect={(opt) => setSelections(prev => ({ ...prev, [type]: opt }))}
        />
      ))}

      <QuoteSummary selections={selections} />
    </section>
  );
};

export default QuotePage;
