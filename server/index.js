import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import { create } from 'xmlbuilder2';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const DATA_PATH = join(__dirname, 'data', 'quotes.json');

app.use(cors());                // enable CORS for dev with separate Vite server
app.use(express.json());        // parse JSON bodies

// Helper: read & write store
async function readStore() {
  const raw = await fs.readFile(DATA_PATH, 'utf-8').catch(async () => {
    await fs.writeFile(DATA_PATH, '[]', 'utf-8');
    return '[]';
  });
  return JSON.parse(raw);
}

async function writeStore(items) {
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), 'utf-8');
}

// Model structure:
// { id, name, components: { CPU, GPU, RAM }, total, createdAt }
function validateQuote(body) {
  if (!body) return 'Missing body';
  if (typeof body.name !== 'string' || !body.name.trim()) return 'Missing/invalid "name"';
  if (!body.components || typeof body.components !== 'object') return 'Missing "components"';
  const { CPU, GPU, RAM } = body.components;
  if (!CPU || !GPU || !RAM) return 'Components must include CPU, GPU, and RAM';
  if (typeof body.total !== 'number' || body.total < 0) return 'Missing/invalid "total"';
  return null;
}

// REST: GET all
app.get('/api/quotes', async (req, res) => {
  const items = await readStore();
  res.json(items);
});

// REST: GET one
app.get('/api/quotes/:id', async (req, res) => {
  const items = await readStore();
  const item = items.find(q => q.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// REST: POST create
app.post('/api/quotes', async (req, res) => {
  const err = validateQuote(req.body);
  if (err) return res.status(400).json({ error: err });

  const items = await readStore();
  const now = new Date().toISOString();
  const newItem = { id: uuid(), createdAt: now, ...req.body };
  items.push(newItem);
  await writeStore(items);
  res.status(201).json(newItem);
});

// REST: PUT update (replace)
app.put('/api/quotes/:id', async (req, res) => {
  const err = validateQuote(req.body);
  if (err) return res.status(400).json({ error: err });

  const items = await readStore();
  const idx = items.findIndex(q => q.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const existing = items[idx];
  const updated = { ...req.body, id: existing.id, createdAt: existing.createdAt, updatedAt: new Date().toISOString() };
  items[idx] = updated;
  await writeStore(items);
  res.json(updated);
});

// REST: DELETE
app.delete('/api/quotes/:id', async (req, res) => {
  const items = await readStore();
  const idx = items.findIndex(q => q.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const removed = items.splice(idx, 1)[0];
  await writeStore(items);
  res.json(removed);
});

// XML endpoint (JSON -> XML)
app.get('/api/quotes.xml', async (req, res) => {
  const items = await readStore();
  const doc = create({ version: '1.0' })
    .ele('quotes')
    .ele(items.map(q => ({
      quote: {
        id: q.id,
        name: q.name,
        total: q.total,
        createdAt: q.createdAt,
        components: {
          CPU: q.components.CPU,
          GPU: q.components.GPU,
          RAM: q.components.RAM
        }
      }
    })))
    .end({ prettyPrint: true });

  res.type('application/xml').send(doc);
});

// (Optional) Serve built frontend for production
// import { join } from 'path';
// app.use(express.static(join(__dirname, '../dist')));
// app.get('*', (req, res) => res.sendFile(join(__dirname, '../dist/index.html')));

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
