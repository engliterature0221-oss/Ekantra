
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

/* ==========================================
        LOAD ORDERS FROM FIRESTORE
========================================== */

async function loadOrders() {

    const tableBody =
        document.getElementById(
            "ordersTableBody"
        );


    if (!tableBody) {
        return;
    }


    try {

        /* ==========================================
                GET ORDERS
        ========================================== */

        const querySnapshot =
            await getDocs(
                collection(
                    db,
                    "orders"
                )
            );


        tableBody.innerHTML = "";


        /* ==========================================
                NO ORDERS
        ========================================== */

        if (querySnapshot.empty) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7">
                        No orders found.
                    </td>
                </tr>
            `;


            console.log(
                "Orders Loaded Successfully: 0"
            );


            return;
        }


        /* ==========================================
                LOAD EACH ORDER
        ========================================== */

        querySnapshot.forEach(
            (orderDoc) => {

                const order =
                    orderDoc.data();


                const row =
                    document.createElement(
                        "tr"
                    );


                /* ==========================================
                        ORDER STATUS
                ========================================== */

                const currentOrderStatus =
                    order.orderStatus ||
                    "Pending";


                const isCancelled =
                    currentOrderStatus ===
                    "Cancelled";


                /* ==========================================
                        CREATE ROW
                ========================================== */

                row.innerHTML = `

                    <!-- ORDER ID -->

                    <td>
                        ${orderDoc.id}
                    </td>


                    <!-- CUSTOMER -->

                    <td>
                        ${order.customerName || "N/A"}
                    </td>


                    <!-- PRODUCT -->

                    <td>
                        ${order.productName || "N/A"}
                    </td>


                    <!-- AMOUNT -->

                    <td>
                        ₹${order.amount || 0}
                    </td>


                    <!-- ==================================
                            PAYMENT STATUS
                    =================================== -->

                    <td>

                        <select
                            class="payment-status-select"
                            data-id="${orderDoc.id}">

                            <option
                                value="Pending"
                                ${
                                    (
                                        order.paymentStatus ||
                                        "Pending"
                                    ) === "Pending"
                                        ? "selected"
                                        : ""
                                }>

                                Pending

                            </option>


                            <option
                                value="Paid"
                                ${
                                    order.paymentStatus ===
                                    "Paid"
                                        ? "selected"
                                        : ""
                                }>

                                Paid

                            </option>


                            <option
                                value="Failed"
                                ${
                                    order.paymentStatus ===
                                    "Failed"
                                        ? "selected"
                                        : ""
                                }>

                                Failed

                            </option>

                        </select>

                    </td>


                    <!-- ==================================
                            ORDER STATUS
                    =================================== -->

                    <td>

                        <select
                            class="order-status-select"
                            data-id="${orderDoc.id}"
                            data-previous-status="${currentOrderStatus}"
                            ${isCancelled ? "disabled" : ""}>

                            <option
                                value="Pending"
                                ${
                                    currentOrderStatus ===
                                    "Pending"
                                        ? "selected"
                                        : ""
                                }>

                                Pending

                            </option>


                            <option
                                value="Completed"
                                ${
                                    currentOrderStatus ===
                                    "Completed"
                                        ? "selected"
                                        : ""
                                }>

                                Completed

                            </option>


                            <option
                                value="Cancelled"
                                ${
                                    currentOrderStatus ===
                                    "Cancelled"
                                        ? "selected"
                                        : ""
                                }>

                                Cancelled

                            </option>

                        </select>

                    </td>


                    <!-- ==================================
                            VIEW BUTTON
                    =================================== -->

                    <td>

                        <button
                            class="view-order-btn"
                            data-id="${orderDoc.id}">

                            View

                        </button>

                    </td>

                `;


                /* ==========================================
                        ADD ROW TO TABLE
                ========================================== */

                tableBody.appendChild(
                    row
                );


                /* ==========================================
                        INITIAL STATUS COLORS
                ========================================== */

                const paymentSelect =
                    row.querySelector(
                        ".payment-status-select"
                    );


                const orderSelect =
                    row.querySelector(
                        ".order-status-select"
                    );


                if (paymentSelect) {

                    updateStatusColor(
                        paymentSelect
                    );

                }


                if (orderSelect) {

                    updateStatusColor(
                        orderSelect
                    );

                }

            }
        );


        /* ==========================================
                SUCCESS MESSAGE
        ========================================== */

        console.log(
            "Orders Loaded Successfully:",
            querySnapshot.size
        );

    }


    catch (error) {

        console.error(
            "Error Loading Orders:",
            error
        );

    }

}


/* ==========================================
        INITIAL ORDER LOAD
========================================== */

loadOrders();


/* ==========================================
        VIEW ORDER DETAILS
========================================== */

document.addEventListener(
    "click",
    async function (event) {

        if (
            !event.target.classList.contains(
                "view-order-btn"
            )
        ) {
            return;
        }


        const orderId =
            event.target.getAttribute(
                "data-id"
            );


        console.log(
            "Loading Order Details:",
            orderId
        );


        try {

            /* ==========================================
                    GET ORDER FROM FIRESTORE
            ========================================== */

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


            console.log(
                "Order Details Loaded:",
                order
            );


            /* ==========================================
                    GET MODAL
            ========================================== */

            const modal =
                document.getElementById(
                    "orderDetailsModal"
                );


            if (!modal) {

                console.error(
                    "Order Details Modal Not Found"
                );

                return;
            }


            /* ==========================================
                    SAFE ORDER DATA
            ========================================== */

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


            /* ==========================================
                    SHOW ORDER DATA
            ========================================== */

            document.getElementById(
                "detailOrderId"
            ).innerText =
                orderId;


            document.getElementById(
                "detailCustomer"
            ).innerText =
                customerName;


            document.getElementById(
                "detailProduct"
            ).innerText =
                productName;


            document.getElementById(
                "detailAmount"
            ).innerText =
                "₹" + amount;


            document.getElementById(
                "detailPayment"
            ).innerText =
                paymentStatus;


            document.getElementById(
                "detailStatus"
            ).innerText =
                orderStatus;


            /* ==========================================
                    CREATED DATE
            ========================================== */

            let createdDate =
                "-";


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

                    createdDate =
                        new Date(
                            order.createdAt
                        ).toLocaleString();

                }

            }


            document.getElementById(
                "detailCreatedAt"
            ).innerText =
                createdDate;


            /* ==========================================
                    OPEN MODAL
            ========================================== */

            modal.style.display =
                "flex";


            console.log(
                "Order Details Modal Opened"
            );

        }


        catch (error) {

            console.error(
                "Error Loading Order Details:",
                error
            );

        }

    }
);


/* ==========================================
        CLOSE ORDER DETAILS MODAL
========================================== */

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

            orderDetailsModal.style.display =
                "none";

        }
    );

}


window.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            orderDetailsModal
        ) {

            orderDetailsModal.style.display =
                "none";

        }

    }
);

/* ==========================================
        ORDER SEARCH
========================================== */

const searchOrder =
    document.getElementById("searchOrder");

if (searchOrder) {

    searchOrder.addEventListener(
        "input",
        function () {

            const searchText =
                this.value.toLowerCase().trim();

            const rows =
                document.querySelectorAll(
                    "#ordersTableBody tr"
                );

            rows.forEach(function (row) {

                const orderId =
                    row.cells[0]?.textContent
                        .toLowerCase() || "";

                const customer =
                    row.cells[1]?.textContent
                        .toLowerCase() || "";

                const product =
                    row.cells[2]?.textContent
                        .toLowerCase() || "";

                if (
                    orderId.includes(searchText) ||
                    customer.includes(searchText) ||
                    product.includes(searchText)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        }
    );

}


/* ==========================================
        UPDATE ORDER STATUS
        WITH CANCEL CONFIRMATION
========================================== */

document.addEventListener(
    "change",
    async function (event) {

        if (
            !event.target.classList.contains(
                "order-status-select"
            )
        ) {
            return;
        }


        const selectElement =
            event.target;


        const orderId =
            selectElement.getAttribute(
                "data-id"
            );


        const newStatus =
            selectElement.value;


        console.log(
            "Updating Order Status:",
            orderId,
            newStatus
        );


        /* ==========================================
                CANCEL CONFIRMATION
        ========================================== */

        if (
            newStatus === "Cancelled"
        ) {

            const confirmed =
                confirm(
                    "⚠️ Are you sure you want to cancel this order?"
                );


            if (!confirmed) {

                console.log(
                    "Order Cancellation Cancelled:",
                    orderId
                );


                /* Restore Previous Status */

                const previousStatus =
                    selectElement.getAttribute(
                        "data-previous-status"
                    );


                if (previousStatus) {

                    selectElement.value =
                        previousStatus;

                    updateStatusColor(
                        selectElement
                    );

                }


                return;

            }

        }


        try {

            const orderRef =
                doc(
                    db,
                    "orders",
                    orderId
                );


            await updateDoc(
                orderRef,
                {
                    orderStatus:
                        newStatus
                }
            );


            console.log(
                "Order Status Updated Successfully:",
                newStatus
            );


            /* Save Current Status */

            selectElement.setAttribute(
                "data-previous-status",
                newStatus
            );


            updateStatusColor(
                selectElement
            );


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

/* ==========================================
        UPDATE PAYMENT STATUS
========================================== */

document.addEventListener(
    "change",
    async function (event) {

        if (
            !event.target.classList.contains(
                "payment-status-select"
            )
        ) {
            return;
        }

        const orderId =
            event.target.getAttribute("data-id");

        const newPaymentStatus =
            event.target.value;

        console.log(
            "Updating Payment Status:",
            orderId,
            newPaymentStatus
        );

        try {

            const orderRef =
                doc(db, "orders", orderId);

            await updateDoc(
                orderRef,
                {
                    paymentStatus:
                        newPaymentStatus
                }
            );

            console.log(
                "Payment Status Updated Successfully:",
                newPaymentStatus
            );

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

/* ==========================================
        PROFESSIONAL STATUS COLORS
========================================== */

function updateStatusColor(selectElement) {

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


/* ==========================================
        INITIAL STATUS COLORS
========================================== */

document
    .querySelectorAll(
        ".order-status-select, .payment-status-select"
    )
    .forEach(function (select) {

        updateStatusColor(select);

    });


/* ==========================================
        CHANGE STATUS COLOR
========================================== */

document.addEventListener(
    "change",
    function (event) {

        if (
            event.target.classList.contains(
                "order-status-select"
            ) ||
            event.target.classList.contains(
                "payment-status-select"
            )
        ) {

            updateStatusColor(
                event.target
            );

        }

    }
);

/* ==========================================
        MODULE 19 — STEP 16B
        ORDER SUMMARY STATISTICS
========================================== */

async function updateOrderSummary() {

    try {

        /* ==========================================
                GET ORDERS FROM FIRESTORE
        ========================================== */

        const querySnapshot =
            await getDocs(
                collection(
                    db,
                    "orders"
                )
            );


        /* ==========================================
                INITIAL VALUES
        ========================================== */

        let totalOrders = 0;

        let pendingOrders = 0;

        let completedOrders = 0;

        let cancelledOrders = 0;

        let totalOrderValue = 0;


        /* ==========================================
                CALCULATE STATISTICS
        ========================================== */

        querySnapshot.forEach(
            (orderDoc) => {

                const order =
                    orderDoc.data();


                totalOrders++;


                /* ==================================
                        ORDER STATUS
                ================================== */

                const status =
                    order.orderStatus ||
                    "Pending";


                if (
                    status === "Pending"
                ) {

                    pendingOrders++;

                }


                else if (
                    status === "Completed"
                ) {

                    completedOrders++;

                }


                else if (
                    status === "Cancelled"
                ) {

                    cancelledOrders++;

                }


                /* ==================================
                        ORDER AMOUNT
                ================================== */

                const amount =
                    Number(
                        order.amount || 0
                    );


                /*
                    Cancelled orders are not
                    included in total value.
                */

                if (
                    status !== "Cancelled"
                ) {

                    totalOrderValue +=
                        amount;

                }

            }
        );


        /* ==========================================
                UPDATE HTML
        ========================================== */

        const totalOrdersElement =
            document.getElementById(
                "totalOrders"
            );


        const pendingOrdersElement =
            document.getElementById(
                "pendingOrders"
            );


        const completedOrdersElement =
            document.getElementById(
                "completedOrders"
            );


        const cancelledOrdersElement =
            document.getElementById(
                "cancelledOrders"
            );


        const totalOrderValueElement =
            document.getElementById(
                "totalOrderValue"
            );


        if (totalOrdersElement) {

            totalOrdersElement.innerText =
                totalOrders;

        }


        if (pendingOrdersElement) {

            pendingOrdersElement.innerText =
                pendingOrders;

        }


        if (completedOrdersElement) {

            completedOrdersElement.innerText =
                completedOrders;

        }


        if (cancelledOrdersElement) {

            cancelledOrdersElement.innerText =
                cancelledOrders;

        }


        if (totalOrderValueElement) {

            totalOrderValueElement.innerText =
                "₹" +
                totalOrderValue;

        }


        /* ==========================================
                CONSOLE
        ========================================== */

        console.log(
            "Order Summary Updated:",
            {
                totalOrders,
                pendingOrders,
                completedOrders,
                cancelledOrders,
                totalOrderValue
            }
        );

    }


    catch (error) {

        console.error(
            "Error Updating Order Summary:",
            error
        );

    }

}


/* ==========================================
        INITIAL ORDER SUMMARY LOAD
========================================== */

updateOrderSummary();

/* ==========================================
        MODULE 19 — STEP 17B
        SUMMARY CARD ORDER FILTER
========================================== */

document.addEventListener(
    "click",
    function (event) {

        const summaryCard =
            event.target.closest(
                ".summary-card"
            );


        /* ==========================================
                CHECK SUMMARY CARD
        ========================================== */

        if (!summaryCard) {
            return;
        }


        const filter =
            summaryCard.getAttribute(
                "data-filter"
            );


        console.log(
            "Summary Card Filter:",
            filter
        );


        /* ==========================================
                GET ORDER TABLE ROWS
        ========================================== */

        const rows =
            document.querySelectorAll(
                "#ordersTableBody tr"
            );


        rows.forEach(
            function (row) {

                /* Ignore empty/no-order row */

                if (
                    !row.cells ||
                    row.cells.length < 6
                ) {

                    return;

                }


                /* ==================================
                        GET ORDER STATUS
                ================================== */

                const statusSelect =
                    row.querySelector(
                        ".order-status-select"
                    );


                if (!statusSelect) {

                    return;

                }


                const orderStatus =
                    statusSelect.value;


                /* ==================================
                        SHOW ALL ORDERS
                ================================== */

                if (
                    filter === "all"
                ) {

                    row.style.display =
                        "";

                    return;

                }


                /* ==================================
                        FILTER BY STATUS
                ================================== */

                if (
                    orderStatus ===
                    filter
                ) {

                    row.style.display =
                        "";

                }

                else {

                    row.style.display =
                        "none";

                }

            }
        );


        /* ==========================================
                REMOVE ACTIVE CLASS
        ========================================== */

        document
            .querySelectorAll(
                ".summary-card"
            )
            .forEach(
                function (card) {

                    card.classList.remove(
                        "summary-card-active"
                    );

                }
            );


        /* ==========================================
                ADD ACTIVE CLASS
        ========================================== */

        summaryCard.classList.add(
            "summary-card-active"
        );

    }
);