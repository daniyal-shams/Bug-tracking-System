import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const BUGS_API = "https://bug-tracking-system-2.onrender.com/bugs";
const USERS_API = "https://bug-tracking-system-2.onrender.com/users";

function CreateBug() {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [reporterId, setReporterId] = useState("");
  const [assigneeIds, setAssigneeIds] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(USERS_API).then(res => res.json()).then(setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reporter = users.find(u => u.id == reporterId);
    const assignees = users.filter(u => assigneeIds.includes(u.id.toString()));

    const newBug = {
      dateReported: new Date().toISOString().split("T")[0],
      description,
      priority,
      reporter,
      assignees,
      active: true
    };

    await fetch(BUGS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBug)
    });

    navigate("/bugs");
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Bug</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Description:</label>
          <textarea
            className="w-full rounded p-2 border dark:bg-gray-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Priority:</label>
          <select
            className="w-full rounded p-2 dark:bg-gray-700"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label>Reporter:</label>
          <select
            className="w-full rounded p-2 dark:bg-gray-700"
            value={reporterId}
            onChange={(e) => setReporterId(e.target.value)}
            required
          >
            <option value="">Select Reporter</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Assignees:</label>
          <select
            multiple
            className="w-full rounded p-2 dark:bg-gray-700"
            value={assigneeIds}
            onChange={(e) =>
              setAssigneeIds(Array.from(e.target.selectedOptions, opt => opt.value))
            }
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CreateBug;