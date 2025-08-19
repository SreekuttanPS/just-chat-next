import DirectMessagePanel from "@/components/DirectMessagePanel";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ roomName: string }>;
}) {
  const { roomName } = await params;
  const decodedRoomName = decodeURIComponent(roomName);
  return <DirectMessagePanel roomName={decodedRoomName} />;
}
