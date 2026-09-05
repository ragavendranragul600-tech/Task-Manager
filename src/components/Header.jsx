function Header() {
  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = today.toLocaleTimeString();

  return (
    <header className="header">
      <div>
        <h1>Today</h1>
        <p>{date}</p>
      </div>

      <p>{time}</p>
    </header>
  );
}

export default Header;