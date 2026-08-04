/* ==========================================
        SUCCESS PAGE
========================================== */

// Read product from URL

const params = new URLSearchParams(window.location.search);

const productId = params.get("product");

const product = PRODUCTS[productId];

// Product Check

if (!product) {

    alert("Invalid Product.");

    window.location.href = "premium-store.html";

}

// Product Name

document.getElementById("success-product").innerText =
product.name;

// Download Button

document.getElementById("download-btn").href =
product.pdf;

/* ==========================================
        ORDER ID
========================================== */

const now = new Date();

const orderId =
"EK-" +
now.getFullYear() +
(now.getMonth()+1).toString().padStart(2,"0") +
now.getDate().toString().padStart(2,"0") +
"-" +
Math.floor(Math.random()*9000+1000);

document.getElementById("order-id").innerText =
orderId;

/* ==========================================
        PURCHASE DATE
========================================== */

document.getElementById("purchase-date").innerText =
now.toLocaleDateString("en-IN");

/* ==========================================
        DOWNLOAD MESSAGE
========================================== */

document.getElementById("download-btn").addEventListener("click",function(){

    alert("Thank you for purchasing.\nYour download will start now.");

});