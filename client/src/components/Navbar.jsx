// Navbar.jsx
import { Link } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { useUser } from "../context/UserContext";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

function Navbar() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const { user } = useUser();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const NavLinks = () => (
    <>
      <Link to="/dashboard" className="hover:underline text-sm font-medium dark:text-white">Dashboard</Link>
      <Link to="/bugs" className="hover:underline text-sm font-medium dark:text-white">Bugs</Link>
      <Link to="/users" className="hover:underline text-sm font-medium dark:text-white">Users</Link>
      <Link to="/create" className="hover:underline text-sm font-medium dark:text-white">Create Bug</Link>
      <Link to="/managebugs" className="hover:underline text-sm font-medium dark:text-white">Manage Bugs</Link>
      <Link to="/manageusers" className="hover:underline text-sm font-medium dark:text-white">Manage Users</Link>
    </>
  );

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 shadow flex items-center justify-between flex-wrap">
      
      {/* Left: Desktop Links */}
      <div className="hidden md:flex gap-6">
        <NavLinks />
      </div>

      {/* Right: User Info + Theme Toggle */}
      <div className="flex items-center gap-4 ml-auto">

        {/* Username + Role shown on desktop */}
        <div className="hidden md:flex flex-col text-right text-sm text-gray-800 dark:text-white">
          <span className="font-medium">{user?.nickname || user?.name || "User"}</span>
          <span className="text-xs text-gray-600 dark:text-gray-300">{user?.role || "user"}</span>
        </div>

        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 text-sm font-medium text-gray-900 dark:text-white px-3 py-1 rounded transition-colors"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 gap-2">
              <Bars3Icon className="h-5 w-5" />
              {user?.nickname || user?.name || "User"} | {user?.role || "user"}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4 space-y-2">
                <div className="flex flex-col gap-2 text-sm">
                  <NavLinks />
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
