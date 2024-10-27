const addButton = document.getElementById("add");
// Initialize notes from localStorage, or start with an empty array if none exist
const notes = JSON.parse(localStorage.getItem("notes")) || [];

// Update localStorage with the current notes
const updateLocalStorage = () => {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Function to create and add a new note
const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
  <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>`;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = text ? marked.parse(text) : "";

  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });

  editButton.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    updateLocalStorage();
  });

  document.getElementById("notes-container").appendChild(note);
};

// Load notes from local storage and display them
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

// Add new note on button click
addButton.addEventListener("click", () => addNewNote());
