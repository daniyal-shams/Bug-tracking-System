import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const BUGS_API = "https://bug-tracking-system-2.onrender.com/bugs";
const USERS_API = "https://bug-tracking-system-2.onrender.com/users";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [users, setUsers] = useState([]);

  const { user } = useUser();
  const navigate = useNavigate();

  const bugsPerUser = users
    .map((user) => ({
      name: user.name,
      value: user.bugs?.length || 0,
    }))
    .filter((u) => u.value > 0);

  useEffect(() => {
    fetch(BUGS_API)
      .then((res) => res.json())
      .then(setBugs);
    fetch(USERS_API)
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const bugCounts = {
    total: bugs.length,
    high: bugs.filter((b) => b.priority === "high").length,
    medium: bugs.filter((b) => b.priority === "medium").length,
    low: bugs.filter((b) => b.priority === "low").length,
  };

  const handleRelogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Bugs" value={bugCounts.total} color="bg-blue-500" />
        <StatCard label="High Priority" value={bugCounts.high} color="bg-red-500" />
        <StatCard label="Users" value={users.length} color="bg-purple-500" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mt-8 mb-2">Bugs Per User</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bugsPerUser}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {bugsPerUser.map((entry, index) => (
                <Cell key={index} fill={`hsl(${index * 40}, 70%, 60%)`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        {user ? (
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded flex justify-between items-center">
            <span>
              Logged in as <span className="font-semibold">{user.email}</span>
            </span>
            <button
              onClick={handleRelogin}
              className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Re-login
            </button>
          </div>
        ) : (
          <div className="text-red-500 font-semibold">User not logged in</div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`p-4 rounded-xl text-white shadow-md ${color}`}>
      <h4 className="text-lg font-medium">{label}</h4>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default Dashboard;
