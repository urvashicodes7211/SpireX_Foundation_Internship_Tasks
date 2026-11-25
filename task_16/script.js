
// Mobile Navigation
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// Menu Data
const dishes = [
    {
        name: "Margherita Pizza",
        category: "pizza",
        price: "₹249",
        image: "https://i.pinimg.com/1200x/f9/87/f7/f987f78a64ccd668f11b63f5e273440a.jpg",
        description: "Classic cheese pizza with fresh toppings."
    },
    {
        name: "Veg Supreme Pizza",
        category: "pizza",
        price: "₹299",
        image: "https://i.pinimg.com/736x/5f/bf/fd/5fbffd2be5b71822bc676df3579b2052.jpg",
        description: "Loaded with fresh vegetables and cheese."
    },
    {
        name: "Cheese Burger",
        category: "burger",
        price: "₹179",
        image: "https://static.vecteezy.com/system/resources/previews/036/750/075/non_2x/ai-generated-a-mouthwatering-close-up-of-a-gourmet-burger-with-dripping-cheese-on-white-background-free-photo.jpg",
        description: "Juicy burger with cheese and fresh veggies."
    },
    {
        name: "Veg Burger",
        category: "burger",
        price: "₹149",
        image: "https://i.pinimg.com/1200x/a0/8e/82/a08e8257e207b2ef3966a27bf88bf5c1.jpg",
        description: "Crispy vegetable patty with special sauce."
    },
    {
        name: "Chocolate Cake",
        category: "dessert",
        price: "₹129",
        image: "https://i.pinimg.com/736x/c7/3b/4c/c73b4c353915fa89c55317f219fcac96.jpg",
        description: "Rich and delicious chocolate cake."
    },
    {
        name: "Ice Cream",
        category: "dessert",
        price: "₹99",
        image: "https://i.pinimg.com/736x/fa/b3/eb/fab3ebf9ca504f576f6ed9e9bb2ac504.jpg",
        description: "Creamy ice cream with sweet toppings."
    }
    
];

// Display Menu
const menuContainer = document.getElementById("menuContainer");

function displayMenu(category = "all") {
    menuContainer.innerHTML = "";

    const filteredDishes = category === "all"
        ? dishes
        : dishes.filter(dish => dish.category === category);

    filteredDishes.forEach(dish => {
        menuContainer.innerHTML += `
            <div class="menu-card">
                <img src="${dish.image}" alt="${dish.name}">
                <div class="menu-info">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <span class="price">${dish.price}</span>
                </div>
            </div>
        `;
    });
}

displayMenu();

// Menu Filter
document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter.active").classList.remove("active");
        button.classList.add("active");

        displayMenu(button.dataset.category);
    });
});

// Table Booking
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const bookingMessage = document.getElementById("bookingMessage");

    bookingMessage.textContent =
        `Thank you ${name}! Your table request for ${date} has been received.`;

    bookingForm.reset();
});
