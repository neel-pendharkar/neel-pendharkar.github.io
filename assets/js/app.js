const list = document.querySelector("#workout-list");

function exerciseRow(exercise) {
  const item = document.createElement("div");
  item.className = "exercise";

  const name = document.createElement("span");
  name.className = "exercise-name";
  name.textContent = exercise.name;

  const count = document.createElement("strong");
  count.className = "exercise-count";
  count.textContent = `${exercise.count} ${exercise.unit.toLowerCase()}`;

  item.append(count, name);
  return item;
}

try {
  const response = await fetch("data/workout.json");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const workout = await response.json();
  list.replaceChildren(...workout.exercises.map(exerciseRow));
} catch (error) {
  list.innerHTML = '<li class="loading">Workout unavailable.</li>';
  console.error("Workout data failed to load", error);
}
