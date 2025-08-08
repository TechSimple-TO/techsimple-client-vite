import React, { useState } from 'react';

interface Option {
  label: string;
  price: number;
}

interface ComponentSelectorProps {
  label: string;
  options: Option[];
  onSelect: (option: Option) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ label, options, onSelect }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label><strong>{label}:</strong></label>
      <select onChange={(e) => onSelect(options[parseInt(e.target.value)])} style={{ width: '100%', padding: '0.5rem' }}>
        <option value="">Select {label}</option>
        {options.map((opt, idx) => (
          <option value={idx} key={idx}>{opt.label} (${opt.price})</option>
        ))}
      </select>
    </div>
  );
};

const QuoteSummary: React.FC<{ selections: Record<string, Option | null> }> = ({ selections }) => {
  const total = Object.values(selections).reduce((sum, val) => val ? sum + val.price : sum, 0);
  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '6px' }}>
      <h3>Quote Summary</h3>
      <ul>
        {Object.entries(selections).map(([key, val]) => (
          <li key={key}>{key}: {val ? `${val.label} ($${val.price})` : 'Not selected'}</li>
        ))}
      </ul>
      <h4>Total: ${total}</h4>
    </div>
  );
};

const QuotePage: React.FC = () => {
  const componentOptions: Record<string, Option[]> = {
    CPU: [
      { label: 'AMD Ryzen 5 7600X', price: 220 },
      { label: 'Intel Core i5-13600K', price: 250 },
      { label: 'AMD Ryzen 7 7800X3D', price: 380 }
    ],
    GPU: [
      { label: 'NVIDIA RTX 4060', price: 299 },
      { label: 'AMD Radeon RX 7700 XT', price: 450 },
      { label: 'NVIDIA RTX 4070 Super', price: 599 }
    ],
    RAM: [
      { label: '16GB DDR5 5600MHz', price: 75 },
      { label: '32GB DDR5 6000MHz', price: 140 },
      { label: '64GB DDR5 6000MHz', price: 250 }
    ]
  };

  const [selections, setSelections] = useState<Record<string, Option | null>>({
    CPU: null,
    GPU: null,
    RAM: null
  });

  const updateSelection = (type: string) => (option: Option) => {
    setSelections(prev => ({ ...prev, [type]: option }));
  };

  return (
    <section className="fade-in">
      <h2>Custom PC Quote</h2>
      <p>Select your components below to generate a price estimate for your build.</p>

      {Object.entries(componentOptions).map(([type, options]) => (
        <ComponentSelector key={type} label={type} options={options} onSelect={updateSelection(type)} />
      ))}

      <QuoteSummary selections={selections} />
    </section>
  );
};

export default QuotePage;
