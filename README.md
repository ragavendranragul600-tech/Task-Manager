# Task Manager — React/Vite Todo Application

A fully-featured task management dashboard built with React and Vite. Organize tasks by status (To Do, In Progress, Completed), set deadlines with date and time, filter tasks by date range, and track progress with real-time statistics.

## Getting Started

### Prerequisites
- Node.js installed on your system
- npm (comes with Node.js)

### Installation & Running

1. Open a terminal in this folder (`TO-DO-APP`)
2. Run `npm install` to download React and Vite dependencies
3. Run `npm run dev` to start the development server
4. Open the local address shown (usually `http://localhost:5173`)

### Production Build
Run `npm run build` to create an optimized production version.

## Project Structure

```
TO-DO-APP/
├── index.html                          # Root HTML file
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration
├── eslint.config.js                    # ESLint rules
├── src/
│   ├── main.jsx                        # React app entry point
│   ├── App.jsx                         # Main app component (state management)
│   ├── App.css                         # Global styles
│   ├── index.css                       # Base CSS
│   └── components/
│       ├── SideBar.jsx                 # Navigation menu
│       ├── MainContent.jsx             # Main content area wrapper
│       ├── Header.jsx                  # Date and time display
│       ├── AddTask.jsx                 # Task creation form
│       ├── TaskList.jsx                # Task list container
│       ├── TaskCard.jsx                # Individual task component
│       ├── RightSideBar.jsx            # Sidebar widgets wrapper
│       ├── TaskSummary.jsx             # Task statistics dashboard
│       ├── Calendar.jsx                # Calendar view
│       └── WeeklyTask.jsx              # Weekly progress tracker
```

## Application Architecture

### Data Flow Diagram
```
App.jsx (State & Logic)
├── Sidebar (Navigation)
│   └── Filters tasks by page (Inbox, Today, Upcoming, Completed)
│
├── MainContent
│   ├── Header (Current date/time)
│   ├── AddTask (Task creation form)
│   └── TaskList
│       └── TaskCard[] (Individual tasks with controls)
│
└── RightSideBar (Statistics & Info)
    ├── TaskSummary (Task counts by status)
    ├── Calendar (Date selector)
    └── WeeklyTask (Completion progress)
```

---

## Component Documentation

### **App.jsx** (Main State Management)

The root component that manages all application state and logic.

**State Variables:**
- `tasks` - Array of all task objects
- `activePage` - Current navigation page (inbox, today, upcoming, completed, projects, trash)
- `currentTime` - Updated every 30 seconds to auto-detect overdue tasks

**Key Functions:**

#### `addTask(title, dueDateTime)`
Creates a new task and adds it to the tasks array.
- Accepts a title string and datetime-local value (e.g., "2026-08-31T18:00")
- Splits datetime into separate `dueDate` and `dueTime` fields
- Generates unique ID using `Date.now()`
- Sets initial status as "todo"

```javascript
// Example task object created:
{
  id: 1693478400000,
  title: "Complete project",
  status: "todo",
  dueDate: "2026-08-31",
  dueTime: "18:00"
}
```

#### `updateDeadline(id, field, value)`
Updates a specific task's date or time field.
- Maps through tasks and updates only the target task's field
- `field` can be "dueDate" or "dueTime"

#### `changeTaskStatus(id, newStatus)`
Changes a task's status to one of: "todo", "progress", or "completed"
- Maps through tasks and updates the target task's status
- Automatically displayed as "incomplete" if deadline has passed

#### `deleteTask(id)`
Removes a task from the array permanently
- Filters out the task by ID

**Filtering Logic (`visibleTasks`):**
- **Inbox:** Shows all tasks
- **Today:** Shows only tasks with today's date
- **Upcoming:** Shows tasks with future deadlines
- **Completed:** Shows only completed tasks
- **Projects & Trash:** Placeholder for future implementation

**Auto-Update Mechanism:**
- `useEffect` refreshes state every 30 seconds
- Allows overdue tasks to automatically change to "incomplete" status

---

### **SideBar.jsx** (Navigation)

Left-side navigation menu for filtering tasks by category.

