const path = "./../images/";
const image_array = ["pharmacist.jpg", "pharmacist_showing.jpg", "health_drugs.jpg"];

let index = 0;

// Hero Section
const updateImage = () => {
    const carouselImage = $("#carousel-image");
    carouselImage.removeClass("show");
    setTimeout(() => {
        carouselImage.attr("src", `${path}${image_array[index]}`);
        carouselImage.addClass("show");
        index = (index + 1) % image_array.length;
    }, 500);
};

const startCarousel = () => {
    updateImage();
    setInterval(updateImage, 3000);
};

startCarousel();
// Hero Section


// Cart Section - FUNCTION THAT RETURNS THE HTML FOR EACH CART ITEM
const itemConstruct = (prodName, prodPrice, prodImage, prodId) => {
    let htmlItem =
        `
        <li data-cart-item class="flex items-center border justify-center gap-2">
            <img class="max-w-24" src="${prodImage}" alt="">
            <p id="prodName" class="">${prodName}</p>
              <div class="flex flex-col gap-2 justify-center items-center">

                  <div class="flex border border-primary-400">
                    <button id="minus-item" class="border-2 px-[.10rem] bg-primary-400 hover:bg-primary-700 border-primary-400 hover:border-primary-700  active:scale-110">
                      <span class="text-tertiary-600 align-text-top font-bold ">
                      -
                      </span>
                    </button>
                    <input id="qty-item" class="max-w-4 text-center" type="number" value="1" min="1">
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

            </li> 
        `;
    return htmlItem;
}

// Generate Items for Products Section
const container_prescription = $("[data-container-prescription]");
const container_featured = $("[data-container-featured]");
const container_babies = $("[data-container-babies]");
const container_personal = $("[data-container-personal]");

const cardTemplate = $("[data-product-container]");
let products = [];

fetch('../src/items.json')
    .then(res => res.json())
    .then(data => {
        const prescription = data["prescription"];
        const featured = data["featured"];
        const babies = data["babies"];
        const personal = data["personal"];

        const processItems = (items, container) => {
            for (let i = 0; i < items.length; i++) {
                const card = cardTemplate[0].content.cloneNode(true).children[0];

                let name = card.querySelector("[data-product-name]");
                let image = card.querySelector("[data-product-img]");
                let price = card.querySelector("[data-product-price]");
                let button = card.querySelector("[data-add-to-cart]")

                name.textContent = items[i].name;
                image.src = `${items[i].image}`;
                price.textContent = items[i].price;

                container.append(card);

                products.push({
                    name: items[i].name,
                    image: items[i].image,
                    price: items[i].price,
                    element: card,
                    button: button
                });
            }
        };

        processItems(prescription, container_prescription);
        // processItems(featured, container_featured);         
        // processItems(babies, container_babies);             
        // processItems(personal, container_personal);         
        addButtonListeners();
    })
    .catch(error => console.error("Error loading JSON:", error));

const cartItems = [];
const addButtonListeners = () => {
    for (let i = 0; i < products.length; i++) {
        let button = products[i].button;
        button.addEventListener("click", () => {
            addToCart(products[i]);
        });
    }
}

// GPT START
const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.name === product.name);

    if (existingItem) {
        const qtyInput = $(existingItem.element).find("#qty-item");
        qtyInput.val(parseInt(qtyInput.val()) + 1);
        updateCartTotal(); 
    } else {
        const cartContainer = $("[data-cart-container]");

        let itemToPush = $(itemConstruct(product.name, product.price, product.image));
        cartContainer.append(itemToPush);

        product.element = itemToPush;
        product.qty = itemToPush.find("#qty-item"); 

        product.add = itemToPush.find("#add-item");
        product.minus = itemToPush.find("#minus-item");
        product.del = itemToPush.find("#del-item");

        cartItems.push(product);

        product.add.on("click", () => {
            const qtyInput = itemToPush.find("#qty-item");
            qtyInput.val(parseInt(qtyInput.val()) + 1);
            updateCartTotal(); 
        });

        product.minus.on("click", () => {
            const qtyInput = itemToPush.find("#qty-item");
            if (parseInt(qtyInput.val()) > 1) {
                qtyInput.val(parseInt(qtyInput.val()) - 1);
                updateCartTotal(); 
            }
        });

        product.del.on("click", () => {
            removeFromCart(product); 
        });

        updateCartTotal(); 
    }

    console.log(cartItems);
};

const updateQuantity = (cartItem, increment) => {
    let qtyInput = cartItem.find('#qty-item');
    let currentQty = parseInt(qtyInput.val());

    let newQty = currentQty + increment;
    if (newQty >= 1) {
        qtyInput.val(newQty);
        updateCartTotal(); 
    }
};

const removeFromCart = (product) => {
    const itemIndex = cartItems.indexOf(product);
    
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1); 
        $(product.element).remove(); 
        updateCartTotal(); 
    }
};

