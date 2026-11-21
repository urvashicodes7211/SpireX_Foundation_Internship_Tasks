const products = [
    {
        id: 1,
        name: "Headphones",
        price: 999,
        image: "img/headphones.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1499,
        image: "img/smart_watch.webp"
    },
    {
        id: 3,
        name: "Shoes",
        price: 1999,
        image: "img/shoes.jpg"
    },
    {
        id: 4,
        name: "Backpack",
        price: 799,
        image: "img/backpack.jpg"
    }
];

let cart = [];

const productContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");

function displayProducts(){
    productContainer.innerHTML = "";

    products.forEach(product => {
        productContainer.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function addToCart(id){
    const product = products.find(p => p.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem){
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    displayCart();
}

function increaseQuantity(id){
    const item = cart.find(item => item.id === id);
    item.quantity++;
    displayCart();
}

function decreaseQuantity(id){
    const item = cart.find(item => item.id === id);

    item.quantity--;

    if (item.quantity === 0) {
        removeFromCart(id);
    } else {
        displayCart();
    }
}

function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

function displayCart(){
    cartItems.innerHTML = "";

    if (cart.length === 0){
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    ${item.quantity}
                    <button onclick="increaseQuantity(${item.id})">+</button>

                    <button onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("cart-count").innerText = count;
}

displayProducts();
displayCart();
