"use client";
import { useEffect, useState } from "react";

import chatStore from "../../zustand/store";
import { socket } from "@/lib/socket";

const RegisterSection = () => {
  const [input, setInput] = useState("");
  const addUser = chatStore((state) => state.addUser);

  const handleRegister = () => {
    if (input.trim()) {
      socket.emit("register", input);
      addUser(input);
    }
  };

  useEffect(() => {
    return () => {
      socket.off("register");
    };
  }, []);

  return (
    <section className="flex-1 flex flex-col">
      <div className="flex-1 flex p-6 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
        <div className="flex flex-col items-center justify-center dark:bg-gray-800 h-[90vh] w-[80vw] mx-5 my-5 text-gray-100">
          <input
            type="text"
            name="username"
            id="username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a username to start"
            className="border rounded-2xl min-w-4xl min-h-10 text-center"
          />
          <button
            className="px-3 py-2 border my-3 rounded-xl cursor-pointer"
            onClick={handleRegister}
          >
            Start
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
