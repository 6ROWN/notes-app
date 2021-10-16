
const addBtn = document.getElementById("add")

//Updating local storage to DOM
const notes = JSON.parse(localStorage.getItem("notes"))
if (notes){
    notes.forEach(note=> addNewNote(note))
}

addBtn.addEventListener("click", ()=>addNewNote(""))

function addNewNote (text = ""){
    const note = document.createElement("div");
    note.classList.add("notes");
    note.innerHTML = `
        <div class="tools">
            <button class="edit">
                <i class='bx bxs-edit' ></i>
            </button>
            <button class="remove">
                <i class='bx bx-trash' ></i>
            </button>
        </div>

        <div class="main ${text? "":"hidden"}"> </div>
        <textarea class = "${text? "hidden": ""}"> </textarea>
        <div class="date"> ${new Date()}<div>
        
    `

    const deleteBtn = note.querySelector(".remove")
            editBtn = note.querySelector(".edit")
            main = note.querySelector(".main")
            textArea = note.querySelector("textarea")
            textArea.value = text;

    main.innerHTML = marked(text)
    

    //Deleting notes
    deleteBtn.addEventListener("click", ()=>{
        note.remove()
        updateLS()
    })

    //Edit notes
    editBtn.addEventListener("click", ()=>{
        main.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
        
    })

    //Inputting notes
    textArea.addEventListener("input", (e)=>{
        const {value} = e.target
        main.innerHTML = marked(value)
        updateLS()

    })
    

    document.body.appendChild(note)
}

//updating local storage
function updateLS(){
    const noteText = document.querySelectorAll("textarea")
    const notes = []
    noteText.forEach(note=>{
        notes.push(note.value)
    })

    localStorage.setItem("notes", JSON.stringify(notes))

}