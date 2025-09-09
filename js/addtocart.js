  import products from "./data.js";    
// ======== USER MENU FUNCTIONALITY ========
const products_grid = document.querySelector('.products-grid');

products.forEach(product => {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');
  productCard.dataset.id = product.id;

  productCard.innerHTML = `
    <div class="product-img">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <span class="product-price">ksh ${product.price.toFixed(2)}</span>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;

  products_grid.appendChild(productCard);
});

  
  
  const userDropdown = document.querySelector('.user-dropdown');
        const userBtn = document.querySelector('.user-menu');
        userBtn.addEventListener('click', function(e) {
          userDropdown.classList.toggle('show-menu');
          console.log('User menu clicked');
        });

// ======== FIXED CART FUNCTIONALITY ======== 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total-price');
const cartbtn = document.querySelector('.cart-btn');

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
    const addToCartButton = productCard.querySelector('.add-to-cart');
    const productId = productCard.dataset.id || generateUniqueId(productCard);

    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      img: productImg
    });
                addToCartButton.innerHTML = 'Item Added';
                addToCartButton.disabled = true;
    setTimeout(() => {
                addToCartButton.innerHTML = `<i class="fas fa-cart-plus"></i> Add to Cart`;
                addToCartButton.classList.remove('added');
                addToCartButton.disabled = false;
    }, 2000);
  });
});

cartbtn?.addEventListener('click', () => {
  window.location.href = 'cart.html';
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
  // ✅ Only update if element exists
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalItems;

  localStorage.setItem('cart', JSON.stringify(cart));

  if (cartItems && cartTotal) {
    renderCartItems();
  }
}

// Render cart items to the DOM


function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCart();
}

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

if (cartItems) {
  cartItems.addEventListener('click', (e) => {
    const btn = e.target;
    const itemId = btn.dataset.id;

    if (btn.classList.contains('remove-item')) {
      removeFromCart(itemId);
    } else if (btn.classList.contains('quantity-btn')) {
      const change = btn.classList.contains('plus') ? 1 : -1;
      updateQuantity(itemId, change);
    }
  });
}

// ✅ Initialize cart counter on all pages
document.addEventListener('DOMContentLoaded', () => {
  updateCart();
});
