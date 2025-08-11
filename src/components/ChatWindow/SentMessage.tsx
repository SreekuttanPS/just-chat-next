const SentMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-3">
        <div className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm">{message}</div>
        <img src="https://i.imgur.com/3GvwNBf.png" className="w-8 h-8 rounded-full" alt="You" />
      </div>
    </div>
  );
};

export default SentMessage;
