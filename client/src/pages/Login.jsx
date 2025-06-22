import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const USERS_API = "https://bug-tracking-system-2.onrender.com/users";

function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(USERS_API)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to fetch users"));
  }, []);

  const handleLogin = () => {
    const matchedUser = users.find((user) => user.email === email);

    if (matchedUser) {
      login(matchedUser); // store user in context
      navigate("/dashboard");
    } else {
      setError("User not found. Please check your email.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white shadow dark:bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Login</h2>

      <input
        type="email"
        placeholder="Enter email (e.g. adamkidd3@gmail.com)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:text-white"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Log In
      </button>
    </div>
  );
}

export default Login;
