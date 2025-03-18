// Salon Object
let salon = {
    name: "Pet Salon",
    pets: []
};

class Pet {
    constructor(name, age, gender, breed, service, type, color, payment) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.breed = breed;
        this.service = service;
        this.type = type;
        this.color = color;
        this.payment = payment;
    }
}

let editIndex = -1;

function registerPet(event) {
    event.preventDefault(); // Prevent form submission

    let name = $("#pet-name").val();
    let age = parseInt($("#pet-age").val());
    let gender = $("#pet-gender").val();
    let breed = $("#pet-breed").val();
    let service = $("#pet-service").val();
    let type = $("#pet-type").val();
    let color = $("#pet-color").val();
    let payment = $("#payment-method").val();

    if (!name || !age || !gender || !breed || !service || !type || !color || !payment) {
        showNotification("Please fill in all fields.", "error");
        return;
    }

    let newPet = new Pet(name, age, gender, breed, service, type, color, payment);

    if (isValid(newPet)) {
        if (editIndex === -1) {
            salon.pets.push(newPet);
            showNotification("Pet registered successfully!", "success");
        } else {
            salon.pets[editIndex] = newPet;
            editIndex = -1;
            showNotification("Pet updated successfully!", "success");
        }

        updatePetCount();
        displayRow();
        calculateAverageAge();
        clearInput();
        displayInfo();
    } else {
        showNotification("Invalid pet details. Please check your inputs.", "error");
    }
}

// Validate Pet Function
function isValid(pet) {
    return pet.name.trim() !== "" && !isNaN(pet.age) && pet.age > 0;
}

// Clear Input Fields
function clearInput() {
    $("#pet-form")[0].reset();
}

// Update Pet Count
function updatePetCount() {
    $("#pet-count").text(salon.pets.length);
}

// Display Pets in Table
function displayRow() {
    let tableBody = $("#pet-table-body");
    tableBody.empty(); // Clear previous content

    salon.pets.forEach((pet, index) => {
        let row = `
            <tr>
                <td>${pet.name}</td>
                <td>${pet.age}</td>
                <td>${pet.gender}</td>
                <td>${pet.breed}</td>
                <td>${pet.service}</td>
                <td>${pet.type}</td>
                <td>${pet.color}</td>
                <td>${pet.payment}</td>
                <td>
                    <button onclick="removePet(${index})" class="btn btn-danger btn-sm">Remove</button>
                    <button onclick="editPet(${index})" class="btn btn-warning btn-sm">Edit</button>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}

// Calculate Average Age
function calculateAverageAge() {
    let totalAge = salon.pets.reduce((sum, pet) => sum + pet.age, 0);
    let avgAge = salon.pets.length > 0 ? (totalAge / salon.pets.length).toFixed(1) : 0;
    $("#avg-age").text(avgAge);
}

// Remove Pet Function
function removePet(index) {
    salon.pets.splice(index, 1);
    updatePetCount();
    displayRow();
    calculateAverageAge();
    displayInfo();
    showNotification("Pet removed successfully!", "success");
}

// Edit Pet Function
function editPet(index) {
    let pet = salon.pets[index];
    editIndex = index;

    $("#pet-name").val(pet.name);
    $("#pet-age").val(pet.age);
    $("#pet-gender").val(pet.gender);
    $("#pet-breed").val(pet.breed);
    $("#pet-service").val(pet.service);
    $("#pet-type").val(pet.type);
    $("#pet-color").val(pet.color);
    $("#payment-method").val(pet.payment);
}

// Show Notification Function
function showNotification(message, type) {
    // Remove any existing notifications
    $("#notification").remove();

    // Create a new notification element
    let notification = $(`<div id="notification" class="alert alert-${type} mt-3">${message}</div>`);

    // Insert the notification below the form
    $("#pet-form").after(notification);

    // Automatically remove the notification after 3 seconds
    setTimeout(() => notification.fadeOut(), 3000);
}

// Initialize Form Submission
$(document).ready(function () {
    $("#pet-form").on("submit", registerPet);
});

// Initialize with Sample Data
function init() {
    let pet1 = new Pet("Buddy", 3, "Male", "Golden Retriever", "Grooming", "Dog", "Golden", "Cash");
    let pet2 = new Pet("Misty", 2, "Female", "Siamese", "Nail Trim", "Cat", "White", "Credit Card");
    let pet3 = new Pet("Rocky", 4, "Male", "Bulldog", "Bath", "Dog", "Brown", "Paypal");

    salon.pets.push(pet1, pet2, pet3);

    updatePetCount();
    displayRow();
    calculateAverageAge();
    displayInfo();
}

function displayInfo() {
    // Contadores para cada servicio
    let groomingTotal = 0;
    let nailTrimTotal = 0;
    let bathTotal = 0;

    // Iterar sobre las mascotas y contar los servicios
    for (let i = 0; i < salon.pets.length; i++) {
        switch (salon.pets[i].service) {
            case "Grooming":
                groomingTotal++;
                break;
            case "Nail Trim":
                nailTrimTotal++;
                break;
            case "Bath":
                bathTotal++;
                break;
        }
    }

    // Mostrar los totales en la pantalla
    document.getElementById("gTotal").textContent = groomingTotal;
    document.getElementById("nTotal").textContent = nailTrimTotal;
    document.getElementById("bTotal").textContent = bathTotal;
}

window.onload = init;