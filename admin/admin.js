/* ==========================================
        FIREBASE IMPORT
========================================== */

import { db } from "../js/firebase-init.js";

import {
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

/* ==========================================
        PRODUCT MODAL
========================================== */

const modal = document.getElementById("productModal");

const openBtn = document.getElementById("addProductBtn");

const closeBtn = document.querySelector(".close-modal");

if (openBtn) {

    openBtn.addEventListener("click", function () {

        modal.style.display = "flex";

    });

}

if (closeBtn) {

    closeBtn.addEventListener("click", function () {

        modal.style.display = "none";

    });

}

window.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});

/* ==========================================
        SAVE PRODUCT
========================================== */

const productForm = document.getElementById("productForm");

if (productForm) {

    productForm.addEventListener("submit", async function (e) {

        alert("Submit Button Clicked");

        e.preventDefault();
        
try {

    console.log("Before Firestore Save");

    await addDoc(collection(db, "products"), {

        name: document.getElementById("productName").value,
        category: document.getElementById("productCategory").value,
        version: document.getElementById("productVersion").value,
        price: Number(document.getElementById("productPrice").value),
        description: document.getElementById("productDescription").value,
        status: document.getElementById("productStatus").value,
        createdAt: new Date()

    });

    console.log("After Firestore Save");

    alert("✅ Product Saved Successfully!");

}
catch(error){

    console.error("Firestore Error:", error);

    alert("❌ Error Saving Product");

}

    });

}

console.log("Admin Panel Loaded Successfully");