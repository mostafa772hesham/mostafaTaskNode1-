
const { number } = require("yargs");
const yargs = require("yargs");


const notes = require('./notes')

yargs.command({
  command: "add",
  describe: "Add students",
  builder: {
    id: {
      describe: "This is id to our student",
      demandOption: true,
      type: "string",
    },
    name : {
      describe: "This is Mark  to our student",
      demandOption: true,
      type: "string",
    },
    Mark : {
      describe: "This is Mark  to our student",
      demandOption: true,
      type: number,
    },
   
    Comment: {
      describe: "This is Mark  to our student",
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.id,argv.Mark,argv.name,argv.Comment)
  },
});

yargs.command({
  command: "delete",
  describe: "Delete students",
  builder: {
    id: {
      describe: "This is id to our student",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNote(argv.id)
  },
});

yargs.command({
  command: "read",
  describe: "Read students",
  builder: {
    id: {
      describe: "This is id to our student",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readnotes(argv.id)
  },
});

yargs.command({
  command: "list",
  describe: "List students",
 
  handler: () => {
    notes.listnotes()

  },
});


yargs.parse()

