import { useEffect, useState } from "react";
import Sidebar from "./components/SideBar";
import MainContent from "./components/MainContent";
import RightSideBar from "./components/RightSideBar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activePage, setActivePage] = useState("inbox");
  const [trashTasks, setTrashTasks] = useState([]);
  const [, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  function addTask(title, dueDateTime) {
    if (!title?.trim() || !dueDateTime) return;

    const [dueDate, dueTime] = dueDateTime.split("T");
    setTasks((previousTasks) => [
      ...previousTasks,
      { id: Date.now(), title: title.trim(), status: "todo", dueDate, dueTime },
    ]);
  }

  function updateDeadline(id, field, value) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  }

  function changeTaskStatus(id, newStatus) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((previousTasks) => {
      const task = previousTasks.find((item) => item.id === id);
      if (task) {
        setTrashTasks((previousTrash) => [
          ...previousTrash,
          { ...task, deletedAt: new Date().toISOString() },
        ]);
      }
      return previousTasks.filter((item) => item.id !== id);
    });
  }

  function restoreTask(id) {
    const task = trashTasks.find((item) => item.id === id);
    if (!task) return;

    setTrashTasks((previousTrash) => previousTrash.filter((item) => item.id !== id));
    setTasks((previousTasks) => [
      ...previousTasks,
      { ...task, deletedAt: undefined },
    ]);
  }

  function deleteForever(id) {
    setTrashTasks((previousTrash) => previousTrash.filter((task) => task.id !== id));
  }

  const visibleTasks = tasks.filter((task) => {
    if (activePage === "completed") return task.status === "completed";
    if (activePage === "today") {
      return task.dueDate === new Date().toISOString().split("T")[0];
    }
    if (activePage === "upcoming") {
      return (
        task.dueDate !== "" &&
        task.dueTime !== "" &&
        new Date(`${task.dueDate}T${task.dueTime}`) > new Date()
      );
    }
    if (activePage === "projects") return false;
    return true;
  });

  const currentTasks = activePage === "trash" ? trashTasks : visibleTasks;

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <MainContent
        tasks={currentTasks}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        updateDeadline={updateDeadline}
        deleteTask={deleteTask}
        restoreTask={restoreTask}
        deleteForever={deleteForever}
        isTrash={activePage === "trash"}
      />
      <RightSideBar tasks={tasks} />
    </div>
  );
}

export default App;