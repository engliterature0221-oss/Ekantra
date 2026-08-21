/* =========================================================
   EKANTRA ADMIN — PRODUCTS + ORDERS MANAGEMENT
   ========================================================= */


/* =========================================================
   FIREBASE IMPORT
   ========================================================= */

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


/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const productsTableBody =
    document.getElementById("productsTableBody");

const ordersTableBody =
    document.getElementById("ordersTableBody");


/* =========================================================
   PRODUCT MODAL
   ========================================================= */

const productModal =
    document.getElementById("productModal");

const addProductBtn =
    document.getElementById("addProductBtn");

const closeProductModal =
    document.querySelector(".close-modal");

if (addProductBtn && productModal) {

    addProductBtn.addEventListener("click", function () {

        productModal.style.display = "flex";

    });

}

if (closeProductModal && productModal) {

    closeProductModal.addEventListener("click", function () {

        productModal.style.display = "none";

    });

}


window.addEventListener("click", function (event) {

    if (
        productModal &&
        event.target === productModal
    ) {

        productModal.style.display = "none";

    }

});


/* =========================================================
   LOAD PRODUCTS
   ========================================================= */

async function loadProducts() {

    if (!productsTableBody) {
        return;
    }

    try {

        console.log("Loading Products...");

        const querySnapshot =
            await getDocs(
                collection(db, "products")
            );


        productsTableBody.innerHTML = "";


        if (querySnapshot.empty) {

            productsTableBody.innerHTML = `
                <tr>
                    <td colspan="6">
                        No products found.
                    </td>
                </tr>
            `;

            console.log("No Products Found.");

            return;
        }


        querySnapshot.forEach(function (productDoc) {

            const product =
                productDoc.data();


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${product.name || ""}
                </td>

                <td>
                    ${product.category || ""}
                </td>

                <td>
                    ${product.version || ""}
                </td>

                <td>
                    ₹${product.price || 0}
                </td>

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
                        type="button"
                        class="edit-btn"
                        data-id="${productDoc.id}">
                        Edit
                    </button>

                    <button
                        type="button"
                        class="delete-btn"
                        data-id="${productDoc.id}">
                        Delete
                    </button>

                </td>

            `;


            productsTableBody.appendChild(row);

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


/* =========================================================
   SAVE / UPDATE PRODUCT
   ========================================================= */

const productForm =
    document.getElementById("productForm");


if (productForm) {

    productForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const editingProductId =
                document.getElementById(
                    "editingProductId"
                )?.value || "";


            const productData = {

                name:
                    document.getElementById(
                        "productName"
                    )?.value || "",

                category:
                    document.getElementById(
                        "productCategory"
                    )?.value || "",

                version:
                    document.getElementById(
                        "productVersion"
                    )?.value || "",

                price:
                    Number(
                        document.getElementById(
                            "productPrice"
                        )?.value || 0
                    ),

                description:
                    document.getElementById(
                        "productDescription"
                    )?.value || "",

                status:
                    document.getElementById(
                        "productStatus"
                    )?.value || "Active"

            };


     try {

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

    await loadProducts();

productForm.reset();


                const editingInput =
                    document.getElementById(
                        "editingProductId"
                    );

                if (editingInput) {
                    editingInput.value = "";
                }

const title =
                    document.getElementById(
                        "productModalTitle"
                    );

                if (title) {
                    title.innerText =
                        "Add New Product";
                }


                const saveBtn =
                    document.getElementById(
                        "saveProductBtn"
                    );

                if (saveBtn) {
                    saveBtn.innerText =
                        "Save Product";
                }


                if (productModal) {

                    productModal.style.display =
                        "none";

                }

            }

            catch (error) {

                console.error(
                    "Product Save Error:",
                    error
                );

                alert(
                    "❌ Error Saving Product"
                );

            }

        }
    );

}

/* =========================================================
   DELETE PRODUCT
   ========================================================= */

document.addEventListener(
    "click",
    async function (event) {

        const deleteButton =
            event.target.closest(
                ".delete-btn"
            );


        if (!deleteButton) {
            return;
        }


        const productId =
            deleteButton.getAttribute(
                "data-id"
            );


        if (!productId) {
            return;
        }


        const confirmed =
            confirm(
                "⚠️ Are you sure you want to delete this product?"
            );


        if (!confirmed) {
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


            await loadProducts();

        }

        catch (error) {

            console.error(
                "Error Deleting Product:",
                error
            );


            alert(
                "❌ Failed to Delete Product"
            );

        }

    }
);


/* =========================================================
   EDIT PRODUCT
   ========================================================= */

document.addEventListener(
    "click",
    async function (event) {

        const editButton =
            event.target.closest(
                ".edit-btn"
            );


        if (!editButton) {
            return;
        }


        const productId =
            editButton.getAttribute(
                "data-id"
            );


        if (!productId) {
            return;
        }

 try {

            const productRef =
                doc(
                    db,
                    "products",
                    productId
                );


            const productSnap =
                await getDoc(productRef);


            if (!productSnap.exists()) {

                alert(
                    "❌ Product not found"
                );

                return;
            }


            const product =
                productSnap.data();


            document.getElementById(
                "editingProductId"
            ).value = productId;


            document.getElementById(
                "productName"
            ).value =
                product.name || "";


            document.getElementById(
                "productCategory"
            ).value =
                product.category || "Grammar";


            document.getElementById(
                "productVersion"
            ).value =
                product.version || "";


            document.getElementById(
                "productPrice"
            ).value =
                product.price || 0;


            document.getElementById(
                "productDescription"
            ).value =
                product.description || "";


            document.getElementById(
                "productStatus"
            ).value =
                product.status || "Active";


            document.getElementById(
                "productModalTitle"
            ).innerText =
                "Edit Product";


            document.getElementById(
                "saveProductBtn"
            ).innerText =
                "Update Product";


            document.getElementById(
                "productModal"
            ).style.display =
                "flex";

        }

        catch (error) {

            console.error(
                "Error Loading Product:",
                error
            );

        }

    }
);


/* =========================================================
   LOAD ORDERS
   ========================================================= */

async function loadOrders() {

    if (!ordersTableBody) {
        return;
    }


    try {

        console.log("Loading Orders...");


        const querySnapshot =
            await getDocs(
                collection(
                    db,
                    "orders"
                )
            );


        ordersTableBody.innerHTML = "";

if (querySnapshot.empty) {

            ordersTableBody.innerHTML = `
                <tr>
                    <td colspan="7">
                        No orders found.
                    </td>
                </tr>
            `;


            console.log(
                "No Orders Found."
            );


            return;
        }


        querySnapshot.forEach(function (orderDoc) {

            const order =
                orderDoc.data();


            const orderId =
                order.orderId ||
                order.id ||
                orderDoc.id;


            const customerName =
                order.customerName ||
                order.customer ||
                order.customer_name ||
                "N/A";


            const productName =
                order.productName ||
                order.product ||
                order.product_name ||
                "N/A";


            const amount =
                order.amount !== undefined &&
                order.amount !== null
                    ? order.amount
                    : 0;


            const paymentStatus =
                order.paymentStatus ||
                "Pending";


            const orderStatus =
                order.orderStatus ||
                "Pending";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${orderId}
                </td>

                <td>
                    ${customerName}
                </td>

                <td>
                    ${productName}
                </td>

                <td>
                    ₹${amount}
                </td>

                <td>

                    <select
                        class="payment-status-select"
                        data-id="${orderDoc.id}">

                        <option
                            value="Pending"
                            ${
                                paymentStatus === "Pending"
                                    ? "selected"
                                    : ""
                            }>
                            Pending
                        </option>

                        <option
                            value="Paid"
                            ${
                                paymentStatus === "Paid"
                                    ? "selected"
                                    : ""
                            }>
                            Paid
                        </option>

                        <option
                            value="Failed"
                            ${
                                paymentStatus === "Failed"
                                    ? "selected"
                                    : ""
                            }>
                            Failed
                        </option>

                    </select>

                </td>

                <td>

                    <select
                        class="order-status-select"
                        data-id="${orderDoc.id}"
                        data-previous-status="${orderStatus}">

                        <option
                            value="Pending"
                            ${
                                orderStatus === "Pending"
                                    ? "selected"
                                    : ""
                            }>
                            Pending
                        </option>

                        <option
                            value="Completed"
                            ${
                                orderStatus === "Completed"
                                    ? "selected"
                                    : ""
                            }>
                            Completed
                        </option>

                        <option
                            value="Cancelled"
                            ${
                                orderStatus === "Cancelled"
                                    ? "selected"
                                    : ""
                            }>
                            Cancelled
                        </option>

                    </select>

                </td>

                <td>

                    <button
                        type="button"
                        class="view-order-btn"
                        data-id="${orderDoc.id}">
                        View
                    </button>

                </td>

            `;


            ordersTableBody.appendChild(row);

        });


        initializeStatusColors();


        console.log(
            "Orders Loaded Successfully:",
            querySnapshot.size
        );


 }

    catch (error) {

        console.error(
            "ERROR LOADING ORDERS:",
            error
        );


        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    ❌ Error loading orders.
                    Check browser console.
                </td>
            </tr>
        `;

    }

}


/* =========================================================
   VIEW ORDER DETAILS
   ========================================================= */

document.addEventListener(
    "click",
    async function (event) {

        const viewButton =
            event.target.closest(
                ".view-order-btn"
            );


        if (!viewButton) {
            return;
        }


        const orderId =
            viewButton.getAttribute(
                "data-id"
            );


        if (!orderId) {
            return;
        }


 try {

            const orderRef =
                doc(
                    db,
                    "orders",
                    orderId
                );


            const orderSnap =
                await getDoc(orderRef);


            if (!orderSnap.exists()) {

                alert(
                    "❌ Order not found"
                );

                return;
            }


            const order =
                orderSnap.data();

 const modal =
                document.getElementById(
                    "orderDetailsModal"
                );


            if (!modal) {
                return;  }

 const customerName =
                order.customerName ||
                order.customer ||
                "N/A";


            const productName =
                order.productName ||
                order.product ||
                "N/A";


            const amount =
                order.amount !== undefined &&
                order.amount !== null
                    ? order.amount
                    : 0;


            const paymentStatus =
                order.paymentStatus ||
                "Pending";


            const orderStatus =
                order.orderStatus ||
                "Pending";


            const detailOrderId =
                document.getElementById(
                    "detailOrderId"
                );


            const detailCustomer =
                document.getElementById(
                    "detailCustomer"
                );


            const detailProduct =
                document.getElementById(
                    "detailProduct"
                );


            const detailAmount =
                document.getElementById(
                    "detailAmount"
                );


            const detailPayment =
                document.getElementById(
                    "detailPayment"
                );


            const detailStatus =
                document.getElementById(
                    "detailStatus"
                );


            const detailCreatedAt =
                document.getElementById(
                    "detailCreatedAt"
                );


            if (detailOrderId) {
                detailOrderId.innerText =
                    orderId;
            }


            if (detailCustomer) {
                detailCustomer.innerText =
                    customerName;
            }


            if (detailProduct) {
                detailProduct.innerText =
                    productName;
            }


            if (detailAmount) {
                detailAmount.innerText =
                    "₹" + amount;
            }


            if (detailPayment) {
                detailPayment.innerText =
                    paymentStatus;
            }


            if (detailStatus) {
                detailStatus.innerText =
                    orderStatus;
            }


            let createdDate = "-";


            if (order.createdAt) {

                if (
                    typeof order.createdAt.toDate ===
                    "function"
                ) {

                    createdDate =
                        order.createdAt
                            .toDate()
                            .toLocaleString();

                }

                else {

                    const date =
                        new Date(
                            order.createdAt
                        );


                    if (
                        !isNaN(
                            date.getTime()
                        )
                    ) {

                        createdDate =
                            date.toLocaleString();

                    }

                }

            }


            if (detailCreatedAt) {

                detailCreatedAt.innerText =
                    createdDate;

            }

modal.style.display =
                "flex";

 }

        catch (error) {

            console.error(
                "Error Loading Order Details:",
                error
            );


            alert(
                "❌ Failed to Load Order Details"
            );

        }

    }
);


/* =========================================================
   CLOSE ORDER MODAL
   ========================================================= */

const orderDetailsModal =
    document.getElementById(
        "orderDetailsModal"
    );


const closeOrderModal =
    document.querySelector(
        ".close-order-modal"
    );


if (closeOrderModal) {

    closeOrderModal.addEventListener(
        "click",
        function () {

            if (orderDetailsModal) {

                orderDetailsModal.style.display =
                    "none";

            }

        }
    );

}


window.addEventListener(
    "click",
    function (event) {

        if (
            orderDetailsModal &&
            event.target === orderDetailsModal
        ) {

            orderDetailsModal.style.display =
                "none";

        }

    }
);


/* =========================================================
   UPDATE ORDER STATUS
   ========================================================= */

document.addEventListener(
    "change",
    async function (event) {
 const selectElement =
            event.target.closest(
                ".order-status-select"
            );


        if (!selectElement) {
            return;
        }

 const orderId =
            selectElement.getAttribute(
                "data-id"
            );


        const newStatus =
            selectElement.value;


        if (!orderId) {
            return;
        }


        if (
            newStatus === "Cancelled"
        ) {

            const confirmed =
                confirm(
                    "⚠️ Are you sure you want to cancel this order?"
                );


            if (!confirmed) {

                const previousStatus =
                    selectElement.getAttribute(
                        "data-previous-status"
                    );


                if (previousStatus) {

                    selectElement.value =
                        previousStatus;

                }


                updateStatusColor(
                    selectElement
                );

     return;
            }

        }


        try {

            await updateDoc(

                doc(
                    db,
                    "orders",
                    orderId
                ),

     {
                    orderStatus:
                        newStatus
                }
 );
 selectElement.setAttribute(
                "data-previous-status",
                newStatus
            );


            updateStatusColor(
                selectElement
            );


            await updateOrderSummary();


            applyAllOrderFilters();


            alert(
                "✅ Order Status Updated Successfully!"
            );

        }
catch (error) {

            console.error(
                "Error Updating Order Status:",
                error
            );


            alert(
                "❌ Failed to Update Order Status"
            );

        }

    }
);


/* =========================================================
   UPDATE PAYMENT STATUS
   ========================================================= */

document.addEventListener(
    "change",
    async function (event) {

        const paymentSelect =
            event.target.closest(
                ".payment-status-select"
            );


        if (!paymentSelect) {
            return;
        }


        const orderId =
            paymentSelect.getAttribute(
                "data-id"
            );


        const newPaymentStatus =
            paymentSelect.value;


        if (!orderId) {
            return;
        }


        try {

            await updateDoc(

                doc(
                    db,
                    "orders",
                    orderId
                ),

     {
                    paymentStatus:
                        newPaymentStatus
                }

            );


            updateStatusColor(
                paymentSelect
            );


            await updatePaymentSummary();

 applyAllOrderFilters();


            alert(
                "✅ Payment Status Updated Successfully!"
            );

        }

 catch (error) {

            console.error(
                "Error Updating Payment Status:",
                error
            );


            alert(
                "❌ Failed to Update Payment Status"
            );

        }

    }
);


/* =========================================================
   STATUS COLORS
   ========================================================= */

function updateStatusColor(selectElement) {

    if (!selectElement) {
        return;
    }


    selectElement.classList.remove(
        "status-pending",
        "status-paid",
        "status-failed",
        "status-completed",
        "status-cancelled"
    );


    const value =
        selectElement.value;


    if (value === "Pending") {

        selectElement.classList.add(
            "status-pending"
        );

    }

    else if (value === "Paid") {

        selectElement.classList.add(
            "status-paid"
        );

    }

    else if (value === "Failed") {

        selectElement.classList.add(
            "status-failed"
        );

    }

    else if (value === "Completed") {

        selectElement.classList.add(
            "status-completed"
        );

    }

    else if (value === "Cancelled") {

        selectElement.classList.add(
            "status-cancelled"
        );

    }

}


function initializeStatusColors() {

    document
        .querySelectorAll(
            ".order-status-select, .payment-status-select"
        )
        .forEach(function (select) {

            updateStatusColor(
                select
            );

        });

}


/* =========================================================
   ORDER SUMMARY
   ========================================================= */

async function updateOrderSummary() {

    if (!document.getElementById("totalOrders")) {
        return;
    }


    try {

        const querySnapshot =
            await getDocs(
                collection(
                    db,
                    "orders"
                )
            );

    let totalOrders = 0;
    let pendingOrders = 0;
    let completedOrders = 0;
    let cancelledOrders = 0;
    let totalOrderValue = 0;


        querySnapshot.forEach(function (orderDoc) {

            const order =
                orderDoc.data();


            totalOrders++;


            const status =
                order.orderStatus ||
                "Pending";


            if (status === "Pending") {

                pendingOrders++;

            }

            else if (status === "Completed") {

                completedOrders++;

            }

            else if (status === "Cancelled") {

                cancelledOrders++;

            }


            const amount =
                Number(
                    order.amount || 0
                );


            if (status !== "Cancelled") {

                totalOrderValue +=
                    amount;

            }

        });


        document.getElementById(
            "totalOrders"
        ).innerText =
            totalOrders;


        document.getElementById(
            "pendingOrders"
        ).innerText =
            pendingOrders;


        document.getElementById(
            "completedOrders"
        ).innerText =
            completedOrders;


        document.getElementById(
            "cancelledOrders"
        ).innerText =
            cancelledOrders;


        document.getElementById(
            "totalOrderValue"
        ).innerText =
            "₹" + totalOrderValue;


    }

    catch (error) {

        console.error(
            "Error Updating Order Summary:",
            error
        );

    }

}


/* =========================================================
   PAYMENT SUMMARY
   ========================================================= */

async function updatePaymentSummary() {

    if (!document.getElementById("allPayments")) {
        return;
    }


    try {

        const querySnapshot =
            await getDocs(
                collection(
                    db,
                    "orders"
                )
            );

let allPayments = 0;
        let paidPayments = 0;
    let pendingPayments = 0;
    let failedPayments = 0;
    let paidRevenue = 0;


        querySnapshot.forEach(function (orderDoc) {

            const order =
                orderDoc.data();


            allPayments++;


            const paymentStatus =
                order.paymentStatus ||
                "Pending";


            if (paymentStatus === "Paid") {

                paidPayments++;


                paidRevenue +=
                    Number(
                        order.amount || 0
                    );

            }

            else if (
                paymentStatus === "Pending"
            ) {

                pendingPayments++;

            }

            else if (
                paymentStatus === "Failed"
            ) {

                failedPayments++;

            }

        });


        document.getElementById(
            "allPayments"
        ).innerText =
            allPayments;


        document.getElementById(
            "paidPayments"
        ).innerText =
            paidPayments;


        document.getElementById(
            "pendingPayments"
        ).innerText =
            pendingPayments;


        document.getElementById(
            "failedPayments"
        ).innerText =
            failedPayments;


        document.getElementById(
            "paidRevenue"
        ).innerText =
            "₹" + paidRevenue;


    }

    catch (error) {

        console.error(
            "Error Updating Payment Summary:",
            error
        );

    }

}


/* =========================================================
   FILTER ORDERS
   ========================================================= */

function applyAllOrderFilters() {

    if (!ordersTableBody) {
        return;
    }


    const orderFilter =
        localStorage.getItem(
            "selectedOrderFilter"
        ) || "all";


    const paymentFilter =
        localStorage.getItem(
            "selectedPaymentFilter"
        ) || "all";


    const searchInput =
        document.getElementById(
            "searchOrder"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const rows =
        document.querySelectorAll(
            "#ordersTableBody tr"
        );


    rows.forEach(function (row) {

        if (
            !row.cells ||
            row.cells.length < 7
        ) {
            return;
        }

const orderId =
            row.cells[0]
                .textContent
                .toLowerCase();


        const customer =
            row.cells[1]
                .textContent
                .toLowerCase();


        const product =
            row.cells[2]
                .textContent
                .toLowerCase();


        const searchMatch =
            !searchText ||
            orderId.includes(searchText) ||
            customer.includes(searchText) ||
            product.includes(searchText);


        const orderStatusSelect =
            row.querySelector(
                ".order-status-select"
            );


        const orderStatus =
            orderStatusSelect
                ? orderStatusSelect.value
                : "";


        const orderMatch =
            orderFilter === "all" ||
            orderStatus === orderFilter;


        const paymentStatusSelect =
            row.querySelector(
                ".payment-status-select"
            );


        const paymentStatus =
            paymentStatusSelect
                ? paymentStatusSelect.value
                : "";


        let paymentMatch = true;


        if (
            paymentFilter === "all"
        ) {

            paymentMatch = true;

        }

        else if (
            paymentFilter === "revenue"
        ) {

            paymentMatch =
                paymentStatus === "Paid";

        }

        else {

            paymentMatch =
                paymentStatus === paymentFilter;

        }


        row.style.display =
            searchMatch &&
            orderMatch &&
            paymentMatch
                ? ""
                : "none";

    });

}


/* =========================================================
   ORDER SUMMARY CARD FILTER
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const card =
            event.target.closest(
                ".summary-card"
            );


        if (!card) {
            return;
        }


        const filter =
            card.getAttribute(
                "data-filter"
            );


        if (!filter) {
            return;
        }


        localStorage.setItem(
            "selectedOrderFilter",
            filter
        );


        applyAllOrderFilters();

    }
);


/* =========================================================
   PAYMENT SUMMARY CARD FILTER
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const card =
            event.target.closest(
                ".payment-summary-card"
            );


        if (!card) {
            return;
        }


        const filter =
            card.getAttribute(
                "data-payment-filter"
            );


        if (!filter) {
            return;
        }


        localStorage.setItem(
            "selectedPaymentFilter",
            filter
        );


        applyAllOrderFilters();

    }
);


/* =========================================================
   ORDER SEARCH
   ========================================================= */

const searchOrder =
    document.getElementById(
        "searchOrder"
    );


if (searchOrder) {

    searchOrder.addEventListener(
        "input",
        function () {

            applyAllOrderFilters();

        }
    );

}


/* =========================================================
   REFRESH ORDERS
   ========================================================= */

const refreshOrdersBtn =
    document.getElementById(
        "refreshOrdersBtn"
    );


if (refreshOrdersBtn) {

    refreshOrdersBtn.addEventListener(
        "click",
        async function () {
refreshOrdersBtn.disabled =
                true;


            refreshOrdersBtn.innerText =
                "🔄 Refreshing...";


    try {

                await loadOrders();

                await updateOrderSummary();

                await updatePaymentSummary();

     applyAllOrderFilters();

     }

            catch (error) {

                console.error(
                    "Refresh Error:",
                    error
                );


                alert(
                    "❌ Failed to Refresh Orders"
                );

            }

     finally {

                refreshOrdersBtn.disabled =
                    false;


                refreshOrdersBtn.innerText =
                    "🔄 Refresh Orders";

            }

        }
    );

}


/* =========================================================
   INITIAL PAGE LOAD
   ========================================================= */

if (productsTableBody) {

    loadProducts();

}


if (ordersTableBody) {

    loadOrders();

    updateOrderSummary();

    updatePaymentSummary();

}


/* =========================================================
   ADMIN JS READY
   ========================================================= */

console.log(
    "✅ EKANTRA ADMIN MODULE LOADED"
);