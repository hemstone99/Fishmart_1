// ======== FIXED CART FUNCTIONALITY ======== 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total-price');

// Add to Cart Buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    if (!productCard) return;

    const productName = productCard.querySelector('.product-name')?.textContent.trim() || 'Unnamed';
    const priceText = productCard.querySelector('.product-price')?.textContent || '0';
    const productPrice = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;

    const productImgEl = productCard.querySelector('.product-img img');
    const productImg = productImgEl ? productImgEl.src : '';

    const productId = productCard.dataset.id || generateUniqueId(productCard);

    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      img: productImg
    });
  });
});

// Generate unique ID for items
function generateUniqueId(element) {
  if (!element.dataset.id) {
    element.dataset.id = 'prod-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  return element.dataset.id;
}

// Add item to cart
function addToCart(item) {
  const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity++;
  } else {
    item.quantity = 1;
    cart.push(item);
  }

  updateCart();
}

// Update the cart
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart items in the DOM
  renderCartItems();
}

// Render cart items to the DOM
function renderCartItems() {
  let totalPrice = 0;

  const itemsHtml = cart.map(item => {
    const itemTotal = Math.round(item.price * item.quantity * 100) / 100;
    totalPrice += itemTotal;

    return `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class='item-image '>
        <div class="item-details">
          <h4>${item.name}</h4>
          <p>Ksh ${item.price.toLocaleString()}</p>
          <div class="item-quantity">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="item-total">Ksh ${itemTotal.toLocaleString()}</div>
        <button class="remove-btn" data-id="${item.id}">remove</button>
      </div>
    `;
      
  }).join('');

  cartItems.innerHTML = itemsHtml;
   const subtotal = document.getElementById('subtotal');
    subtotal.textContent = `Ksh ${totalPrice.toLocaleString()}`;
  cartTotal.textContent = `Ksh ${totalPrice.toLocaleString()}`;
}

// Remove an item from the cart
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCart();
}

// Update item quantity
function updateQuantity(itemId, change) {
  const itemIndex = cart.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCart();
    }
  }
}

// Event Delegation for Quantity and Remove Buttons
cartItems.addEventListener('click', (e) => {
  const btn = e.target;
  const itemId = btn.dataset.id;

  if (btn.classList.contains('remove-btn')) {
    removeFromCart(itemId);
  } else if (btn.classList.contains('quantity-btn')) {
    const change = btn.classList.contains('plus') ? 1 : -1;
    updateQuantity(itemId, change);
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCart();
});
