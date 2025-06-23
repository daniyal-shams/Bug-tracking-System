import { useEffect, useState } from "react";

const BUGS_API = "https://bug-tracking-system-2.onrender.com/bugs";

function ManageBugs() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    fetch(BUGS_API)
      .then((res) => res.json())
      .then(setBugs);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this bug?")) return;
    await fetch(`${BUGS_API}/${id}`, { method: "DELETE" });
    setBugs((prev) => prev.filter((bug) => bug.id !== id));
  };

  const handleReopen = async (id) => {
    await fetch(`${BUGS_API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: true }),
    });
    const updated = await fetch(BUGS_API).then((res) => res.json());
    setBugs(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Bugs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {bugs.map((bug) => (
          <div
            key={bug.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border border-gray-300 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  bug.priority === "high"
                    ? "bg-red-600 text-white"
                    : bug.priority === "medium"
                    ? "bg-amber-500 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {bug.priority.toUpperCase()}
              </span>

              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  bug.active
                    ? "bg-green-600 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {bug.active ? "OPEN" : "CLOSED"}
              </span>
            </div>

            <p className="text-lg font-semibold mb-2">{bug.description}</p>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Reporter:</strong> {bug.reporter.name}
            </p>

            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              <strong>Assignees:</strong>{" "}
              {bug.assignees.map((a) => a.name).join(", ")}
            </p>

            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              Reported on: {new Date(bug.dateReported).toLocaleDateString()}
            </p>

            <div className="mt-4 flex gap-2">
              {!bug.active && (
                <button
                  onClick={() => handleReopen(bug.id)}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                >
                  Reopen
                </button>
              )}
              <button
                onClick={() => handleDelete(bug.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageBugs;
