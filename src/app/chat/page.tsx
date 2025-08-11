import ChatWindow from "@/components/ChatWindow";
import UserList from "@/components/UserList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1">
      <UserList />
      <ChatWindow />
    </div>
  );
}
