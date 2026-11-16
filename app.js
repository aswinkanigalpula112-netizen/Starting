import { addTask, advanceTask, deleteTask, filterByStatus } from "./model.js";
let tasks = [];
let filter = "all";
const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const statusSelect = document.getElementById("status");
const listEl = document.getElementById("list");
const filterButtons = document.querySelectorAll(".filter");
function render() {
    const visibleTasks = filter === "all" ? tasks : filterByStatus(tasks, filter);
    listEl.replaceChildren();
    for (const task of visibleTasks) {
        const row = document.createElement("li");
        row.className = "task";
        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;
        const badge = document.createElement("span");
        badge.className = `badge badge-${task.status}`;
        badge.textContent = task.status;
        const advanceButton = document.createElement("button");
        advanceButton.type = "button";
        advanceButton.className = "advance-button";
        advanceButton.textContent = task.status === "done" ? "Done ✓" : "Advance →";
        advanceButton.disabled = task.status === "done";
        advanceButton.setAttribute("aria-label", `Advance ${task.title}`);
        advanceButton.onclick = () => {
            tasks = advanceTask(tasks, task.id);
            render();
        };
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
        deleteButton.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        row.append(title, badge, advanceButton, deleteButton);
        listEl.append(row);
    }
}
form.onsubmit = (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title, statusSelect.value);
    titleInput.value = "";
    titleInput.focus();
    render();
};
filterButtons.forEach((button) => {
    button.onclick = () => {
        const selected = button.dataset.filter;
        filter = selected === "all" ? "all" : selected;
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        render();
    };
});
render();