**Props:**
- `activePage` - Current active page name
- `setActivePage` - Function to change active page

**Features:**
- Toggle sidebar open/close with button
- Navigation buttons for: Inbox, Today, Upcoming, Projects, Completed, Trash
- Active page highlighted with "active-nav" class
- Collapsible design for mobile responsiveness

**Data Flow:**
- Communicates with App.jsx to set the active page
- App.jsx filters `visibleTasks` based on `activePage`

---

### **MainContent.jsx** (Content Area Wrapper)

Container component that holds the main task management interface.

**Props:**
- `tasks` - Filtered tasks array to display
- `addTask` - Function to add new task
- `changeTaskStatus` - Function to change task status
- `updateDeadline` - Function to update task deadline
- `deleteTask` - Function to delete task

**Renders:**
1. `Header` - Displays current date and time
2. `AddTask` - Form to create new tasks
3. `TaskList` - List of tasks with individual TaskCard components

**Purpose:** Acts as a layout wrapper, organizing the main content area into logical sections.

---

### **Header.jsx** (Date & Time Display)

Shows the current date and time at the top of the main content.

**Features:**
- Displays today's date in format: "Monday, Aug 31, 2026"
- Shows current time (updates with system time)
- Static display component (no interactivity)

---

### **AddTask.jsx** (Task Creation Form)

Form component for adding new tasks.

**State:**
- `taskTitle` - Task name input
- `dueDate` - Datetime-local input (e.g., "2026-08-31T18:00")

**Features:**
- Text input for task title
- Datetime-local input for deadline
- Form validation (ensures both fields are filled)
- Clears inputs after successful submission
- Shows alert if inputs are missing

**Function:** `handleSubmit(event)`
- Validates inputs
- Calls `addTask()` from App.jsx
- Resets form fields

---

### **TaskList.jsx** (Task Container)

Renders a list of task cards.

**Props:**
- `tasks` - Array of tasks to display
- `changeTaskStatus` - Function passed to TaskCard
- `updateDeadline` - Function passed to TaskCard
- `deleteTask` - Function passed to TaskCard

**Displays:**
- "No tasks available." message if array is empty
- Individual `TaskCard` for each task
- Maps through tasks array to create components

---

### **TaskCard.jsx** (Individual Task)

Displays a single task with controls for editing and managing it.

**Props:**
- `task` - Task object to display
- `changeTaskStatus` - Function to change status
- `updateDeadline` - Function to update deadline
- `deleteTask` - Function to delete task

**Task Structure:**
```javascript
{
  id: number,
  title: string,
  status: "todo" | "progress" | "completed",
  dueDate: "YYYY-MM-DD",
  dueTime: "HH:MM"
}
```

**Features:**

1. **Title Display:** Shows task name as heading

2. **Deadline Inputs:** 
   - Date input field (type="date")
   - Time input field (type="time")
   - Real-time updates via `updateDeadline()`

3. **Status Radio Buttons:**
   - Yet to do (status = "todo")
   - In progress (status = "progress")
   - Completed (status = "completed")

4. **Status Detection:**
   - `hasDeadline` - Checks if both date and time are set
   - `isIncomplete` - True if deadline has passed and task isn't completed
   - `currentStatus` - Shows as "incomplete" if overdue, otherwise shows actual status

5. **Styling:**
   - Card has CSS class `task-card ${currentStatus}`
   - Status text colored based on status (todo, progress, completed, incomplete)

6. **Delete Button:**
   - Removes task from the list

---

### **RightSideBar.jsx** (Sidebar Widgets Wrapper)

Container for right-side dashboard widgets.

**Props:**
- `tasks` - Full tasks array (not filtered)

**Renders:**
1. `TaskSummary` - Task statistics
2. `Calendar` - Calendar interface
3. `WeeklyTask` - Weekly progress

**Purpose:** Organizes all dashboard statistics and information widgets.

---

### **TaskSummary.jsx** (Task Statistics)

Displays task count statistics in a grid layout.

**Props:**
- `tasks` - Full tasks array

**Calculations:**

1. **Completed:** Count of tasks with status === "completed"

