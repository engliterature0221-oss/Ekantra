
const params = new URLSearchParams(window.location.search);

const productId = params.get("product");

const product = PRODUCTS[productId];

if(product){

document.getElementById("success-product").innerText = product.name;

document.getElementById("download-btn").href = product.pdf;

}

/* ======================================
        ORDER DETAILS
====================================== */

const orderId = "EK-" + Date.now();

document.getElementById("order-id").innerText = orderId;

const today = new Date();

document.getElementById("purchase-date").innerText =
today.toLocaleDateString();