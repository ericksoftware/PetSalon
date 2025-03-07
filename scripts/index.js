
let pets = [
    { name: "Buddy", age: 3, gender: "Male", service: "Grooming", breed: "Golden Retriever" },
    { name: "Misty", age: 2, gender: "Female", service: "Nail Trim", breed: "Siamese" },
    { name: "Rocky", age: 4, gender: "Male", service: "Bath", breed: "Bulldog" }
];

function updatePetCount() {
    document.getElementById("pet-count").textContent = pets.length;
}

function displayPets() {
    let container = document.getElementById("pet-container");
    container.innerHTML = ""; // Clear previous content

    pets.forEach(pet => {
        let petCard = document.createElement("div");
        petCard.classList.add("pet-card");
        petCard.innerHTML = `
            <h3>${pet.name}</h3>
            <p><strong>Age:</strong> ${pet.age} years</p>
            <p><strong>Gender:</strong> ${pet.gender}</p>
            <p><strong>Service:</strong> ${pet.service}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
        `;
        container.appendChild(petCard);
    });
}

function calculateAverageAge() {
    let totalAge = pets.reduce((sum, pet) => sum + pet.age, 0);
    let avgAge = pets.length > 0 ? (totalAge / pets.length).toFixed(1) : 0;
    document.getElementById("avg-age").textContent = avgAge;
}

function addRandomPet() {
    let randomPets = [
        { name: "Luna", age: 1, gender: "Female", service: "Bath", breed: "Poodle" },
        { name: "Thor", age: 5, gender: "Male", service: "Haircut", breed: "Husky" },
        { name: "Coco", age: 2, gender: "Male", service: "Vaccination", breed: "Chihuahua" },
        { name: "Bella", age: 3, gender: "Female", service: "Grooming", breed: "Labrador" },
        { name: "Simba", age: 4, gender: "Male", service: "Bath", breed: "Persian Cat" }
    ];

    let newPet = randomPets[Math.floor(Math.random() * randomPets.length)];
    pets.push(newPet);
    updatePetCount();
    displayPets();
    calculateAverageAge();
}

function init() {
    updatePetCount();
    displayPets();
    calculateAverageAge();
}

window.onload = init;
