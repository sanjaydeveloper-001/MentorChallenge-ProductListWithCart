document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.prod');
    const cartCount = document.querySelector('.cart-h1-span');
    const cartImg = document.querySelector('.No-items');
    const cartP = document.querySelector('.No-items-p');
    const orderItem = document.getElementById('Ordered-box');
    
    const orderBoxes = [
        document.getElementById('Ob1'),
        document.getElementById('Ob2'),
        document.getElementById('Ob3'),
        document.getElementById('Ob4'),
        document.getElementById('Ob5'),
        document.getElementById('Ob6'),
        document.getElementById('Ob7'),
        document.getElementById('Ob8'),
        document.getElementById('Ob9')
    ];
    
    let totalCartItems = 0;
    let cartData = [];

    products.forEach((product, index) => {
        const addToCart = product.querySelector('.addtocart');
        const cartControls = product.querySelector('.cart-controls');
        const incrementButton = product.querySelector('.increment');
        const decrementButton = product.querySelector('.decrement');
        const quantitySpan = product.querySelector('.quantity');
        const price = parseFloat(product.getAttribute('data-price'));
        
        let quantity = 1;

        cartControls.style.display = 'none';

        addToCart.addEventListener('click', () => {
            addToCart.style.display = 'none';
            cartControls.style.display = 'flex';

            const existingCartItem = cartData.find(item => item.index === index);
            if (existingCartItem) {
                existingCartItem.quantity += quantity;
            } else {
                cartData.push({ index, price, quantity });
            }
            
            totalCartItems += quantity;
            updateCartCount();
            updateOrderBoxes();
        });

        incrementButton.addEventListener('click', () => {
            quantity++;
            quantitySpan.textContent = quantity;
            totalCartItems++;
            
            const existingCartItem = cartData.find(item => item.index === index);
            if (existingCartItem) {
                existingCartItem.quantity = quantity;
            }
            
            updateCartCount();
            updateOrderBoxes(); // Update order boxes when quantity changes
        });

        decrementButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                totalCartItems--;
                
                const existingCartItem = cartData.find(item => item.index === index);
                if (existingCartItem) {
                    existingCartItem.quantity = quantity;
                }
                
                updateCartCount();
                updateOrderBoxes(); // Update order boxes when quantity changes
            } else {
                cartControls.style.display = 'none';
                addToCart.style.display = 'flex';
                totalCartItems--;
                
                const cartItemIndex = cartData.findIndex(item => item.index === index);
                if (cartItemIndex > -1) {
                    cartData.splice(cartItemIndex, 1);
                }
                
                updateCartCount();
                updateOrderBoxes(); // Update order boxes when quantity changes
            }
        });
    });

    function updateCartCount() {
        cartCount.textContent = totalCartItems;
        if (totalCartItems > 0) {
            cartImg.style.display = "none";
            cartP.style.display = "none";
            orderItem.style.display = "block";
        } else {
            cartImg.style.display = "block";
            cartP.style.display = "block";
            orderItem.style.display = "none";
        }
    }

    function updateOrderBoxes() {
        orderBoxes.forEach(box => box.style.display = 'none'); // Hide all order boxes initially
        
        cartData.forEach((item, index) => {
            const box = orderBoxes[index];
            if (box) {
                box.style.display = 'block';
                box.querySelector('h1').textContent = products[item.index].querySelector('h2').textContent;
                box.querySelector('.no').textContent = item.quantity; // Update quantity inside order box
                box.querySelector('h2').textContent = `$${(item.quantity * item.price).toFixed(2)}`;
            }
        });
    }

});
