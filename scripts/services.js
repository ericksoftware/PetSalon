// Salon Services Object
let salonServices = {
    name: "Pet Salon Services",
    services: readServices() // Load services from local storage on page load
};

class Service {
    constructor(description, price) {
        this.description = description;
        this.price = price;
    }
}

function registerService(event) {
    event.preventDefault(); // Prevent form submission

    let description = $("#service-description").val();
    let price = parseFloat($("#service-price").val());

    if (!description || isNaN(price) || price <= 0) {
        showNotification("Please provide a valid description and price.", "error");
        return;
    }

    let newService = new Service(description, price);
    salonServices.services.push(newService);

    displayServiceRow();
    clearServiceForm();
    showNotification("Service registered successfully!", "success");
    save(salonServices.services); // Save the entire array of services
}

function displayServiceRow() {
    let tableBody = $("#service-table-body");
    tableBody.empty(); // Clear previous content

    salonServices.services.forEach((service, index) => {
        let price = typeof service.price === "number" && !isNaN(service.price)
            ? service.price.toFixed(2)
            : "0.00";

        let row = `
            <tr>
                <td>${service.description}</td>
                <td>$${price}</td>
                <td>
                    <button onclick="removeService(${index})" class="btn btn-danger btn-sm">Remove</button>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}

function removeService(index) {
    salonServices.services.splice(index, 1);
    displayServiceRow();
    showNotification("Service removed successfully!", "success");
    save(salonServices.services); // Update local storage
}

function clearServiceForm() {
    $("#service-form")[0].reset();
}

function showNotification(message, type) {
    $("#notification-container").empty();
    let notification = $(`<div class="alert alert-${type} mt-3">${message}</div>`);
    $("#notification-container").append(notification);
    setTimeout(() => notification.fadeOut(), 3000);
}

$(document).ready(function () {
    $("#service-form").on("submit", registerService);
    displayServiceRow(); // Display existing services on page load
});