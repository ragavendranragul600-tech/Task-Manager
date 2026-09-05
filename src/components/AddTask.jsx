import { useState } from "react";

function AddTask({ addTask }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (taskTitle.trim() === "" || dueDate === "") {
      alert("Enter a task title and select the date and time.");
      return;
    }

    addTask(taskTitle, dueDate);

    setTaskTitle("");
    setDueDate("");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;