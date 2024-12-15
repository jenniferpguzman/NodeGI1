const fs = require('fs')

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes);
        console.log("Note Added!")
    } else {
        console.log("Note title taken")
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if( notes.length > notesToKeep.length){
        console.log("note removed")
        saveNotes(notesToKeep)
    } else {
        console.log("no note")
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log("your notes")

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(note.title)
        console.log(note.body)
    } else {
        console.log("note not found")
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dateJSON)
    } catch (e) {
        return []
    }
}

const editNotes = function (title, body) {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note) {
        note.body = body
        saveNotes(notes)
        console.log("note updated")
    } else {
        console.log("note not found")
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    editNotes: editNotes
}