import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0f172a] dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
