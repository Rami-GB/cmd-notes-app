const chalk = require('chalk');
const yargs = require('yargs');
const notesUtil = require('./notes');

//-----add, remove, read, list:-----//
console.log(yargs.argv);
//creat add command
yargs.command({
    command: 'add',
    describe: 'adding a new note',
    builder: {
        title: {
            describe: 'title of your note',
            demandOption: true,
            type: String
        },
        body: {
            describe: 'the body of your note',
            demandOption: true,
            type: String
        }
    },
    handler(argv) {
       notesUtil.addNote(argv.title, argv.body);
       
    }
});

//creat remove command
yargs.command({
    command: 'remove',
    describe: 'removing a note',
    builder: {
        title: {
            describe: 'title of note',
            demandOption: true,
            type: String
        }
    },
    handler(argv) {
        notesUtil.removeNote(argv.title);
    }
});

//creat list command
yargs.command({
    command: 'list',
    describe: 'listing a note',
    handler() {
        notesUtil.listNotes();
    }
});

//creat read command
yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            describe: "your note's title",
            demandOption: true,
            type: String
        }
    },
    handler(argv) {
        notesUtil.readNote(argv.title);
    }
});

yargs.parse();

