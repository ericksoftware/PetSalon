function displayPets(){
    let cardSection = document.getElementById("pets");
    let result = "";
    
    for (let i = 0; i < pets.length; i++) {
        console.log(pets[i]);

        let pet = pets[i];
        result += `
        <div id="${i}" class="card col-3 mx-2">
            <div class="card-body">
                <p>${pet.name}</p>
                <p>${pet.age}</p>
                <p>${pet.gender}</p>
                <p>${pet.breed}</p>
                <p>${pet.service}</p>
                `;
    }
    cardSection.innerHTML = result;
}