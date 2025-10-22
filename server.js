// server.js
import express from 'express';
import open from 'open';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // parse JSON
app.use(express.static(path.join(__dirname, 'public')));

// --- Example API routes for orders ---
// You should replace these with your real backend logic
let orders = []; // temporary in-memory storage

// Get all orders (admin)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Create new order (webapp)
app.post('/api/orders', (req, res) => {
  const id = orders.length + 1;
  const order = { id, status: 'pending', ...req.body };
  orders.push(order);
  res.json({ success: true, id });
});

// Update order status (admin)
app.put('/api/orders/:id', (req, res) => {
  const id = Number(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = req.body.status || order.status;
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  
  // Open webapp.html automatically
  open(`http://localhost:${PORT}/webapp.html`);
});
