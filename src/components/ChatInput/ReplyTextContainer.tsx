import chatStore from "@/zustand/store";
import React from "react";

const ReplyTextContainer = () => {
  const replyTo = chatStore((state) => state.replyTo);
  const removeReplyMessage = chatStore((state) => state.removeReplyMessage);

  console.log("replyTo: ", replyTo);

  if (!replyTo) {
    return null;
  }

  return (
    <div className="px-5 py-2 flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 text-white dark:from-blue-800 dark:to-blue-900">
      <i>{`${replyTo?.username?.name}: ${replyTo?.message}`}</i>
      <button className="px-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-800 dark:to-blue-900 text-black dark:text-white"
      onClick={removeReplyMessage}
      >
        X
      </button>
    </div>
  );
};

export default ReplyTextContainer;
