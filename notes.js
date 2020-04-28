const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    //returns an array of notes
    let notes = loadNotes();
    let duplicateNote = notes.find(e => e.title === title);

    if (!duplicateNote) {
        let newNote = {
            title: title,
            body: body
        }

        notes.push(newNote);
        saveNotes(notes);
        console.log('new note is added!');
    } else {
        console.log('note title is taken!');
    }
}

const removeNote = (title) => {
    //1. loead notes
    let notes = loadNotes();
    //2.filter notes based on title
    let Newnotes = notes.filter(e => !(e.title === title));

    if (Newnotes.length !== notes.length) {
        //3. save them back to file
        saveNotes(Newnotes);
        console.log(`${chalk.black.bgGreen('Note removed !')}`);
    } else {
        console.log(`${chalk.black.bgRed('Note title not found !')}`);
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const JsonNotes = JSON.stringify(notes);
    fs.writeFileSync('notes.json', JsonNotes);
}

const listNotes = () => {
    const notesTitles = loadNotes().map(element => element.title);

    console.log(`${chalk.bgGreen.black('--- YOUR NOTES ---')}`);
    notesTitles.forEach(el => {
        console.log(`${chalk.red('-')} ${el}`);
    });
}

const readNote = (title) => {
    const note = loadNotes().find(e => e.title === title);

    if(note) {
        console.log(`${chalk.yellow(`${note.title.toUpperCase()}`)}`);
        console.log(note.body);
    } else {
        console.log(`${chalk.red('title not existing !')}`);
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}