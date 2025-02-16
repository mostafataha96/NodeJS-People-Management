const fs = require("fs");

// fs.writeFileSync("data.txt", "mostafa Abdelfattah Taha");

const yargs = require("yargs");

const data = require("./data")


// add
yargs.command({
  command: "add",
  description: "Add a person",
  builder: {
    id: {
      description: "Person ID",
      type: "number",
      demandOption: true,
    },
    firstName: {
      description: "First name of the person",
      type: "string",
      demandOption: true,
    },
    lastName: {
      description: "Last name of the person",
      type: "string",
      demandOption: true,
    },
    age: {
      description: "Age of the person",
      type: "number",
      demandOption: true,
    },
    city: {
      description: "City of the person",
      type: "string",
      demandOption: true,
    },
  },
  handler: (argv) => {
    data.addPerson(argv.id, argv.firstName, argv.lastName, argv.age, argv.city);
    console.log("Person added!");
  },
});

// view-all
yargs.command({
  command: "view-all",
  description: "View all people",
  handler: () => {
    data.viewAllPeople();
  },
});

// view
yargs.command({
    command: 'view',
    description: 'View a specific person', 
    builder: {
    id: {
      description: 'Person ID to view',
      type: 'number',
      demandOption: true
    }
  },
  handler: (argv) => {
    data.viewSpecificPerson(argv.id);
  }})


// delete
  yargs.command({
    command:'delete',
    description: 'Delete a specific person or all people',
    builder: {
    id: {
      description: 'Person ID to delete',
      type: 'number',
    }
  },
  handler: (argv) => {
    if (argv.id) {
      data.deleteSpecificPerson(argv.id);
    } else {
      data.deleteAllPeople();
    }
  }})

  yargs.parse();