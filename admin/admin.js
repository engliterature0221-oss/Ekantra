/* ==========================================
        FIREBASE IMPORT
========================================== */

import { db } from "../js/firebase-init.js";

import {
  addDoc,
  collection,
  getDocs
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


//* ==========================================
        // SAVE PRODUCT
// ========================================== */

const productForm = document.getElementById("productForm");

if (productForm) {

    productForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        try {

            await addDoc(collection(db, "products"), {

                name: document.getElementById("productName").value,

                category: document.getElementById("productCategory").value,

                version: document.getElementById("productVersion").value,

                price: Number(
                    document.getElementById("productPrice").value
                ),

                description:
                    document.getElementById("productDescription").value,

                status:
                    document.getElementById("productStatus").value,

                createdAt: new Date()

            });

            alert("✅ Product Saved Successfully!");

            /* Refresh Product Table */

            await loadProducts();

            productForm.reset();

            modal.style.display = "none";

        }

        catch (error) {

            console.error("Firestore Error:", error);

            alert("❌ Error Saving Product");

        }

    });

}

/* ==========================================
        LOAD PRODUCTS FROM FIRESTORE
========================================== */

async function loadProducts() {

    const tableBody =
        document.getElementById("productsTableBody");

    if (!tableBody) return;

    try {

        const querySnapshot =
            await getDocs(collection(db, "products"));

        tableBody.innerHTML = "";

        querySnapshot.forEach((doc) => {

            const product = doc.data();

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>${product.name || ""}</td>

                <td>${product.category || ""}</td>

                <td>${product.version || ""}</td>

                <td>₹${product.price || 0}</td>

                <td>
                    <span class="status ${
                        product.status === "Active"
                        ? "active"
                        : ""
                    }">
                        ${product.status || ""}
                    </span>
                </td>

                <td>

                    <button
                        class="edit-btn"
                        data-id="${doc.id}">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        data-id="${doc.id}">
                        Delete
                    </button>

                </td>

            `;

            tableBody.appendChild(row);

        });

        console.log(
            "Products Loaded Successfully:",
            querySnapshot.size
        );

    }

    catch (error) {

        console.error(
            "Error Loading Products:",
            error
        );

    }

}


/* ==========================================
        INITIAL PRODUCT LOAD
========================================== */

loadProducts();

/* ==========================================
        PRODUCT SEARCH
========================================== */

const searchProduct =
    document.getElementById("searchProduct");

if (searchProduct) {

    searchProduct.addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase().trim();

        const rows =
            document.querySelectorAll(
                "#productsTableBody tr"
            );

        rows.forEach(function (row) {

            const productName =
                row.cells[0]?.textContent.toLowerCase() || "";

            const category =
                row.cells[1]?.textContent.toLowerCase() || "";

            if (
                productName.includes(searchText) ||
                category.includes(searchText)
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}