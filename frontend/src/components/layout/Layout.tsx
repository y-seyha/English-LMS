import type { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      {/* Scrollbar is attached to the screen edge here */}
      <main className="flex-1 overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
        <div className="mx-auto max-w-[1120px] px-6">{children}</div>
      </main>
    </div>
  );
}
