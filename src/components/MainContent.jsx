import Header from "./Header";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function MainContent({
  tasks,
  addTask,
  changeTaskStatus,
  updateDeadline,
  deleteTask,
  restoreTask,
  deleteForever,
  isTrash,
}) {
  return (
    <main className="main-content">
      <Header />

      {!isTrash && <AddTask addTask={addTask} />}

      <TaskList
        tasks={tasks}
        changeTaskStatus={changeTaskStatus}
        updateDeadline={updateDeadline}
        deleteTask={deleteTask}
        restoreTask={restoreTask}
        deleteForever={deleteForever}
        isTrash={isTrash}
      />
    </main>
  );
}

export default MainContent;