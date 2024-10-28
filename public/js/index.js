const path = "./../images/";
const imageArray = ["pharmacist.jpg", "pharmacist_showing.jpg", "health_drugs.jpg"];
let index = 0;

// Cache DOM Elements
const carouselImage = document.getElementById("carousel-image");
const checkoutButton = document.getElementById("checkout");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const closeSearch = document.getElementById("close-search");
const userIcon = document.getElementById("user-icon");
const cartItemsContainer = document.getElementById("cart-items");
const cartIcon = document.getElementById("shopping-cart");
const cartDropdown = document.getElementById("cart-dropdown");

let openTimeout, closeTimeout;

// Carousel Image Update Function
const updateImage = () => {
    carouselImage.classList.remove("show");
    setTimeout(() => {
        carouselImage.src = `${path}${imageArray[index]}`;
        carouselImage.classList.add("show");
        index = (index + 1) % imageArray.length;
    }, 500);
};

// Start Carousel Function
const startCarousel = () => {
    updateImage();
    setInterval(updateImage, 3000);
};

// Cart Dropdown Hover Delay
const showCartDropdown = () => {
    clearTimeout(closeTimeout); // Cancel any pending close action
    cartDropdown.classList.remove("hidden");
};

const hideCartDropdown = () => {
    closeTimeout = setTimeout(() => {
        cartDropdown.classList.add("hidden");
    }, 300); // Adjust delay as needed
};

// Search Functionality
const searchProducts = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const allProducts = document.querySelectorAll("[data-container] > .card");

    allProducts.forEach(product => {
        const productName = product.querySelector("[data-product-name]").textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = ""; // Show matching product
        } else {
            product.style.display = "none"; // Hide non-matching product
        }
    });
};

// Document Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    startCarousel();

    checkoutButton?.addEventListener("click", () => {
        window.location.href = "/checkout";
    });

    searchBtn?.addEventListener("click", () => {
        searchInput.disabled = !searchInput.disabled;
        if (!searchInput.disabled) {
            searchInput.focus();
            searchProducts(); // Call search function when search is opened
        }
    });

    closeSearch?.addEventListener("click", () => {
        searchInput.disabled = true;
        searchInput.value = ""; // Clear search input
        searchProducts(); // Reset product display
    });

    userIcon?.addEventListener("click", () => {
        window.location.href = "/login";
    });

    cartIcon.addEventListener("mouseenter", showCartDropdown);
    cartDropdown.addEventListener("mouseenter", showCartDropdown);
    cartIcon.addEventListener("mouseleave", hideCartDropdown);
    cartDropdown.addEventListener("mouseleave", hideCartDropdown);
});

// Carousel Navigation Buttons
document.querySelectorAll("#carousel button").forEach((button, idx) => {
    button.addEventListener("click", () => {
        index = (index + (idx === 0 ? -1 : 1) + imageArray.length) % imageArray.length;
        updateImage();
    });
});

// Construct HTML for Product Items
const itemConstruct = (prodName, prodPrice, prodImageURL, prodId) => `
    <div id="${prodId}" class="card min-w-56 max-w-56 mb-4 snap-center rounded border-2 border-tertiary-500 md:snap-end">
        <div class="card-top">
            <img data-product-img src="${prodImageURL}" alt="${prodName}" />
        </div>
        <div class="card-bot flex flex-col flex-wrap p-6 px-4 shadow-lg shadow-tertiary-500">
            <h2 data-product-name class="md:text-md text-center text-sm text-tertiary-100">${prodName}</h2>
            <p class="md:text-md py-6 text-center text-sm text-tertiary-200 md:py-4">₱ <span data-product-price>${prodPrice.toFixed(2)}</span></p>
            <div class="flex justify-center">
                <button data-add-to-cart class="rounded border-2 border-primary-500 bg-primary-500 p-2 px-9 text-tertiary-800 hover:scale-105 hover:bg-primary-600 active:scale-110" type="button">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
`;

const cartItemConstruct = () => {

}

// Add to Cart Functionality
const addToCart = async (product) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("User ID is not available. Please log in.");
        return;
    }

    try {
        const response = await fetch(`/cart/${userId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Network response was not ok');
        }

        updateCartDisplay();
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

// Update Cart Display Function
const updateCartDisplay = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("User ID is not available. Please log in.");
        return;
    }

    try {
        const response = await fetch(`/cart/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch cart');

        const cart = await response.json();
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = cart.items
                .map(item => `
                    <li data-cart-item class="flex items-center border justify-center gap-2">
                        <img class="max-w-24" src="${item.product.imageUrl}" alt="${item.product.name}">
                        <p id="prodName">${item.product.name}</p>
                          <div class="flex flex-col gap-2 justify-center items-center">

                              <div class="flex border border-primary-400">
                                <button id="minus-item" class="border-2 px-[.10rem] bg-primary-400 hover:bg-primary-700 border-primary-400 hover:border-primary-700  active:scale-110">
                                  <span class="text-tertiary-600 align-text-top font-bold ">
                                  -
                                  </span>
                                </button>
                                <input id="qty-item" class="max-w-4 text-center" type="number" value="${item.quantity}" min="1">
                                <button id="add-item" class="border-2 bg-primary-400 hover:bg-primary-700 border-primary-400 hover:border-primary-700 active:scale-110">
                                  <span class="text-tertiary-600 align-text-top font-bold ">
                                  +
                                  </span>
                                </button>
                              </div>

                            <button id="del-item" class="hover:scale-105 active:scale-125 hover:stroke-red-600 stroke-red-700" type="button">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="" class="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        <div class="hidden">
                            ${item.product.name} - ₱${item.product.price.toFixed(2)} (x${item.quantity})
                        </div>
                    </li>
                `)
                .join("");
            document.querySelector("[data-cart-total]").textContent = cart.items
                .reduce((total, item) => total + (item.product.price * item.quantity), 0)
                .toFixed(2);
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
};

// Fetch and Display Products
const fetchProducts = async () => {
    try {
        const response = await fetch("/products");
        const products = await response.json();

        const categories = ["prescription", "featured", "babies", "personal"];
        categories.forEach(category => {
            const container = document.querySelector(`[data-container-${category}]`);
            if (container) container.innerHTML = "";
        });

        products.forEach(product => {
            const categoryContainer = document.querySelector(`[data-container-${product.category}]`);
            if (categoryContainer) {
                const html = itemConstruct(product.name, product.price, product.imageURL || product.imageUrl || "", product._id);
                categoryContainer.innerHTML += html;
            }
        });

        document.querySelectorAll("[data-add-to-cart]").forEach(button => {
            button.addEventListener("click", () => {
                const productContainer = button.closest("[id]");
                const product = {
                    id: productContainer.id,
                    name: productContainer.querySelector("[data-product-name]").textContent,
                    price: parseFloat(productContainer.querySelector("[data-product-price]").textContent),
                    imageURL: productContainer.querySelector("img").src
                };
                addToCart(product);
            });
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Initialize cart display and fetch products on load
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();
    fetchProducts();
});

