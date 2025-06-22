import { useEffect, useState } from "react";

const USERS_API = "https://bug-tracking-system-2.onrender.com/users";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(USERS_API)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

function UserCard({ user }) {
  const { name, email, role, bugs } = user;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{name}</h3>
        <span className={`text-sm px-2 py-1 rounded ${role === 'admin' ? 'bg-purple-500' : 'bg-gray-500'} text-white`}>
          {role.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{email}</p>

      <div className="mt-3">
        <h4 className="font-medium">Bugs Reported:</h4>
        {bugs.length === 0 ? (
          <p className="text-sm text-gray-500">No bugs reported.</p>
        ) : (
          <ul className="list-disc ml-6 text-sm text-gray-700 dark:text-gray-300">
            {bugs.map((bug) => (
              <li key={bug.id}>
                {bug.description}{" "}
                <span className="text-xs text-gray-500">({bug.priority})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


export default Users;