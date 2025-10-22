// main.js

// --- Admin page: load orders ---
async function loadOrders() {
  const ordersDiv = document.getElementById('orders');
  if (!ordersDiv) return; // skip if not on admin page

  const res = await fetch('/api/orders', { credentials: 'include' });
  if (res.status === 401) {
    ordersDiv.innerText = 'Login required (use your browser to log in)';
    return;
  }

  const data = await res.json();
  const html = data.map(o => `
    <div class="order">
      <b>#${o.id} ${o.type}</b> — ${o.product} — ${o.qty} — ${o.price} — ${o.name} — ${o.phone} — <i>${o.status}</i>
      <br>
      <button onclick="updateOrder(${o.id}, 'approved')">Approve</button>
      <button onclick="updateOrder(${o.id}, 'rejected')">Reject</button>
    </div>`).join('');

  ordersDiv.innerHTML = html;
}

async function updateOrder(id, status) {
  const res = await fetch('/api/orders/' + id, {
    method: 'PUT',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ status })
  });

  if (res.ok) loadOrders();
}

window.updateOrder = updateOrder;

// --- Webapp page: submit order ---
function initOrderForm() {
  const form = document.getElementById('orderForm');
  const resultDiv = document.getElementById('result');
  if (!form) return; // skip if not on webapp page

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload.qty = Number(payload.qty);
    payload.price = Number(payload.price);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const j = await res.json();

      if (j.success) {
        resultDiv.innerText = 'Order submitted successfully. Order ID: ' + j.id;
        form.reset();
      } else {
        resultDiv.innerText = 'Error: ' + (j.error || 'Unknown');
      }
    } catch (err) {
      resultDiv.innerText = 'Network error';
    }
  });
}

// --- Initialize pages ---
document.addEventListener('DOMContentLoaded', () => {
  loadOrders();
  initOrderForm();
});
