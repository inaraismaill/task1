const form = document.querySelector("form");
const orders = document.getElementById("orders");
const totalCountElement = document.querySelector("h2 span");
const totalPriceElement = document.querySelector("h3 span");

window.addEventListener("load", loadOrders);

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const productName = form.elements[0].value;
    const productPrice = form.elements[1].value;

    if (productName && productPrice) {
        addOrder(productName, productPrice);
        saveOrderToLocalStorage(productName, productPrice);
        form.elements[0].value = '';
        form.elements[1].value = '';
        updateTotals(); 
    } else {
        alert("Ad ve qiymet daxil edin");
    }
});

function addOrder(productName, productPrice) {
    const orderDiv = document.createElement("div");
    orderDiv.className = "order";

    const orderText = document.createElement("h1");
    orderText.textContent = `${productName} (${productPrice} AZN)`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener("click", function () {
        orderDiv.remove();
        removeOrderFromLocalStorage(productName, productPrice);
        updateTotals(); 
    });

    orderDiv.appendChild(orderText);
    orderDiv.appendChild(deleteButton);
    orders.appendChild(orderDiv);
}

function saveOrderToLocalStorage(productName, productPrice) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ name: productName, price: productPrice });
    localStorage.setItem("orders", JSON.stringify(orders));
}

function loadOrders() {
    let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    savedOrders.forEach(order => {
        addOrder(order.name, order.price);
    });
    updateTotals(); 
}

function removeOrderFromLocalStorage(productName, productPrice) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.filter(order => !(order.name === productName && order.price === productPrice));
    localStorage.setItem("orders", JSON.stringify(orders));
}

function updateTotals() {
    let savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    let totalProducts = savedOrders.length;
    let totalPrice = savedOrders.reduce((sum, order) => sum + Number(order.price), 0);

    totalCountElement.textContent = totalProducts;
    totalPriceElement.textContent = totalPrice;
}
