/* ==========================================
        EKANTRA PAYMENT SYSTEM
========================================== */

/* Read Product from URL */

const params = new URLSearchParams(window.location.search);

const productId = params.get("product");

const product = PRODUCTS[productId];
console.log(product);

/* Product Not Found */

if (!product) {

    alert("Product not found!");

    window.location.href = "premium-section.html";

   
}

/* Update Checkout Page */

document.getElementById("product-name").innerText = product.name;

document.getElementById("product-price").innerText = "₹" + product.price;

document.getElementById("total-price").innerText = "₹" + product.price;

document.getElementById("product-image").src = product.image;

/* Razorpay Payment */

document.getElementById("pay-btn").onclick = function(e){

    e.preventDefault();

    var options = {

        key: "rzp_test_TKCVk6LgRwbQDd",

        amount: product.price * 100,

        currency: "INR",

        name: "Engliterature0221",

        description: product.name,

        image: "images/favicon.png",

        handler: function (response){

            alert("Payment Successful!");

            window.location.href =
"success.html?product="+product.id;

        },

        prefill: {

            name: "",

            email: "",

            contact: ""

        },

        theme: {

            color: "#0b3d91"

        }

    };

    var rzp = new Razorpay(options);

    rzp.open();

};