"use client"

import { Search, Settings, Package, ImageIcon } from "lucide-react"

export default function Sidebar({ activePanel, onPanelToggle }) {
  return (
    <div className="w-16 border-r border-[#2A2D36] flex flex-col items-center py-4">
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md mb-4 ${
          activePanel === "search" ? "bg-[#3A3D46]" : "hover:bg-[#2A2D36]"
        }`}
        onClick={() => onPanelToggle("search")}
      >
        <Search size={20} />
      </button>
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md mb-4 ${
          activePanel === "settings" ? "bg-[#3A3D46]" : "hover:bg-[#2A2D36]"
        }`}
        onClick={() => onPanelToggle("settings")}
      >
        <Settings size={20} />
      </button>
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md mb-4 ${
          activePanel === "brand" ? "bg-[#3A3D46]" : "hover:bg-[#2A2D36]"
        }`}
        onClick={() => onPanelToggle("brand")}
      >
        <Package size={20} />
      </button>
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md ${
          activePanel === "media" ? "bg-[#3A3D46]" : "hover:bg-[#2A2D36]"
        }`}
        onClick={() => onPanelToggle("media")}
      >
        <ImageIcon size={20} />
      </button>
    </div>
  )
}

