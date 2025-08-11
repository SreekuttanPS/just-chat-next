"use client";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

import chatStore from "../../zustand/store";
import RegisterSection from "./RegisterSection";

const ChatWindow = () => {
  const currentUser = chatStore((state) => state.currentUser);

  if (!currentUser) {
    return <RegisterSection />;
  }

  return (
    <section className="flex-1 flex flex-col">
      <div className="p-4 border-b font-semibold text-lg bg-white dark:bg-gray-800 dark:text-gray-300">
        {currentUser}
      </div>
      <Messages />
      <ChatInput />
    </section>
  );
};

export default ChatWindow;
