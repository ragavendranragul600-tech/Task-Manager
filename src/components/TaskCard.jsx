function TaskCard({
  task,
  changeTaskStatus,
  updateDeadline,
  deleteTask,
  restoreTask,
  deleteForever,
  isTrash,
}) {
  const hasDeadline = task.dueDate !== "" && task.dueTime !== "";

  const isIncomplete =
    hasDeadline &&
    task.status !== "completed" &&
    new Date(`${task.dueDate}T${task.dueTime}`) < new Date();

  const currentStatus = isIncomplete ? "incomplete" : task.status;

  return (
    <article className={`task-card ${currentStatus}`}>
      <h3>{task.title}</h3>

      {!isTrash && (
        <div className="deadline-inputs">
          <label>
            Date:
            <input
              type="date"
              value={task.dueDate}
              onChange={(event) =>
                updateDeadline(task.id, "dueDate", event.target.value)
              }
            />
          </label>

          <label>
            Time:
            <input
              type="time"
              value={task.dueTime}
              onChange={(event) =>
                updateDeadline(task.id, "dueTime", event.target.value)
              }
            />
          </label>
        </div>
      )}

      {!isTrash && (
        <div className="status-options">
          <label>
            <input
              type="radio"
              name={`status-${task.id}`}
              checked={task.status === "todo"}
              onChange={() => changeTaskStatus(task.id, "todo")}
            />
            Yet to do
          </label>

          <label>
            <input
              type="radio"
              name={`status-${task.id}`}
              checked={task.status === "progress"}
              onChange={() => changeTaskStatus(task.id, "progress")}
            />
            In progress
          </label>

          <label>
            <input
              type="radio"
              name={`status-${task.id}`}
              checked={task.status === "completed"}
              onChange={() => changeTaskStatus(task.id, "completed")}
            />
            Completed
          </label>
        </div>
      )}

      <p className={`status-text ${currentStatus}`}>
        Current status: {currentStatus}
      </p>

      {isTrash ? (
        <div className="trash-actions">
          <button type="button" onClick={() => restoreTask(task.id)}>
            Restore
          </button>

          <button type="button" onClick={() => deleteForever(task.id)}>
            Delete forever
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => deleteTask(task.id)}>
          Move to Trash
        </button>
      )}
    </article>
  );
}

export default TaskCard;