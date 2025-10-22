// server.js
import express from 'express';
import open from 'open';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Use Render's assigned port (important!)
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Example API routes for orders ---
let orders = [];

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
  console.log(`✅ Server running on port ${PORT}`);

  // ⚠️ Only open browser locally (avoid crashing Render)
  if (process.env.NODE_ENV !== 'production') {
    open(`http://localhost:${PORT}/webapp.html`);
  }
});
