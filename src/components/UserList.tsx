const UserList = () => {
  return (
    <section className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 overflow-y-auto">
      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-gray-300"
        />
      </div>

      {/* Contacts */}
      <ul className="divide-y">
        <li className="px-4 py-3 flex items-center gap-3 bg-gray-100">
          <img
            src="/chat.svg"
            className="w-10 h-10 rounded-full"
            alt="Lauren Wilson"
          />
          <div className="flex-1">
            <p className="font-medium">Common Group</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Work In Progress.
            </p>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-300">3h</span>
        </li>
        {/* <li className="px-4 py-3 flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40?img=5"
            className="w-10 h-10 rounded-full"
            alt="Janice Contreras"
          />
          <div className="flex-1">
            <p className="font-medium">Janice Contreras</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Who are these three?
            </p>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-300">6h</span>
        </li> */}
        {/* Add others similarly... */}
      </ul>
    </section>
  );
};

export default UserList;
