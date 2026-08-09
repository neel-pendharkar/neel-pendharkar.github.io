const list = document.querySelector("#workout-list");
const progressCount = document.querySelector("#progress-count");
const resetButton = document.querySelector("#reset-button");
const today = document.querySelector("#today");

const dateKey = new Intl.DateTimeFormat("en-CA").format(new Date());
const storageKey = `workout:${dateKey}`;
const completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

today.textContent = new Intl.DateTimeFormat("en", {
  weekday: "long",
  day: "2-digit",
  month: "short",
  year: "numeric"
}).format(new Date()).toUpperCase();

function save() {
  localStorage.setItem(storageKey, JSON.stringify([...completed]));
}

function updateProgress(total) {
  progressCount.textContent = `${completed.size} / ${total}`;
  resetButton.hidden = completed.size === 0;
}

function exerciseRow(exercise, index, total) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checked = completed.has(exercise.id);

  item.className = `exercise${checked ? " done" : ""}`;
  label.className = "exercise";
  label.innerHTML = `
    <input type="checkbox" ${checked ? "checked" : ""}>
    <span class="exercise-number">${String(index + 1).padStart(2, "0")}</span>
    <span class="exercise-name">${exercise.name}</span>
    <span class="exercise-count"><strong>${exercise.count}</strong><span>${exercise.unit}</span></span>
  `;

  const input = label.querySelector("input");
  input.addEventListener("change", () => {
    input.checked ? completed.add(exercise.id) : completed.delete(exercise.id);
    item.classList.toggle("done", input.checked);
    save();
    updateProgress(total);
  });

  item.replaceChildren(...label.childNodes);
  item.addEventListener("click", (event) => {
    if (event.target !== input) input.click();
  });
  return item;
}

async function loadWorkout() {
  try {
    const response = await fetch("data/workout.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    list.replaceChildren(...data.exercises.map((item, index) => exerciseRow(item, index, data.exercises.length)));
    updateProgress(data.exercises.length);
  } catch (error) {
    list.innerHTML = '<li class="loading">Could not load the routine. Please refresh.</li>';
    console.error("Workout data failed to load", error);
  }
}

resetButton.addEventListener("click", () => {
  completed.clear();
  save();
  document.querySelectorAll(".exercise").forEach((item) => item.classList.remove("done"));
  document.querySelectorAll(".exercise input").forEach((input) => { input.checked = false; });
  updateProgress(document.querySelectorAll(".exercise input").length);
});

loadWorkout();
