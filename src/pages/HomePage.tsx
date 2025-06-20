import { useState } from "react";
import SportsSearchBar from "../components/SportsSearchBar";
import SideBar from "../components/SideBar";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Sidebar with toggle */}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content fills full width */}
      <main className="w-full">
        <SportsSearchBar />
      </main>
    </div>
  );
}
