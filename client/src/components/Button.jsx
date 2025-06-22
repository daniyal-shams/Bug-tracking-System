export function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition-colors
        bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
