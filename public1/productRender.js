import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-IoARTKO0UKH-63T_rY4bMZMm9ApKyeo",
  authDomain: "addbase-d69db.firebaseapp.com",
  projectId: "addbase-d69db",
  storageBucket: "addbase-d69db.appspot.com",
  messagingSenderId: "798144892079",
  appId: "1:798144892079:web:451e6ee627ef4d0328585a",
  measurementId: "G-ZE0YJP10D3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const prescriptionSection = document.getElementById("prescription-products");
  const featuredSection = document.getElementById("featured-products");
  const babiesNeedsSection = document.getElementById("babies-needs-products");
  const personalCareSection = document.getElementById("personal-care-products");

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        const product = doc.data();

        // Create a product card dynamically
        const productCard = `
  <div class="card min-w-56 max-w-56 snap-center rounded border-2 border-tertiary-500 md:snap-end">
    <div class="card-top">
      <img class="w-full h-auto" src="${product.image || 'default-image.jpg'}" alt="${product.name}" />
    </div>
    <div class="card-bot flex flex-col flex-wrap p-6 px-4 shadow-lg shadow-tertiary-500">
      <h2 class="md:text-md text-center text-sm text-tertiary-100">${product.name}</h2>
      <p class="md:text-md py-6 text-center text-sm text-tertiary-200 md:py-4">₱ <span>${product.price}</span></p>
      <p class="md:text-md py-2 text-center text-sm text-tertiary-200">Quantity: <span>${product.quantity}</span></p>
      <div class="flex justify-center">
        <button class="rounded border-2 border-primary-500 bg-primary-500 p-2 px-9 text-tertiary-800 
        hover:scale-105 hover:bg-primary-600 active:scale-110" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
`;

        // Append the product to the correct category
        switch (product.category) {
          case "Prescription":
            prescriptionSection.insertAdjacentHTML('beforeend', productCard);
            break;
          case "Featured Product":
            featuredSection.insertAdjacentHTML('beforeend', productCard);
            break;
          case "Babies Needs":
            babiesNeedsSection.insertAdjacentHTML('beforeend', productCard);
            break;
          case "Personal Care":
            personalCareSection.insertAdjacentHTML('beforeend', productCard);
            break;
          default:
            console.warn(`Unknown category: ${product.category}`);
        }
      });
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  fetchProducts();
});
