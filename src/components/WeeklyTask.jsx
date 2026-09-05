function WeeklyTasks({ tasks }) {
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <section className="weekly-tasks">
      <h3>Weekly Goal</h3>

      <p>
        <strong>{completedTasks}</strong> / {totalTasks} tasks completed
      </p>

      <div className="progress-background">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}

export default WeeklyTasks;