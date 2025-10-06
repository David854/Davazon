// Davazon deluxe cart + toast + sidebar + smooth scroll + in-view cards

// Elements
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');

const cartToggle = document.getElementById('cartToggle');
const cartDropdown = document.getElementById('cartDropdown');
const cartClose = document.getElementById('cartClose');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const addButtons = document.querySelectorAll('.add-to-cart');
const toastsContainer = document.getElementById('toasts');
const productCards = document.querySelectorAll('.card');

let cart = {}; // { id: { id, name, price, img, qty } }
let cartCount = 0;

// ========== SIDEBAR HANDLERS ==========
menuBtn.addEventListener('click', () => {
  sidebar.style.left = '0px';
  overlay.classList.add('show');
});
closeSidebar.addEventListener('click', () => closeMenu());
overlay.addEventListener('click', () => closeMenu());
function closeMenu() {
  sidebar.style.left = '-320px';
  overlay.classList.remove('show');
}

// smooth-close after clicking sidebar link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => closeMenu());
});

// ========== ADD TO CART ==========
addButtons.forEach(btn =>
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.product');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const img = card.dataset.img;

    addToCart({ id, name, price, img });
  })
);

function addToCart(item) {
  if (!cart[item.id]) {
    cart[item.id] = { ...item, qty: 1 };
  } else {
    cart[item.id].qty += 1;
  }
  cartCount += 1;
  updateCartUI();
  showToast(item.name);
}

// ========== CART UI RENDER ==========
function updateCartUI() {
  // ✅ Remember open state before re-rendering
  const wasOpen = cartDropdown.classList.contains('open');

  // update count
  cartCountEl.textContent = cartCount;

  // render items
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    cartItemsContainer.innerHTML = `<div class="empty">Your cart is empty</div>`;
    cartTotalEl.textContent = `$0.00`;
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;
  cartItemsContainer.innerHTML = '';
  let total = 0;

  ids.forEach(id => {
    const it = cart[id];
    total += it.price * it.qty;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.dataset.id = id;
    itemEl.innerHTML = `
      <img src="${it.img}" alt="${escapeHtml(it.name)}"/>
      <div class="ci-info">
        <div class="ci-name">${escapeHtml(it.name)}</div>
        <div class="ci-price">$${(it.price).toFixed(2)}</div>
      </div>
      <div class="ci-controls">
        <button class="qty-btn minus">−</button>
        <div class="qty-num">${it.qty}</div>
        <button class="qty-btn plus">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);

    // wire up plus/minus
    itemEl.querySelector('.plus').addEventListener('click', () => {
      cart[id].qty += 1;
      cartCount += 1;
      updateCartUI();
    });
    itemEl.querySelector('.minus').addEventListener('click', () => {
      cart[id].qty -= 1;
      cartCount -= 1;
      if (cart[id].qty <= 0) delete cart[id];
      updateCartUI();
    });
  });

  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  // ✅ Restore open state if it was open before update
  if (wasOpen) {
    cartDropdown.classList.add('open');
    cartDropdown.setAttribute('aria-hidden', 'false');
    cartToggle.setAttribute('aria-expanded', 'true');
  }
}

// helper to avoid XSS in product names inserted as HTML
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s])
  );
}

// ========== CART DROPDOWN TOGGLE ==========
cartToggle.addEventListener('click', (e) => {
  const open = cartDropdown.classList.toggle('open');
  cartDropdown.setAttribute('aria-hidden', String(!open));
  cartToggle.setAttribute('aria-expanded', String(open));
});

// close button inside dropdown
cartClose.addEventListener('click', () => {
  cartDropdown.classList.remove('open');
  cartDropdown.setAttribute('aria-hidden', 'true');
  cartToggle.setAttribute('aria-expanded', 'false');
});

// ✅ Bulletproof: Keep cart open when interacting inside
document.addEventListener('click', (e) => {
  const clickedInsideCart = cartDropdown.contains(e.target);
  const clickedCartToggle = cartToggle.contains(e.target);
  if (!clickedInsideCart && !clickedCartToggle) {
    cartDropdown.classList.remove('open');
    cartDropdown.setAttribute('aria-hidden', 'true');
    cartToggle.setAttribute('aria-expanded', 'false');
  }
});

// ========== TOASTS ==========
function showToast(productName) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `✅ <strong>${escapeHtml(productName)}</strong> added to cart`;
  toastsContainer.appendChild(toast);

  // Animation in
  toast.style.transform = 'translateX(0)';
  toast.style.opacity = '1';

  // Animation out
  setTimeout(() => {
    toast.style.transition = 'transform .35s, opacity .35s';
    toast.style.transform = 'translateX(24px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 380);
  }, 2600);
}

// ========== SEARCH FILTER ==========
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  document.querySelectorAll('.product').forEach(p => {
    const name = p.dataset.name.toLowerCase();
    p.style.display = name.includes(term) ? '' : 'none';
  });
});

// ========== IN-VIEW ANIMATION for cards ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('inview');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

productCards.forEach(card => observer.observe(card));

// ========== INIT ==========
updateCartUI();