const updateCartTotal = () => {
    let total = 0;

    cartItems.forEach(item => {
        const qty = parseInt(item.qty.val()); 
        const price = parseFloat(item.price); 
        total += qty * price;
    });

    
    $("[data-cart-total]").text(`₱ ${total.toFixed(2)}`);
};

$("#shopping-cart").on("click", () => {
    $("#cart-dropdown").toggleClass("hidden");
});

// Checkout Section
// For GitHub
$("#checkout").on("click", function () {
    // window.location.href = "/public/checkout.html";
    window.location.replace("/kalium-drugstore/public/checkout.html");
});

// For Localhost
// $("#checkout").on("click", function () {
//     // window.location.href = "/public/checkout.html";
//     window.location.replace("/public/checkout.html");
// });
// GPT END
// End Cart Section



// Search Section
$("#search-btn").on("click", () => {
    $("#search-input").prop("disabled", (elements, value) => !value);
    $("#close-search").toggleClass("hidden");
    $("#hero-section").slideToggle(300);
    $(".headers").slideToggle(300);
});

$("#close-search").on("click", () => {
    $("#search-input").prop("disabled", (elements, value) => !value);
    $("#close-search").toggleClass("hidden");
    $("#hero-section").slideToggle(300);
    $(".headers").slideToggle(300);
});

// Search filter
$("#search-input").on("input", queryInput => {
    let query = queryInput.target.value.toLowerCase();
    products.forEach(product => {
        const isVisible = product.name.toLowerCase().includes(query);
        product.element.classList.toggle("hidden", !isVisible);
    })
});

// End Search Section


// SignUp Form
let first_name = $("#form-first_name")
let last_name = $("#form-last_name")
let email = $("#form-email")
let passwd = $("#form-passwd")
let re_passwd = $("#form-re_passwd")
$("#form-details").hide();


$("#submit-btn").on("click", () => {
    first_val = first_name.val();
    last_val = last_name.val();
    email_val = email.val();
    passwd_val = passwd.val();

    $("#det-first_name").attr("value", `${first_val}`);
    $("#det-last_name").attr("value", `${last_val}`);
    $("#det-email").attr("value", `${email_val}`);
    $("#det-passwd").attr("value", "************");
    $("#form-first_name").attr("disabled", true);
    $("#form-last_name").attr("disabled", true);
    $("#form-email").attr("disabled", true);
    $("#form-passwd").attr("disabled", true);
    $("#form-re_passwd").attr("disabled", true);
    $("#submit-btn").attr("disabled", true);
    $("#form-details").slideToggle("slow", () => { });
})

$("#det-passwd").on("mouseenter", () => {
    $("#det-passwd").attr("value", `${passwd_val}`);
})

$("#det-passwd").on("click", () => {
    if (passwd_val === "************") {
        $("#det-passwd").attr("value", `${passwd_val}`);
    } else {
        $("#det-passwd").attr("value", "************");
    }
})

$("#det-passwd").on("mouseleave", () => {
    $("#det-passwd").attr("value", "************");
})

$("#incorrect-btn").on("click", () => {
    $("#form-details").hide();
    first_name.prop("value", "");
    last_name.prop("value", "");
    email.prop("value", "");
    passwd.prop("value", "");
    re_passwd.prop("value", "");

    first_name.attr("disabled", false);
    last_name.attr("disabled", false);
    email.attr("disabled", false);
    passwd.attr("disabled", false);
    re_passwd.attr("disabled", false);
    $("#submit-btn").attr("disabled", false);
})

passwd.on("input", () => {
    if (passwd.val() != re_passwd.val()) {
        $("#submit-btn").attr("disabled", true);
        $("#submit-btn").text("Passwords do not match");
    } else if (passwd.val() === "" && re_passwd.val() === "") {
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").text("Submit");
    } else if (passwd.val() === re_passwd.val()) {
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").text("Submit");
    } else {
        $("#submit-btn").attr("disabled", false);
    }
})

re_passwd.on("input", () => {
    if (passwd.val() != re_passwd.val()) {
        $("#submit-btn").attr("disabled", true);
        $("#submit-btn").text("Passwords do not match");
    } else if (passwd.val() === "" && re_passwd.val() === "") {
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").text("Submit");
    } else if (passwd.val() === re_passwd.val()) {
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").text("Submit");
    } else {
        $("#submit-btn").attr("disabled", false);
    }
})
// End SignUp Form



// $("#open-modal").on("click", () => {
//     // if ($("#modal").hasClass("hidden") === false) {
//     if ($("#modal").attr("opacity") === 1) {
//         $("#modal").animate({
//             opacity: 0,
//         }, 500)
//         // $("#modal").addClass("hidden");
//     }
//     else {
//         $("#modal").animate({
//             opacity: 1,
//         }, 500)
//         // $("#modal").removeClass("hidden");
//     }
// })
