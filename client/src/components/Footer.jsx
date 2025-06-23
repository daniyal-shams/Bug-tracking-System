import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Footer() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleRelogin = () => {
    navigate("/login");
  };

  return (
    <footer className="bg-blue-900 text-white dark:bg-blue-800 px-4 py-3 mt-8 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <span className="text-sm">
        Logged in as <span className="font-semibold">{user?.email || "Guest"}</span>
      </span>
      <button
        onClick={handleRelogin}
        className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-4 py-1 rounded-md transition-all"
      >
        Re-login
      </button>
    </footer>
  );
}

export default Footer;
