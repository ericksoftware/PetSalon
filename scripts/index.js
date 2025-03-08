// Salon Object
let salon = {
    name: "Pet Salon",
    pets: []
};

class Pet {
    constructor(name, age, gender, breed, service, type) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.breed = breed;
        this.service = service;
        this.type = type;
    }
}

function registerPet(event) {
    event.preventDefault(); // Prevent form reload

    let name = document.getElementById("pet-name").value;
    let age = parseInt(document.getElementById("pet-age").value);
    let gender = document.getElementById("pet-gender").value;
    let breed = document.getElementById("pet-breed").value;
    let service = document.getElementById("pet-service").value;
    let type = document.getElementById("pet-type").value;

    if (!name || !age || !gender || !breed || !service || !type) {
        alert("Please fill in all fields.");
        return;
    }

    let newPet = new Pet(name, age, gender, breed, service, type);
    salon.pets.push(newPet);

    updatePetCount();
    displayPets();
    calculateAverageAge();
    clearForm();
}

function clearForm() {
    document.getElementById("pet-form").reset();
}

function updatePetCount() {
    document.getElementById("pet-count").textContent = salon.pets.length;
}

function displayPets() {
    let container = document.getElementById("pet-container");
    container.innerHTML = ""; // Clear previous content

    salon.pets.forEach(pet => {
        let petCard = document.createElement("div");
        petCard.classList.add("pet-card");
        petCard.innerHTML = `
            <h3>${pet.name}</h3>
            <p><strong>Age:</strong> ${pet.age} years</p>
            <p><strong>Gender:</strong> ${pet.gender}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Service:</strong> ${pet.service}</p>
            <p><strong>Type:</strong> ${pet.type}</p>
        `;
        container.appendChild(petCard);
    });
}

function calculateAverageAge() {
    let totalAge = salon.pets.reduce((sum, pet) => sum + pet.age, 0);
    let avgAge = salon.pets.length > 0 ? (totalAge / salon.pets.length).toFixed(1) : 0;
    document.getElementById("avg-age").textContent = avgAge;
}

function init() {
    let pet1 = new Pet("Buddy", 3, "Male", "Golden Retriever", "Grooming", "Dog");
    let pet2 = new Pet("Misty", 2, "Female", "Siamese", "Nail Trim", "Cat");
    let pet3 = new Pet("Rocky", 4, "Male", "Bulldog", "Bath", "Dog");

    salon.pets.push(pet1, pet2, pet3);

    updatePetCount();
    displayPets();
    calculateAverageAge();
}

window.onload = init;
