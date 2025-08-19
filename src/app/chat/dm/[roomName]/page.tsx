import DirectMessagePanel from "@/components/DirectMessagePanel";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ roomName: string }>;
}) {
  const { roomName } = await params;
  return <DirectMessagePanel roomName={roomName} />;
}