2. **Incomplete:** Count of overdue tasks
   - Has valid deadline (both date and time)
   - Status is not "completed"
   - Current time is past deadline

3. **In Progress:** Count of "progress" status tasks that are NOT overdue
   - Status === "progress"
   - Not marked as incomplete/overdue

4. **Yet To Do:** Count of "todo" status tasks that are NOT overdue
   - Status === "todo"
   - Not marked as incomplete/overdue

**Display:**
- Four cards in a grid showing counts for:
  - Yet to do (todo-card)
  - In progress (progress-card)
  - Completed (completed-card)
  - Incomplete (incomplete-card)

**Logic Error Fixed:**
- ✅ Previously used `task.completed` (incorrect)
- ✅ Now uses `task.status === "completed"` (correct)

---

### **Calendar.jsx** (Date Selector)

Simple calendar interface showing October 2026.

**State:**
- `selectedDate` - Currently selected day (1-31)

**Features:**
- Displays 31 buttons for each day of the month
- Highlights selected date with "selected-date" class
- Shows "Selected date: October {day}" text
- Currently a visual component (not connected to filtering)

**Future Enhancement:** Could be connected to filter tasks by selected date.

---

### **WeeklyTask.jsx** (Progress Tracker)

Displays weekly task completion progress.

**Props:**
- `tasks` - Full tasks array

**Calculations:**
- `completedTasks` - Count of tasks with status === "completed"
- `totalTasks` - Total number of tasks
- `progress` - Percentage calculated: (completed / total) × 100

**Display:**
- Title: "Weekly Goal"
- Counter: "{completed} / {total} tasks completed"
- Progress bar with dynamic width based on percentage

**Logic Fixed:**
- ✅ Previously filtered by `task.completed` property (didn't exist)
- ✅ Now correctly filters by `task.status === "completed"`

---

## Task Object Structure

All tasks follow this structure:

```javascript
{
  id: number,              // Unique identifier (Date.now())
  title: string,           // Task name
  status: string,          // "todo", "progress", or "completed"
  dueDate: string,         // Format: "YYYY-MM-DD"
  dueTime: string          // Format: "HH:MM" (24-hour)
}
```

## Status Types

- **todo** - Task not yet started
- **progress** - Task currently being worked on
- **completed** - Task finished
- **incomplete** (derived) - Task with passed deadline that isn't completed

## Key Features

✅ **Add Tasks** - Create new tasks with title and deadline
✅ **Set Deadlines** - Specify exact date and time for each task
✅ **Track Status** - Mark tasks as todo, in progress, or completed
✅ **Edit Deadlines** - Modify task dates and times anytime
✅ **Delete Tasks** - Remove tasks permanently
✅ **Auto-Detection** - Overdue tasks automatically marked as incomplete
✅ **Filter by Date** - View tasks by Inbox, Today, Upcoming, or Completed
✅ **Statistics Dashboard** - See task breakdown by status
✅ **Progress Tracker** - Weekly completion progress bar
✅ **Responsive Design** - Collapsible sidebar for mobile

## How Data Flows

1. **User adds task** → `AddTask.jsx` form → `App.jsx` `addTask()` → State updated
2. **User changes status** → `TaskCard.jsx` radio button → `App.jsx` `changeTaskStatus()` → State updated
3. **User edits deadline** → `TaskCard.jsx` date/time input → `App.jsx` `updateDeadline()` → State updated
4. **User deletes task** → `TaskCard.jsx` delete button → `App.jsx` `deleteTask()` → State updated
5. **Sidebar filter** → `SideBar.jsx` button → `App.jsx` `setActivePage()` → `visibleTasks` refiltered
6. **Statistics update** → All widgets re-render with updated task counts
7. **Auto-update every 30s** → `useEffect` in `App.jsx` triggers → Overdue detection recalculates

---

## Development Tips

- **Add console.logs** in `App.jsx` functions to debug task changes
- **Check browser DevTools** to inspect React component hierarchy
- **Modify CSS** in `App.css` to customize styling
- **Extend components** by adding new features without breaking existing code
- **Test thoroughly** with dates/times to ensure deadline logic works correctly
