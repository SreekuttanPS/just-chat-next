import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import DirectMessageHeader from "@/components/DirectMessagePanel/DirectMessageHeader";

export default function DirectMessagePanel({ roomName }: { roomName: string }) {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <DirectMessageHeader roomName={roomName} />
        {/* <div className="flex items-center gap-4 text-gray-500 dark:text-gray-300">
          <button type="button">📞</button>
          <button type="button">⋮</button>
        </div> */}
      </div>

      <ChatWindow />
      <ChatInput  />
    </div>
  );
}
