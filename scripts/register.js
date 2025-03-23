
function savePets(pets) {
    localStorage.setItem("pets", JSON.stringify(pets));
}

function readPets() {
    let petsData = localStorage.getItem("pets");
    
    if (petsData == null) {
        return [];
    }
    
    try {
        return JSON.parse(petsData);
    } catch (error) {
        console.error("Error parsing pets from localStorage:", error);
        return [];
    }
}

function deletePet(petId) {
    let pets = readPets();
    pets = pets.filter(pet => pet.id !== petId);
    savePets(pets);
}


$(document).ready(function () {
    let editMode = false;
    let editPetId = null;
    
    let services = readServices();
    let serviceSelect = $("#pet-service");
    serviceSelect.empty();
    serviceSelect.append('<option value="" disabled selected>Select Service</option>');
    
    services.forEach(service => {
        serviceSelect.append(`<option value="${service.description}">${service.description} - $${service.price.toFixed(2)}</option>`);
    });
    
    displayPets();
    
    $("#pet-form").on("submit", function (e) {
        e.preventDefault();
        
        const pet = {
            id: editMode ? editPetId : Date.now(),
            name: $("#pet-name").val(),
            age: $("#pet-age").val(),
            service: $("#pet-service").val(),
            type: $("#pet-type").val(),
            breed: $("#pet-breed").val(),
            gender: $("#pet-gender").val(),
            color: $("#pet-color").val(),
            payment: $("#payment-method").val()
        };
        
        if (editMode) {
            updatePet(pet);
            showNotification("Pet updated successfully!", "success");
            editMode = false;
            editPetId = null;
            $("#pet-form button[type='submit']").text("Register Pet");
        } else {
            addPet(pet);
            showNotification("Pet registered successfully!", "success");
        }
        
        this.reset();
        
        displayPets();
    });
    
    $("#pet-service").on("change", function () {
        let selectedService = $(this).val();
        if (selectedService) {
            showNotification(`Service "${selectedService}" selected.`, "success");
        }
    });
});

function addPet(pet) {
    let pets = readPets();
    pets.push(pet);
    savePets(pets);
}

function updatePet(updatedPet) {
    let pets = readPets();
    const index = pets.findIndex(pet => pet.id === updatedPet.id);
    
    if (index !== -1) {
        pets[index] = updatedPet;
        savePets(pets);
    }
}

function loadPetForEdit(petId) {
    let pets = readPets();
    const pet = pets.find(p => p.id === petId);
    
    if (pet) {
        $("#pet-name").val(pet.name);
        $("#pet-age").val(pet.age);
        $("#pet-service").val(pet.service);
        $("#pet-type").val(pet.type);
        $("#pet-breed").val(pet.breed);
        $("#pet-gender").val(pet.gender);
        $("#pet-color").val(pet.color);
        $("#payment-method").val(pet.payment);
        
        $("#pet-form button[type='submit']").text("Update Pet");
        
        editMode = true;
        editPetId = petId;
        
        $('html, body').animate({
            scrollTop: $("#pet-form").offset().top - 100
        }, 500);
    }
}

function displayPets() {
    const pets = readPets();
    const petsContainer = $("#pets-container");
    
    if (petsContainer.length === 0) {
        $("section").after(`
            <section class="mt-5">
                <div class="container bg-white p-4 rounded shadow-lg">
                    <h2 class="text-center mb-4">Registered Pets</h2>
                    <div id="pets-container" class="row g-4"></div>
                </div>
            </section>
        `);
    }
    
    $("#pets-container").empty();
    
    if (pets.length === 0) {
        $("#pets-container").html('<p class="text-center col-12">No pets registered yet.</p>');
        return;
    }
    
    pets.forEach(pet => {
        $("#pets-container").append(`
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-header bg-primary text-white">
                        <h5 class="card-title mb-0">${pet.name}</h5>
                    </div>
                    <div class="card-body">
                        <p><strong>Type:</strong> ${pet.type}</p>
                        <p><strong>Breed:</strong> ${pet.breed}</p>
                        <p><strong>Age:</strong> ${pet.age}</p>
                        <p><strong>Gender:</strong> ${pet.gender}</p>
                        <p><strong>Color:</strong> ${pet.color}</p>
                        <p><strong>Service:</strong> ${pet.service}</p>
                        <p><strong>Payment:</strong> ${pet.payment}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-warning edit-pet" data-id="${pet.id}">Edit</button>
                        <button class="btn btn-danger delete-pet" data-id="${pet.id}">Delete</button>
                    </div>
                </div>
            </div>
        `);
    });
    
    $(".edit-pet").on("click", function() {
        const petId = parseInt($(this).data("id"));
        loadPetForEdit(petId);
    });
    
    $(".delete-pet").on("click", function() {
        const petId = parseInt($(this).data("id"));
        
        if (confirm("Are you sure you want to delete this pet?")) {
            deletePet(petId);
            displayPets();
            showNotification("Pet deleted successfully!", "success");
        }
    });
}

function showNotification(message, type) {
    $("#notification-container").empty();
    let notification = $(`<div class="alert alert-${type} mt-3">${message}</div>`);
    $("#notification-container").append(notification);
    setTimeout(() => notification.fadeOut(), 3000);
}