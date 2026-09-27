import { SidebarNav } from "./SidebarNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <SidebarNav />
      <div className="min-w-0 pl-[4.5rem] md:pl-20">{children}</div>
    </div>
  );
}
