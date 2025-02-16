// Create an array to store the data of people
// let people = [];

const fs = require("fs");

// Function to add a person to the array
const addPerson = (id, firstName, lastName, age, city) => {
  const allData = loadInfo();

  const duplicatedData = allData.filter((obj) => {
    return obj.id === id;
  });

  if (duplicatedData.length == 0) {
    allData.push({
      id: id,
      firstName: firstName,
      lastName: lastName,
      city: city,
      age: age,
    });
    savealldata(allData);
  } else {
    console.log("ERROR DUPLICATED DATA");
  }

  //   const person = { id, firstName, lastName, age, city };
  //   people.push(person);
};

const loadInfo = () => {
  try {
    const dataJson = fs.readFileSync("data.json").toString();
    return JSON.parse(dataJson);
  } catch {
    return [];
  }
};

/////////////////////////////////////////////////////////////////////

const savealldata = (allData) => {
  const saveallDataJson = JSON.stringify(allData);
  fs.writeFileSync("data.json", saveallDataJson);
};

///////////////////////////////////////////////////////////////////////

// Function to view all people
const viewAllPeople = () => {
  const allData = loadInfo();
  if (allData.length === 0) {
    console.log("No people in the system.");
  } else {
    console.log("People in the system:");
    allData.forEach((person) => {
      console.log(
        `ID: ${person.id}, Name: ${person.firstName} ${person.lastName}, Age: ${person.age}, City: ${person.city}`
      );
    });
  }
};

// Function to view a specific person by ID
const viewSpecificPerson = (id) => {
  const allData = loadInfo();
  const person = allData.find((p) => p.id == id);
  if (person) {
    console.log(
      `ID: ${person.id}, Name: ${person.firstName} ${person.lastName}, Age: ${person.age}, City: ${person.city}`
    );
  } else {
    console.log(`Person with ID ${id} not found.`);
  }
};

// Function to delete a specific person by ID
const deleteSpecificPerson = (id) => {
  const allData = loadInfo();
  const index = allData.findIndex((p) => p.id == id);
  if (index !== -1) {
    allData.splice(index, 1);
    savealldata(allData);
    console.log(`Person with ID ${id} has been deleted.`);
  } else {
    console.log(`Person with ID ${id} not found.`);
  }
};

// Function to delete all people
const deleteAllPeople = () => {
  savealldata([]);
  console.log("All people have been deleted.");
};

module.exports = {
  addPerson,
  viewAllPeople,
  viewSpecificPerson,
  deleteSpecificPerson,
  deleteAllPeople,
};
