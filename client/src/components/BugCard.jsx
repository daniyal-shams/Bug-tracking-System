function BugCard({ bug, onDelete, onUpdate }) {
  const handleDelete = () => {
    onDelete(bug.id);
  };

  const handleUpdate = () => {
    const updatedBug = { ...bug, status: bug.status === 'open' ? 'closed' : 'open' };
    onUpdate(updatedBug);
  };

  return (
    <div className="bug-card">
      <h3>{bug.title}</h3>
      <p>{bug.description}</p>
      <p>Status: {bug.status}</p>
      <button onClick={handleUpdate}>
        {bug.status === 'open' ? 'Close Bug' : 'Reopen Bug'}
      </button>
      <button onClick={handleDelete}>Delete Bug</button>
    </div>
  );
}