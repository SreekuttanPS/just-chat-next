import LeftPanel from "@/components/LeftPanel";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
        <LeftPanel />

        {children}
      </div>
    </section>
  );
}
