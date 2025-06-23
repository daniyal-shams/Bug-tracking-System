import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, XAxis, YAxis, Bar, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const BUGS_API = "https://bug-tracking-system-2.onrender.com/bugs";
const USERS_API = "https://bug-tracking-system-2.onrender.com/users";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(BUGS_API).then(res => res.json()).then(setBugs);
    fetch(USERS_API).then(res => res.json()).then(setUsers);
  }, []);

  const bugCounts = {
    total: bugs.length,
    high: bugs.filter(b => b.priority === "high").length,
    open: bugs.filter(b => b.active).length,
  };

  const bugsPerUser = users.map(u => ({
    name: u.name,
    value: u.bugs?.length || 0,
  })).filter(u => u.value > 0);

  const priorityData = ["high", "medium", "low"].map(priority => ({
    priority,
    count: bugs.filter(b => b.priority === priority).length,
  }));

  const recentActivity = bugs.slice(-5).reverse().map(bug => {
    const reporter = bug.reporter?.name || "Unknown";
    return `${reporter} reported "${bug.description}" (${bug.priority})`;
  });

  const contributorMap = {};
  bugs.forEach(b => {
    const name = b.reporter?.name;
    if (name) contributorMap[name] = (contributorMap[name] || 0) + 1;
  });
  const topContributors = Object.entries(contributorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Bugs" value={bugCounts.total} color="bg-blue-500" icon="🐞" />
        <StatCard label="High Priority" value={bugCounts.high} color="bg-red-500" icon="🚨" />
        <StatCard label="Users" value={users.length} color="bg-purple-500" icon="👥" />
        <StatCard label="Open Bugs" value={bugCounts.open} color="bg-green-500" icon="✅" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">📊 Bugs by Priority</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData}>
              <XAxis dataKey="priority" />
              <YAxis allowDecimals={false} />
              <Bar dataKey="count" fill="#3B82F6" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">🧑‍💻 Bugs Per User</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={bugsPerUser}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
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
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <select className="px-4 py-2 border rounded-md dark:bg-gray-700">
          <option>Last 30 Days</option>
        </select>
        <select className="px-4 py-2 border rounded-md dark:bg-gray-700">
          <option>All Users</option>
        </select>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">🔄 Recent Activity</h3>
        <ul className="list-disc ml-6 text-sm">
          {recentActivity.map((log, idx) => (
            <li key={idx}>{log}</li>
          ))}
        </ul>
      </div>

      {/* Top Contributors */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">🌟 Top Contributors</h3>
        <ul className="list-disc ml-6 text-sm">
          {topContributors.map(([name, count], idx) => (
            <li key={idx}>{name} ({count} bugs)</li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          ➕ Create Bug
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div className={`p-4 rounded-xl text-white shadow-md flex items-center gap-3 ${color}`}>
      <span className="text-xl">{icon}</span>
      <div>
        <h4 className="text-sm font-medium">{label}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default Dashboard;
