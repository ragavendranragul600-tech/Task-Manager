import { useState } from "react";

function Sidebar({ activePage, setActivePage }) {
  const [isOpen, setIsOpen] = useState(true);

  function selectPage(pageName) {
    setActivePage(pageName);
  }

  return (
    <aside className="sidebar">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "← Close" : "☰ Open"}
      </button>

      {isOpen && (
        <div className="sidebar-content">
          <h2>✓ Task Manager</h2>
          <p>Productive management</p>

          <nav>
            <button
              className={activePage === "inbox" ? "active-nav" : ""}
              onClick={() => selectPage("inbox")}
            >
              Inbox
            </button>

            <button
              className={activePage === "today" ? "active-nav" : ""}
              onClick={() => selectPage("today")}
            >
              Today
            </button>

            <button
              className={activePage === "upcoming" ? "active-nav" : ""}
              onClick={() => selectPage("upcoming")}
            >
              Upcoming
            </button>

            <button
              className={activePage === "projects" ? "active-nav" : ""}
              onClick={() => selectPage("projects")}
            >
              Projects
            </button>
          </nav>

          <button className="add-project-button">
            + Add New Task
          </button>

          <nav>
            <button
              className={activePage === "completed" ? "active-nav" : ""}
              onClick={() => selectPage("completed")}
            >
              Completed
            </button>

            <button
              className={activePage === "trash" ? "active-nav" : ""}
              onClick={() => selectPage("trash")}
            >
              Trash
            </button>
          </nav>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;