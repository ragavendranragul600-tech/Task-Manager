function TaskSummary({ tasks }) {
  const completed = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const incomplete = tasks.filter((task) => {
    const hasDeadline = task.dueDate !== "" && task.dueTime !== "";

    return (
      hasDeadline &&
      task.status !== "completed" &&
      new Date(`${task.dueDate}T${task.dueTime}`) < new Date()
    );
  }).length;

  const inProgress = tasks.filter((task) => {
    const hasDeadline = task.dueDate !== "" && task.dueTime !== "";

    const isIncomplete =
      hasDeadline &&
      task.status !== "completed" &&
      new Date(`${task.dueDate}T${task.dueTime}`) < new Date();

    return task.status === "progress" && !isIncomplete;
  }).length;

  const yetToDo = tasks.filter((task) => {
    const hasDeadline = task.dueDate !== "" && task.dueTime !== "";

    const isIncomplete =
      hasDeadline &&
      task.status !== "completed" &&
      new Date(`${task.dueDate}T${task.dueTime}`) < new Date();

    return task.status === "todo" && !isIncomplete;
  }).length;

  return (
    <section className="task-summary">
      <h3>Task Summary</h3>

      <div className="summary-grid">
        <div className="summary-card todo-card">
          <span>Yet to do</span>
          <strong>{yetToDo}</strong>
        </div>

        <div className="summary-card progress-card">
          <span>In progress</span>
          <strong>{inProgress}</strong>
        </div>

        <div className="summary-card completed-card">
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>

        <div className="summary-card incomplete-card">
          <span>Incomplete</span>
          <strong>{incomplete}</strong>
        </div>
      </div>
    </section>
  );
}

export default TaskSummary;