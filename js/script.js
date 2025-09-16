// Toggle user dropdown
        document.querySelector('.user-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelector('.user-dropdown').classList.toggle('show');
        });
      
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.user-menu')) {
                document.querySelector('.user-dropdown').classList.remove('show');
            }
        });
        
        // Show registration container
        document.getElementById('show-buyer-registration').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('registration-container').style.display = 'block';
            showTab('buyer');
            document.querySelector('.user-dropdown').classList.remove('show');
            window.scrollTo(0, 0);
        });
        
        document.getElementById('show-seller-registration').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('registration-container').style.display = 'block';
            showTab('seller');
            document.querySelector('.user-dropdown').classList.remove('show');
            window.scrollTo(0, 0);
        });
        
        // Tab switching
        function showTab(tabName) {
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabName);
            });
            
            // Show active tab content
            document.getElementById('buyer-registration-form').style.display = 
                tabName === 'buyer' ? 'block' : 'none';
            document.getElementById('seller-registration-form').style.display = 
                tabName === 'seller' ? 'block' : 'none';
        }
        
        // Add click event to tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                showTab(this.dataset.tab);
            });
        });
        
        // OTP functionality
        document.getElementById('request-otp-btn').addEventListener('click', function() {
            const phone = document.getElementById('buyer-phone').value;
            if (!phone) {
                alert("Please enter your phone number first");
                return;
            }
            
            // Simulate OTP request
            alert(`OTP has been sent to ${phone}. In a real application, this would be sent via SMS.`);
            
            // Show OTP section
            document.getElementById('otp-section').style.display = 'block';
        });
        
        // Form submission
        document.getElementById('buyer-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Buyer account created successfully!");
            document.getElementById('registration-container').style.display = 'none';
        });
        
        document.getElementById('seller-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Seller account submitted for admin approval!");
            document.getElementById('registration-container').style.display = 'none';
        });

         // Initialize map (simulated)
        function initMap() {
            const mapContainer = document.getElementById('map-container');
            if (mapContainer) {
                mapContainer.innerHTML = `
                    <div class="map-placeholder">
                        <i class="fas fa-map-marked-alt fa-3x"></i>
                        <p>Kisumu Fish Market Location</p>
                        <small>Map integration would appear here</small>
                    </div>
                `;
            }
        }
        
        // Initialize map when seller tab is shown
        document.querySelector('[data-tab="seller"]').addEventListener('click', initMap);
        
     /*   // Simple cart functionality
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const cartCount = document.querySelector('.cart-count');
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
                
                // Animation effect
                this.innerHTML = '<i class="fas fa-check"></i> Added!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                }, 1500);
            });
        });
        
        // Header cart button animation
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
        
        // Initialize map (simulated)
        function initMap() {
            const mapContainer = document.getElementById('map-container');
            if (mapContainer) {
                mapContainer.innerHTML = `
                    <div class="map-placeholder">
                        <i class="fas fa-map-marked-alt fa-3x"></i>
                        <p>Kisumu Fish Market Location</p>
                        <small>Map integration would appear here</small>
                    </div>
                `;
            }
        }
        
        // Initialize map when seller tab is shown
        document.querySelector('[data-tab="seller"]').addEventListener('click', initMap);

        

        // Create cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.querySelector('.cart-count');
const cartModal = document.querySelector('.cart-modal');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total-price');

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
    const productImg = productCard.querySelector('.product-img img').src;

    // Add item to cart
    addToCart({
      name: productName,
      price: productPrice,
      img: productImg
    });
  });
});

// Cart functions
function addToCart(item) {
  // Check if item already exists in cart
  const existingItem = cart.find(cartItem => cartItem.name === item.name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
  
  updateCart();
}

function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart modal if open
  if (cartModal.style.display === 'block') {
    renderCartItems();
  }
}

function renderCartItems() {
  cartItems.innerHTML = '';
  let totalPrice = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>Ksh ${item.price.toLocaleString()}</p>
          <div class="item-quantity">
            <button class="quantity-btn minus" data-name="${item.name}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-name="${item.name}">+</button>
          </div>
        </div>
        <div class="item-total">Ksh ${itemTotal.toLocaleString()}</div>
        <button class="remove-item" data-name="${item.name}">&times;</button>
      </div>
    `;
  });
  
  cartTotal.textContent = totalPrice.toLocaleString();
  
  // Add event listeners to new buttons
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      removeFromCart(e.target.dataset.name);
    });
  });
  
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      updateQuantity(e.target.dataset.name, -1);
    });
  });
  
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      updateQuantity(e.target.dataset.name, 1);
    });
  });
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

function updateQuantity(name, change) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      updateCart();
    }
  }
}

// Cart modal toggle
document.querySelector('.cart-btn').addEventListener('click', () => {
  cartModal.style.display = 'block';
  renderCartItems();
});

document.querySelector('.close-cart').addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = 'none';
  }
});

// Initialize cart count on page load
window.addEventListener('DOMContentLoaded', () => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
});*/