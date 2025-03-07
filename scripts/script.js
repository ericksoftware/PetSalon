// console.log('Hello, world!');

// // global variable
// let globalVar = 'I am a global variable';

// function exampleFunction() {
//   // local variable
//   let localVar = 'I am a local variable';
//   console.log(globalVar);
//   console.log(localVar);
//   if (true) {
//     var blockVar = 'I am a block variable';
//     console.log(blockVar);
//   }
// }

// exampleFunction();

// // arrays

// let fruits = ['apple', 'banana', 'orange'];
// console.log(`This is an array: ${fruits}`);
// console.table(fruits);

// console.log(fruits[0]);
// console.log(fruits[1]);
// console.log(fruits[2]);

// fruits[1] = 'cherry';
// console.table(fruits);

// // array length
// console.log(fruits.length);

// // add and remove elements
// fruits.push('mango');
// console.table(fruits);

// fruits.pop();
// fruits.pop();

// console.table(fruits);

// fruits.unshift('mango');
// console.table(fruits);

// fruits.shift();
// console.table(fruits);

// // create an array of five students names
// let students = ['Erick', 'George', 'Jeffrey', 'Rafael', 'Isai'];

// for (let i = 0; i < students.length; i++) {
//   console.log(students[i]);
// }

// let person = {
//   name: 'Erick',
//   lastName: 'Vazquez',
//   age: 25,
//   isStudent: false,
// };


// // access to properties of an object
// console.log(person.name);
// console.log(person.lastName);
// console.log(person['age']);
// console.log(person.isStudent);

let student1 = {
    name: 'Juan',
    email:"juan@gmail.com",
    age: 25,
    adress: "Calle 123"
}

// create another 3 students
let student2 = {
    name: 'Maria',
    email:"maria@gmail.com",
    age: 42,
    adress: "Calle 456"
}

let student3 = {
    name: 'Pedro',
    email:"pedro@gmail.com",
    age: 32,
    adress: "Calle 789"
}

let student4 = {
    name: 'Ana',
    email:"ana@gmail.com",
    age: 19,
    adress: "Calle 1011"
}

let studentList = [student1, student2, student3, student4];
console.log("Student list: " + studentList.length);

document.getElementById("studentsCounter").innerHTML= "Total of students= " + studentList.length + " in the system";

console.log(`email: ${studentList[1].email}, adress: ${studentList[1].adress}`);

function getStudentsNames() {
    let list = document.getElementById('studentsNames');
    for (let i = 0; i < studentList.length; i++) {
        console.log(studentList[i].name);
        list.innerHTML += `<li>${studentList[i].name}</li>`;
    }
}

getStudentsNames();