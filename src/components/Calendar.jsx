import { useState } from "react";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(1);

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <section className="calendar">
      <h3>October 2026</h3>

      <div className="calendar-grid">
        {days.map((day) => (
          <button
            key={day}
            className={selectedDate === day ? "selected-date" : ""}
            onClick={() => setSelectedDate(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <p>Selected date: October {selectedDate}</p>
    </section>
  );
}

export default Calendar;