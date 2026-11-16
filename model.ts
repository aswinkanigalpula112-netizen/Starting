type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

function addTask(tasks: Task[], title: string): Task[] {
  while (tasks.some((task) => task.id === nextId)) {
    nextId++;
  }

  const newTask: Task = { id: nextId++, title, status: "todo" };
  return [...tasks, newTask];
}

function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}
