/* ==========================================
        SUCCESS PAGE
========================================== */

const params = new URLSearchParams(window.location.search);

const productId = params.get("product");

const product = PRODUCTS[productId];

if(product){

    document.getElementById("success-product").innerText =
    product.name;

    document.getElementById("download-btn").href =
    product.pdf;

}

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
now.toLocaleDateString();