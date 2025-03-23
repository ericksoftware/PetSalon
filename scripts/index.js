// Sample data for services and pet types
const services = [
    { 
        name: "Grooming", 
        description: "Full grooming service for your pet.",
        image: "../img/grooming_1.jpg" 
    },
    { 
        name: "Nail Trim", 
        description: "Professional nail trimming.",
        image: "../img/nail.jpg"
    },
    { 
        name: "Bath", 
        description: "Relaxing bath and cleaning.",
        image: "../img/bath.jpg"
    },
];

const petTypes = [
    { name: "Dog", image: "../img/images_1.jpg" },
    { name: "Cat", image: "../img/cat_1.jpg" },
    { name: "Axolotl", image: "../img/axolot.jpg" },
    { name: "Dragon", image: "../img/dragon.jpg" },
    { name: "Mermaid", image: "../img/mermaid_1.jpg" },
    { name: "Velociraptor", image: "../img/valo.jpg"}
];

// Function to display services
function displayServices() {
    const servicesContainer = document.getElementById("services-container");
    servicesContainer.innerHTML = services
        .map(
            (service) => `
        <div class="col-md-4">
            <div class="card h-100">
                <img src="${service.image}" class="card-img-top" alt="${service.name} service">
                <div class="card-body">
                    <h5 class="card-title">${service.name}</h5>
                    <p class="card-text">${service.description}</p>
                </div>
            </div>
        </div>
    `
        )
        .join("");
}

// Function to display pet types
function displayPetTypes() {
    const petTypesContainer = document.getElementById("pet-types-container");
    petTypesContainer.innerHTML = petTypes
        .map(
            (type) => `
        <div class="col-md-4">
            <div class="card h-100">
                <img src="${type.image}" class="card-img-top" alt="${type.name} pet">
                <div class="card-body">
                    <h5 class="card-title">${type.name}</h5>
                </div>
            </div>
        </div>
    `
        )
        .join("");
}

// Function to display registered pets
function displayRegisteredPets() {
    const registeredPetsContainer = document.getElementById("registered-pets-container");
    if (!registeredPetsContainer) return;
    
    registeredPetsContainer.innerHTML = salon.pets
        .map(
            (pet, index) => `
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">Age: ${pet.age}</p>
                    <p class="card-text">Type: ${pet.type}</p>
                    <p class="card-text">Service: ${pet.service}</p>
                    <button class="btn btn-primary btn-sm" onclick="showMoreInfo(${index})">View More</button>
                </div>
            </div>
        </div>
    `
        )
        .join("");
}

// Function to show more info about a pet
function showMoreInfo(index) {
    const pet = salon.pets[index];
    alert(
        `Name: ${pet.name}\nAge: ${pet.age}\nGender: ${pet.gender}\nBreed: ${pet.breed}\nService: ${pet.service}\nType: ${pet.type}\nColor: ${pet.color}\nPayment: ${pet.payment}`
    );
}

// Initialize the page
function init() {
    displayServices();
    displayPetTypes();
    if (document.getElementById("registered-pets-container")) {
        displayRegisteredPets();
    }
}

window.onload = init;