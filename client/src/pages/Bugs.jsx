import { useEffect, useState } from "react";

const BUGS_API = "https://bug-tracking-system-2.onrender.com/bugs";

function Bugs() {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredBugs = bugs.filter(
    (bug) =>
      bug.description.toLowerCase().includes(search.toLowerCase()) &&
      (priorityFilter === "" || bug.priority === priorityFilter)
  );

  useEffect(() => {
    fetch(BUGS_API)
      .then((res) => res.json())
      .then((data) => setBugs(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Bugs</h2>

      {/* ✅ Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded border dark:bg-gray-700 w-full sm:w-1/2"
        />

        <select
          className="p-2 rounded border dark:bg-gray-700 w-full sm:w-1/4"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* ✅ Bug List */}
      {filteredBugs.length === 0 ? (
        <p className="text-gray-500 text-sm">No bugs match your filter.</p>
      ) : (
        <div className="grid gap-4">
          {filteredBugs.map((bug) => (
            <BugCard key={bug.id} bug={bug} />
          ))}
        </div>
      )}
    </div>
  );
}

function BugCard({ bug }) {
  const { description, priority, dateReported, reporter, assignees } = bug;

  const priorityColor = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-green-500",
  }[priority];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-white px-3 py-1 rounded-full text-sm ${priorityColor}`}>
          {priority.toUpperCase()}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Reported: {new Date(dateReported).toLocaleDateString()}
        </span>
      </div>

      <p className="text-lg font-semibold">{description}</p>

      <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        <p><strong>Reporter:</strong> {reporter.name} ({reporter.role})</p>
        <p>
          <strong>Assignees:</strong>{" "}
          {assignees.map((a) => a.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default Bugs;
