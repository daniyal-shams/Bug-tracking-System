import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 shadow flex items-center justify-between">
      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:underline text-sm font-medium dark:text-white">Dashboard</Link>
        <Link to="/bugs" className="hover:underline text-sm font-medium dark:text-white">Bugs</Link>
        <Link to="/users" className="hover:underline text-sm font-medium dark:text-white">Users</Link>
        <Link to="/create" className="hover:underline text-sm font-medium dark:text-white">Create Bug</Link>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="ml-auto bg-gray-300 dark:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white px-3 py-1 rounded transition-colors"
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
}

export default Navbar;
