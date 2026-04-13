const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const productButtons = document.querySelectorAll('.add-to-cart');
const newsletterForm = document.getElementById('newsletter-form');

const cart = [];

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

function updateCartDisplay() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>${item.quantity} × ${formatPrice(item.price)}</p>
      </div>
      <button data-index="${index}">Remove</button>
    `;

    cartItem.querySelector('button').addEventListener('click', () => {
      removeItem(index);
    });

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = formatPrice(total);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty. Add a product to get started.</p>';
  }
}

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

productButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    addToCart(name, price);
    cartModal.classList.add('active');
    cartModal.setAttribute('aria-hidden', 'false');
  });
});

openCartBtn.addEventListener('click', () => {
  cartModal.classList.add('active');
  cartModal.setAttribute('aria-hidden', 'false');
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.remove('active');
  cartModal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.classList.remove('active');
    cartModal.setAttribute('aria-hidden', 'true');
  }
});

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector('input');
  alert(`Thanks for subscribing, ${input.value}!`);
  input.value = '';
});

updateCartDisplay();
