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
  if (cart.length === 0) {
    cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty</p>";
    const subtotal = document.getElementById('subtotal');
    subtotal.textContent = `Ksh 0`;
    cartTotal.textContent = `Ksh 0`;
    return;
  }

  let totalPrice = 0;
  const itemsHtml = cart.map(item => {
    const itemTotal = Math.round(item.price * item.quantity * 100) / 100;
    totalPrice += itemTotal;

    return `
      <div class="cart-item">
     <div class="item-details">
     <div class="item-info">
     <div class="item-image">
     <img src="${item.img}" alt="${item.name}" >
     </div>
     <div>
     <h4>${item.name}</h4>
      <p class="price">Ksh ${item.price.toLocaleString()}</p>
     </div>
      
    </div>
  </div>

  <div class="item-total">
    <p>Ksh ${itemTotal.toLocaleString()}</p>
    <div class="item-quantity">
      <button class="quantity-btn minus" data-id="${item.id}">-</button>
      <span>${item.quantity}</span>
      <button class="quantity-btn plus" data-id="${item.id}">+</button>
    </div>
    <button class="remove-btn" data-id="${item.id}">Remove</button>
  </div>
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


let promoApplied = false;
let promoDiscount = 0;



const cartItemsContainer = document.getElementById('cart-items-container');
const itemCountElement = document.getElementById('item-count');
const subtotalElement = document.getElementById('subtotal');
const shippingElement = document.getElementById('shipping');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('cart-total-price');
const cartCountElement = document.querySelector('.cart-count');
const notification = document.getElementById('notification');
const overlay = document.getElementById('overlay');
const mpesaPrompt = document.getElementById('mpesa-prompt');
const mpesaAmount = document.getElementById('mpesa-amount');
const mpesaConfirm = document.getElementById('mpesa-confirm');
const mpesaCancel = document.getElementById('mpesa-cancel');
const continueShoppingBtn = document.getElementById('continue-shopping');
const subscribeBtn = document.getElementById('subscribe-button');

continueShoppingBtn.addEventListener('click', () => {
  window.location.href = '../index.html';
});

subscribeBtn.addEventListener('click', handleSubscribe);

// Payment method elements
const paymentMethods = document.querySelectorAll('input[name="payment"]');
const mpesaDetails = document.getElementById('mpesa-details');
const creditCardDetails = document.getElementById('credit-card-details');
const paypalDetails = document.getElementById('paypal-details');
const checkoutButton = document.getElementById('checkout-button');
const applyPromoButton = document.getElementById('apply-promo');
const promoCodeInput = document.getElementById('promo-code');



paymentMethods.forEach(method => {
  method.addEventListener('change', handlePaymentMethodChange);
});

// Checkout button
checkoutButton.addEventListener('click', handleCheckout);

// M-Pesa prompt buttons
mpesaConfirm.addEventListener('click', handleMpesaConfirm);
mpesaCancel.addEventListener('click', handleMpesaCancel);

// Apply promo button
applyPromoButton.addEventListener('click', applyPromoCode);


function handlePaymentMethodChange(e) {
  // Hide all payment details
  mpesaDetails.classList.remove('active');
  creditCardDetails.classList.remove('active');
  paypalDetails.classList.remove('active');

  // Show selected payment details
  const method = e.target.value;
  if (method === 'mpesa') {
    mpesaDetails.classList.add('active');
  } else if (method === 'credit-card') {
    creditCardDetails.classList.add('active');
  } else if (method === 'paypal') {
    paypalDetails.classList.add('active');
  }
}


// Handle checkout
function handleCheckout() {
  if (cartItems.length === 0) {
    showNotification('Your cart is empty!');
    return;
  }

  const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked').value;

  if (selectedPaymentMethod === 'mpesa') {
    const phoneInput = document.getElementById('mpesa-phone');
    if (!phoneInput.value.match(/[0-9]{10}/)) {
      showNotification('Please enter a valid M-Pesa phone number (10 digits)');
      phoneInput.focus();
      return;
    }

    // Show M-Pesa prompt
    const total = parseFloat(totalElement.textContent.replace('Ksh ', ''));
    mpesaAmount.textContent = `Ksh ${total.toFixed(2)}`;
    mpesaPrompt.classList.add('active');
    overlay.classList.add('active');

  } else if (selectedPaymentMethod === 'credit-card') {
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('card-name');

    if (!cardNumber.value.match(/[0-9\s]{13,19}/)) {
      showNotification('Please enter a valid card number');
      cardNumber.focus();
      return;
    } else if (!expiryDate.value.match(/(0[1-9]|1[0-2])\/[0-9]{2}/)) {
      showNotification('Please enter a valid expiry date (MM/YY)');
      expiryDate.focus();
      return;
    } else if (!cvv.value.match(/[0-9]{3,4}/)) {
      showNotification('Please enter a valid CVV (3-4 digits)');
      cvv.focus();
      return;
    } else if (cardName.value.trim() === '') {
      showNotification('Please enter the name on your card');
      cardName.focus();
      return;
    }

    // Simulate successful payment processing
    showNotification('Payment processed successfully!');

    // In a real application, you would redirect to a success page or process the payment
    setTimeout(() => {
      alert('Order placed successfully! Thank you for your purchase.');
      // Clear cart after successful purchase
      cartItems = [];
      updateCart();
    }, 2000);

  } else if (selectedPaymentMethod === 'paypal') {
    // Simulate PayPal redirect
    showNotification('Redirecting to PayPal...');

    setTimeout(() => {
      alert('PayPal payment completed successfully! Thank you for your purchase.');
      // Clear cart after successful purchase
      cartItems = [];
      updateCart();
    }, 2000);
  }
}

// Handle M-Pesa confirmation
function handleMpesaConfirm() {
  const phone = document.getElementById('mpesa-phone').value;
  const amount = mpesaAmount.textContent;

  // Simulate M-Pesa processing
  showNotification(`M-Pesa prompt sent to ${phone}. Please check your phone.`);

  // Simulate receiving payment after delay
  setTimeout(() => {
    mpesaPrompt.classList.remove('active');
    overlay.classList.remove('active');
    showNotification('M-Pesa payment received! Order confirmed.');

    // Clear cart after successful purchase
    setTimeout(() => {
      alert(`Payment of ${amount} received successfully! Thank you for your purchase.`);
      cartItems = [];
      updateCart();
    }, 1500);
  }, 3000);
}

// Handle M-Pesa cancellation
function handleMpesaCancel() {
  mpesaPrompt.classList.remove('active');
  overlay.classList.remove('active');
  showNotification('M-Pesa payment cancelled.');
}

// Apply promo code
function applyPromoCode() {
  const code = promoCodeInput.value.trim();

  if (code === '') {
    showNotification('Please enter a promo code');
    return;
  }

  // Simulate checking valid promo codes
  if (code === 'FISH20') {
    promoApplied = true;
    promoDiscount = 0.2; // 20% discount
    updateCartSummary();
    showNotification('Promo code applied! 20% discount on your order.');
  } else if (code === 'FREESHIP') {
    promoApplied = true;
    // For free shipping, we'll set a flag and handle it in updateCartSummary
    showNotification('Promo code applied! Free shipping on your order.');
  } else {
    showNotification('Invalid promo code. Please try again.');
  }
}


// Handle subscription
function handleSubscribe() {
  const emailInput = document.querySelector('#deals-page input[type="email"]');
  const email = emailInput.value.trim();

  if (email === '' || !email.includes('@')) {
    showNotification('Please enter a valid email address');
    return;
  }

  showNotification(`Thank you for subscribing with ${email}! You'll receive our latest deals.`);
  emailInput.value = '';
}