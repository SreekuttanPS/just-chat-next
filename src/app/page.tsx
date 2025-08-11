import ChatWindow from "@/components/ChatWindow";
import UserList from "@/components/UserList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <button className="border p-3 rounded-2xl">Start chatting</button>
    </div>
  );
}
