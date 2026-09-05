import { useEffect, useState } from "react";
import Sidebar from "./components/SideBar";
import MainContent from "./components/MainContent";
import RightSideBar from "./components/RightSideBar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish Todo List design",
      status: "todo",
      dueDate: "2026-08-31",
      dueTime: "18:00",
    },
  ]);
  const [activePage, setActivePage] = useState("inbox");
  const [trashTasks, setTrashTasks] = useState([]);

  // Refreshes the app every 30 seconds.
  // This lets overdue tasks change to Incomplete automatically.
  const [, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  function addTask(title, dueDateTime) {
    if (!title?.trim() || !dueDateTime) {
      return;
    }

    const [dueDate, dueTime] = dueDateTime.split("T");
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      status: "todo",
      dueDate,
      dueTime,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function updateDeadline(id, field, value) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  }

  function changeTaskStatus(id, newStatus) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  function deleteTask(id) {
    const taskToTrash = tasks.find((task) => task.id === id);

    if (!taskToTrash) {
      return;
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setTrashTasks((prevTrashTasks) => [
      ...prevTrashTasks,
      {
        ...taskToTrash,
        deletedAt: new Date().toISOString(),
      },
    ]);
  }

  function restoreTask(id) {
    const taskToRestore = trashTasks.find((task) => task.id === id);

    if (!taskToRestore) {
      return;
    }

    setTrashTasks((prevTrashTasks) =>
      prevTrashTasks.filter((task) => task.id !== id)
    );
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...taskToRestore,
        deletedAt: undefined,
      },
    ]);
  }

  function deleteForever(id) {
    setTrashTasks((prevTrashTasks) =>
      prevTrashTasks.filter((task) => task.id !== id)
    );
  }

  const visibleTasks = tasks.filter((task) => {
    if (activePage === "completed") {
      return task.status === "completed";
    }

    if (activePage === "today") {
      const today = new Date().toISOString().split("T")[0];
      return task.dueDate === today;
    }

    if (activePage === "upcoming") {
      return (
        task.dueDate !== "" &&
        new Date(`${task.dueDate}T${task.dueTime}`) > new Date()
      );
    }

    if (activePage === "projects") {
      return false;
    }

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