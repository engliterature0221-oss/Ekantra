
/* ==========================================
        FIREBASE IMPORT
========================================== */

import { db } from "../js/firebase-init.js";

import {
    addDoc,
    collection,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc
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
        SAVE / UPDATE PRODUCT
========================================== */

const productForm =
    document.getElementById("productForm");

if (productForm) {

    productForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const editingProductId =
                document.getElementById(
                    "editingProductId"
                ).value;

            const productData = {

                name:
                    document.getElementById(
                        "productName"
                    ).value,

                category:
                    document.getElementById(
                        "productCategory"
                    ).value,

                version:
                    document.getElementById(
                        "productVersion"
                    ).value,

                price:
                    Number(
                        document.getElementById(
                            "productPrice"
                        ).value
                    ),

                description:
                    document.getElementById(
                        "productDescription"
                    ).value,

                status:
                    document.getElementById(
                        "productStatus"
                    ).value

            };


            try {

                /* ==========================================
                        UPDATE EXISTING PRODUCT
                ========================================== */

                if (editingProductId) {

                    await updateDoc(

                        doc(
                            db,
                            "products",
                            editingProductId
                        ),

                        productData

                    );

                    alert(
                        "✅ Product Updated Successfully!"
                    );

                }


                /* ==========================================
                        ADD NEW PRODUCT
                ========================================== */

                else {

                    await addDoc(

                        collection(
                            db,
                            "products"
                        ),

                        {
                            ...productData,
                            createdAt: new Date()
                        }

                    );

                    alert(
                        "✅ Product Saved Successfully!"
                    );

                }


                /* ==========================================
                        REFRESH PRODUCT TABLE
                ========================================== */

                await loadProducts();


                /* ==========================================
                        RESET FORM
                ========================================== */

                productForm.reset();

                document.getElementById(
                    "editingProductId"
                ).value = "";


                /* ==========================================
                        RESET MODAL
                ========================================== */

                document.getElementById(
                    "productModalTitle"
                ).innerText =
                    "Add New Product";

                document.getElementById(
                    "saveProductBtn"
                ).innerText =
                    "Save Product";


                document.getElementById(
                    "productModal"
                ).style.display =
                    "none";

            }

            catch (error) {

                console.error(
                    "Firestore Save/Update Error:",
                    error
                );

                alert(
                    "❌ Error Saving/Updating Product"
                );

            }

        }
    );

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


/* ==========================================
        EDIT PRODUCT - STEP 4B
========================================== */

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("edit-btn")) {
        return;
    }

    const productId =
        event.target.getAttribute("data-id");

    console.log("Editing Product ID:", productId);

    try {

        const productRef =
            doc(db, "products", productId);

        const productSnap =
            await getDoc(productRef);

        if (!productSnap.exists()) {

            alert("❌ Product not found");

            return;
        }

        const product =
            productSnap.data();

            document.getElementById("editingProductId").value =
    productId;

        /* ==========================================
                FILL EDIT FORM
        ========================================== */

        document.getElementById("productName").value =
            product.name || "";

        document.getElementById("productCategory").value =
            product.category || "Grammar";

        document.getElementById("productVersion").value =
            product.version || "";

        document.getElementById("productPrice").value =
            product.price || "";

        document.getElementById("productDescription").value =
            product.description || "";

        document.getElementById("productStatus").value =
            product.status || "Active";


        /* ==========================================
                CHANGE MODAL TITLE
        ========================================== */

        document.getElementById("productModalTitle").innerText =
            "Edit Product";


        /* ==========================================
                CHANGE BUTTON TEXT
        ========================================== */

        document.getElementById("saveProductBtn").innerText =
            "Update Product";


        /* ==========================================
                OPEN MODAL
        ========================================== */

        document.getElementById("productModal").style.display =
            "flex";


        console.log(
            "Edit Product Loaded Successfully"
        );

    }

    catch (error) {

        console.error(
            "Error Loading Product:",
            error
        );

    }

});



/* ==========================================
        DELETE PRODUCT - STEP 4
========================================== */

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("delete-btn")) {
        return;
    }

    const productId =
        event.target.getAttribute("data-id");

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {

        console.log(
            "Delete Cancelled:",
            productId
        );

        return;
    }

    try {

        await deleteDoc(
            doc(
                db,
                "products",
                productId
            )
        );

        alert(
            "✅ Product Deleted Successfully!"
        );

        console.log(
            "Product Deleted:",
            productId
        );

        await loadProducts();

    }

    catch (error) {

        console.error(
            "Error Deleting Product:",
            error
        );

        alert(
            "❌ Error Deleting Product"
        );

    }

});