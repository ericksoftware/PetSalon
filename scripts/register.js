$(document).ready(function () {
    // Load services from localStorage
    let services = readServices();
    let serviceSelect = $("#pet-service");
    serviceSelect.empty(); // Clear existing options
    serviceSelect.append('<option value="" disabled selected>Select Service</option>');

    // Populate the dropdown with services
    services.forEach(service => {
        serviceSelect.append(`<option value="${service.description}">${service.description} - $${service.price.toFixed(2)}</option>`);
    });

    // Handle service selection
    $("#pet-service").on("change", function () {
        let selectedService = $(this).val();
        if (selectedService) {
            showNotification(`Service "${selectedService}" selected.`, "success");
        }
    });
});

// Show notifications
function showNotification(message, type) {
    $("#notification-container").empty();
    let notification = $(`<div class="alert alert-${type} mt-3">${message}</div>`);
    $("#notification-container").append(notification);
    setTimeout(() => notification.fadeOut(), 3000);
}