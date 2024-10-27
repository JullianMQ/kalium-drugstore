async function fetchCartItems() {
    const userId = localStorage.getItem("userId"); // Ensure this retrieves the user ID correctly

    if (!userId) {
        console.error("User ID not found in local storage");
        alert("User ID not found. Please log in.");
        return; // Exit the function if no user ID is found
    }

    console.log("Fetching cart items for user ID:", userId); // Debugging line

    try {
        const response = await fetch(`/cart/${userId}`); // Make sure the URL is constructed correctly
        if (!response.ok) {
            throw new Error("Failed to fetch cart items");
        }
        const cart = await response.json(); // Assuming the response is structured as expected
        console.log("Cart fetched:", cart); // Log the full cart object
        renderCartItems(cart.items || []); // Pass items to render function, defaulting to an empty array if undefined
    } catch (error) {
        console.error("Error fetching cart items:", error);
        alert("Could not fetch cart items. Please try again later.");
    }
}

// Fetch cart items when the page loads
fetchCartItems(); // Ensure this function is called after userId is set

// Function to render cart items in the UI
function renderCartItems(items) {
    const cartContainer = $("#cart-items-container"); // Assuming you have a container to hold cart items
    cartContainer.empty(); // Clear existing items

    if (!items || items.length === 0) {
        cartContainer.append("<p>Your cart is empty.</p>"); // Display message if cart is empty
        return;
    }

    items.forEach(item => {
        const product = item.product; // Access the product information from the item
        const cartItem = $(`
            <div class="cart-item" data-id="${product._id}">
                <img src="${product.imageUrl}" alt="${product.name}" />
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p>Price: ₱${product.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <div class="rating" data-rate="${product.rating || 0}">
                        ${renderRating(product.rating || 0)}
                    </div>
                    <button class="remove-item" data-id="${product._id}">Remove</button>
                </div>
            </div>
        `);

        cartContainer.append(cartItem); // Append each item to the cart container

        // Set initial rating color if applicable
        setRatingColor(cartItem.find(".rating"), product.rating || 0);

        // Attach event listeners for rating and removal
        attachRatingListeners(cartItem.find(".rating"), product);
        attachRemoveListener(cartItem.find(".remove-item"), product._id);
    });
}

// Function to render the SVG for rating
function renderRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += `<svg class="pill-fill" fill="${i < rating ? '#56b5eb' : '#e4e4e4'}"></svg>`; // Change color based on rating
    }
    return stars;
}

// Function to attach rating event listeners
function attachRatingListeners(ratingElement, item) {
    ratingElement.on("click", function () {
        const rate = $(this).data("rate");
        handleRating(this, rate);
    });

    ratingElement.on("mouseenter", function () {
        highlightRating(this);
    });

    ratingElement.on("mouseleave", function () {
        resetRating(this, item.rating); // Use item.rating instead of item.product.rating
    });
}

// Function to attach removal listener
function attachRemoveListener(removeButton, itemId) {
    removeButton.on("click", async () => {
        await removeCartItem(itemId);
    });
}

// Function to set initial rating color
function setRatingColor(ratingElement, rating) {
    const pillFills = ratingElement.find(".pill-fill");
    pillFills.each((index, fill) => {
        $(fill).attr("fill", index < rating ? "#56b5eb" : "#e4e4e4");
    });
}

// Function to handle rating click
function handleRating(element, rate) {
    const pillFills = $(element).find(".pill-fill");
    pillFills.attr("fill", "#e4e4e4"); // Reset color

    pillFills.each((index, fill) => {
        $(fill).attr("fill", index < rate ? "#56b5eb" : "#e4e4e4"); // Change color based on rating
    });

    // Here you can also send the rating to the server, if needed
    // sendRatingToServer(itemId, rate);
}

// Function to highlight rating on mouse enter
function highlightRating(element) {
    const rate = $(element).data("rate");
    const pillFills = $(element).find(".pill-fill");
    pillFills.attr("fill", "#e4e4e4"); // Reset color

    pillFills.each((index, fill) => {
        $(fill).attr("fill", index < rate ? "#56b5eb" : "#e4e4e4"); // Highlight the rating
    });
}

// Function to reset rating color on mouse leave
function resetRating(element, rating) {
    setRatingColor(element, rating);
}

// Function to remove an item from the cart
async function removeCartItem(itemId) {
    try {
        const response = await fetch(`/cart/remove/${itemId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to remove item");
        }

        // Fetch updated cart items after removing
        fetchCartItems(); // Call the function again to refresh the cart
    } catch (error) {
        console.error("Error removing item from cart:", error);
        alert("Could not remove item. Please try again."); // User feedback
    }
}

// Complete checkout modal toggle
$("#complete-checkout").on("click", function () {
    $("#modal-rating").toggleClass("hidden");
});

// Back to home functionality
$("#back-to-home").on("click", function () {
    window.location.href = "/"; // Adjust this as necessary for your deployment
});
