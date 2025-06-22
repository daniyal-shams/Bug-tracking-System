function Card({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
}

export default Card;
