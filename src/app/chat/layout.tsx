import GetUser from "@/components/GetUser";
import LeftPanel from "@/components/LeftPanel";
import SocketBridge from "@/components/SocketBridge";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
        <LeftPanel />
        <SocketBridge />
        <GetUser />
        {children}
      </div>
    </section>
  );
}
