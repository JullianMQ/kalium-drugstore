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
          <div class="my-8 border border-tertiary-500 bg-tertiary-600 p-2 shadow-lg shadow-tertiary-500 md:mx-8 lg:mx-32">
          ${product.image ? `<img src="${product.image}" alt="${product.name}" class="w-full h-auto"/>` : ''}  
          <h2 class="text-2xl font-semibold text-secondary-500 md:pl-4 xl:text-3xl">${product.name}</h2>            
            <p>Price: ${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <button class="bg-secondary-500 text-tertiary-800 p-2 rounded">Add to Cart</button>
          </div>
        `;

        // Append the product to the correct category
        switch (product.category) {
          case "Prescription":
            prescriptionSection.innerHTML += productCard;
            break;
          case "Featured Product":
            featuredSection.innerHTML += productCard;
            break;
          case "Babies Needs":
            babiesNeedsSection.innerHTML += productCard;
            break;
          case "Personal Care":
            personalCareSection.innerHTML += productCard;
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
