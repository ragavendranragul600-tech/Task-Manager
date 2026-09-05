import Calendar from "./Calendar";
import WeeklyTask from "./WeeklyTask";
import TaskSummary from "./TaskSummary";

function RightSideBar({ tasks }) {
  return (
    <aside className="right-sidebar">
      <TaskSummary tasks={tasks} />
      <Calendar />
      <WeeklyTask tasks={tasks} />
    </aside>
  );
}

export default RightSideBar;