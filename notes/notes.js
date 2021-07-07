const { Console } = require('console')
const fs = require('fs')

const addNote = (id,Mark, name,comment) => {
    const notes = loadNotes() 
    const doplecateid = notes.filter((note)=>{
        return note.id===id
    })
    if(doplecateid.length===0){

        notes.push({
            id:id,
            Mark :Mark ,
            name,
            comment,

        })
        saveNotes(notes)
        console.log("save successfuly")
    }
    else console.log("error dublicated")


}
const removeNote = (id)=>{
    const notes = loadNotes()
    const studentTokeep = notes.filter((students)=>{
        
        if(students.id !==id)  console.log("faild to find id to remove student")
      if(students.id===id)  console.log("sucses remove student")
      return students.id !== id
    })
    
    saveNotes(studentTokeep)
    // console.log("studentes to keep", studentTokeep)
}
const readnotes = (id)=>{
    const notes =loadNotes()
    const note = notes.find((notes)=>{
        return notes.id===id
    })
    if (note){
        console.log(note) 
        console.log("id is "+note.id) 
        console.log("Mark  is "+note.Mark ) 
        console.log("Name  is "+note.name ) 
        console.log("coment  is "+note.Comment ) 

      }
      else{ console.log("not found")
    }
}
const listnotes = ()=>{
    const notes =loadNotes()
     notes.forEach(element => {
        console.log(element.name)
        console.log(element.Mark)
    });



}

// Return array 
const loadNotes = () =>{
    try{
    const dataBuffer = fs.readFileSync('notes.json').toString()
    return JSON.parse(dataBuffer)
   
    }
    catch(e){
        return [];
    }
  
}

const saveNotes = (notes) =>{
    const saveData = JSON.stringify(notes)
    fs.writeFileSync('notes.json',saveData)
    console.log(fs.readFileSync('notes.json').toString())
}

module.exports = {
    addNote,
    removeNote,
    readnotes,
    listnotes
}