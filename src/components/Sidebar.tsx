const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-600 dark:bg-blue-950 text-white flex flex-col p-4">
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img src="https://i.imgur.com/3GvwNBf.png" alt="avatar" className="w-20 h-20 rounded-full border-4 border-white" />
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-4">
        <button className="flex items-center gap-2 text-white">
          <span role="img" aria-label="Chat">
            💬
          </span>
          <span>Chat</span>
        </button>
        <button className="flex items-center gap-2 text-white opacity-70">
          <span role="img" aria-label="Document">
            📄
          </span>
          <span>Document</span>
        </button>
        <button className="flex items-center gap-2 text-white opacity-70">
          <span role="img" aria-label="Settings">
            ⚙️
          </span>
          <span>Settings</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
