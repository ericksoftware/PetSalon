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
        this.color = color; // New attribute
        this.payment = payment; // New attribute
    }
}

let editIndex = -1;

function registerPet(event) {
    event.preventDefault(); // no reload

    let name = document.getElementById("pet-name").value;
    let age = parseInt(document.getElementById("pet-age").value);
    let gender = document.getElementById("pet-gender").value;
    let breed = document.getElementById("pet-breed").value;
    let service = document.getElementById("pet-service").value;
    let type = document.getElementById("pet-type").value;
    let color = document.getElementById("pet-color").value; // New field
    let payment = document.getElementById("pet-payment").value; // New field

    if (!name || !age || !gender || !breed || !service || !type || !color || !payment) {
        alert("Please fill in all fields.");
        return;
    }

    let newPet = new Pet(name, age, gender, breed, service, type, color, payment);
    
    if (isValid(newPet)) {
        if (editIndex === -1) {
            salon.pets.push(newPet);
        } else {
            salon.pets[editIndex] = newPet;
            editIndex = -1;
        }

        updatePetCount();
        displayRow();
        calculateAverageAge();
        clearInput();
        displayInfo(); 
    }
}

// validate form
function isValid(pet){
    let valid = true;

    if (pet.name == ""){
        valid = false;
    }

    return valid;
}

function clearInput() {
    document.getElementById("pet-form").reset();
}

function updatePetCount() {
    document.getElementById("pet-count").textContent = salon.pets.length;
}

function displayRow() {
    let tableBody = document.getElementById("pet-table-body");
    tableBody.innerHTML = ""; // Clear previous content

    salon.pets.forEach((pet, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${pet.name}</td>
            <td>${pet.age}</td>
            <td>${pet.gender}</td>
            <td>${pet.breed}</td>
            <td>${pet.service}</td>
            <td>${pet.type}</td>
            <td>${pet.color}</td> <!-- New Column for Color -->
            <td>${pet.payment}</td> <!-- New Column for Payment -->
            <td>
                <button onclick="removePet(${index})">Remove</button>
                <button onclick="editPet(${index})">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function calculateAverageAge() {
    let totalAge = salon.pets.reduce((sum, pet) => sum + pet.age, 0);
    let avgAge = salon.pets.length > 0 ? (totalAge / salon.pets.length).toFixed(1) : 0;
    document.getElementById("avg-age").textContent = avgAge;
}

function removePet(index) {
    salon.pets.splice(index, 1);
    updatePetCount();
    displayRow();
    calculateAverageAge();
    displayInfo(); 
}

function editPet(index) {
    let pet = salon.pets[index];
    editIndex = index;

    document.getElementById("pet-name").value = pet.name;
    document.getElementById("pet-age").value = pet.age;
    document.getElementById("pet-gender").value = pet.gender;
    document.getElementById("pet-breed").value = pet.breed;
    document.getElementById("pet-service").value = pet.service;
    document.getElementById("pet-type").value = pet.type;
    document.getElementById("pet-color").value = pet.color; // New field
    document.getElementById("pet-payment").value = pet.payment; // New field
}

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

function displayInfo(){
    let groomingDiv = document.getElementById("gTotal");

    let groomingTotal = 0;
    for(let i = 0; i < salon.pets.length; i++){
        if(salon.pets[i].service === "Grooming"){
            groomingTotal++;
        }
    }

    groomingDiv.innerHTML = groomingTotal;
}

window.onload = init;