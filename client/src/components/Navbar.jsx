import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/bugs", label: "Bugs" },
    { to: "/users", label: "Users" },
    { to: "/create", label: "Create Bug" },
    { to: "/manage-bugs", label: "Manage Bugs" },
    { to: "/manage-users", label: "Manage Users" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* Logo / Title */}
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        🐞 BugTracker
      </div>

      {/* Nav Links */}
      <div className="flex items-center space-x-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {link.label}
          </Link>
        ))}

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
