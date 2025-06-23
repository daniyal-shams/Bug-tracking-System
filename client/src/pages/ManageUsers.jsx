import { useEffect, useState } from "react";

const USERS_API = "https://bug-tracking-system-2.onrender.com/users";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });

  useEffect(() => {
    fetch(USERS_API)
      .then(r => r.json())
      .then(setUsers);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const newUser = {
      ...form,
      auth0Sub: Date.now().toString(),
      nickname: form.name.split(" ")[0],
      bugs: []
    };
    const res = await fetch(USERS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });
    const created = await res.json();
    setUsers([...users, created]);
    setForm({ name: "", email: "", role: "user" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    await fetch(`${USERS_API}/${id}`, { method: "DELETE" });
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded dark:bg-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded dark:bg-gray-700"
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="border p-2 rounded dark:bg-gray-700"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="col-span-full sm:col-auto px-4 py-2 bg-green-600 text-white rounded"
        >
          Create User
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div key={u.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">{u.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${u.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
                {u.role.toUpperCase()}
              </span>
            </div>
            <button
              onClick={() => handleDelete(u.id)}
              className="mt-4 px-3 py-1 bg-red-600 text-white text-sm rounded"
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;

