import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  changeTaskStatus,
  updateDeadline,
  deleteTask,
  restoreTask,
  deleteForever,
  isTrash,
}) {
  if (tasks.length === 0) {
    return <p>{isTrash ? "No deleted tasks." : "No tasks available."}</p>;
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          changeTaskStatus={changeTaskStatus}
          updateDeadline={updateDeadline}
          deleteTask={deleteTask}
          restoreTask={restoreTask}
          deleteForever={deleteForever}
          isTrash={isTrash}
        />
      ))}
    </section>
  );
}

export default TaskList;