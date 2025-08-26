import GetUser from "@/components/GetUser";
import LeftPanel from "@/components/LeftPanel";
import NavbarToggle from "@/components/NavbarToggle";
import SocketBridge from "@/components/SocketBridge";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex flex-row h-screen bg-gray-100 dark:bg-gray-900">
        <LeftPanel />
        <NavbarToggle />
        <GetUser />
        <SocketBridge />
        {children}
      </div>
    </section>
  );
}
