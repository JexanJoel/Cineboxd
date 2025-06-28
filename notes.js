const movies = JSON.parse(localStorage.getItem("watchlist")) || [];

const movieSelect = document.getElementById("movieSelect");
const movieNote = document.getElementById("movieNote");
const notesList = document.getElementById("notesList");

// Add watchlist movies dynamically if not already in the default list
movies.forEach(movie => {
  if (![...movieSelect.options].some(opt => opt.value === movie.title)) {
    const option = document.createElement("option");
    option.value = movie.title;
    option.textContent = movie.title;
    movieSelect.appendChild(option);
  }
});

function saveNote() {
  const title = movieSelect.value;
  const note = movieNote.value.trim();

  if (!title || !note) {
    showToast("⚠️ Please select a movie and write a note.");
    return;
  }

  const notes = JSON.parse(localStorage.getItem("movieNotes")) || {};
  notes[title] = note;
  localStorage.setItem("movieNotes", JSON.stringify(notes));

  movieNote.value = "";
  renderNotes();
  showToast(`✅ Note saved for "${title}"`);
}

function renderNotes() {
  const notes = JSON.parse(localStorage.getItem("movieNotes")) || {};
  notesList.innerHTML = "";

  for (let title in notes) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${title}:</strong> ${notes[title]}`;
    notesList.appendChild(li);
  }
}

function toggleMenu() {
  document.querySelector("nav").classList.toggle("show");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Toast message function
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast show";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 1000);
  }, 2500);
}

// Add basic toast styles
const style = document.createElement("style");
style.textContent = `
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e3a8a;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  font-weight: 500;
  font-size: 1rem;
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 9999;
}
.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.toast.hide {
  opacity: 0;
  transform: translateX(-50%) translateY(30px);
}
`;
document.head.appendChild(style);

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  renderNotes();
};
