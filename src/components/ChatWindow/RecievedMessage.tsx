const RecievedMessage = ({
  message,
  username,
}: {
  message: string;
  username: string;
}) => {
  return (
    <div className="flex items-start gap-3">
      <img
        // src="https://i.pravatar.cc/40?img=5"
        src="/chat.svg"
        className="w-8 h-8 rounded-full"
        alt="Janice Contreras"
      />
      <div className="bg-white dark:bg-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg shadow-sm">
        <h4 className="text-sm font-semibold text-blue-400">{username}</h4>
        {message}
      </div>
    </div>
  );
};

export default RecievedMessage;
