"use client"

import { useState } from "react"
import { X, Search, Image, Video, Music, Upload } from "lucide-react"

export default function MediaLibraryPanel({ mediaLibrary, onAddToCanvas, onClose }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredMedia = mediaLibrary.filter((item) => {
    // Filter by search query
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by tab
    if (activeTab !== "all" && item.type !== activeTab) {
      return false
    }

    return true
  })

  return (
    <div className="w-64 border-r border-[#2A2D36] bg-[#1A1D24] overflow-y-auto h-full">
      <div className="flex items-center justify-between p-4 border-b border-[#2A2D36] sticky top-0 bg-[#1A1D24] z-10">
        <h2 className="text-sm font-medium">Media Library</h2>
        <button className="text-[#9DA3AF] hover:text-white" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md pl-9 pr-3 py-2 text-sm"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-[#9DA3AF]" />
        </div>

        <div className="flex border-b border-[#2A2D36] mb-4">
          <button
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "all" ? "text-blue-500 border-b-2 border-blue-500" : "text-[#9DA3AF]"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "image" ? "text-blue-500 border-b-2 border-blue-500" : "text-[#9DA3AF]"
            }`}
            onClick={() => setActiveTab("image")}
          >
            Images
          </button>
          <button
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "video" ? "text-blue-500 border-b-2 border-blue-500" : "text-[#9DA3AF]"
            }`}
            onClick={() => setActiveTab("video")}
          >
            Videos
          </button>
          <button
            className={`flex-1 py-2 text-xs font-medium ${
              activeTab === "audio" ? "text-blue-500 border-b-2 border-blue-500" : "text-[#9DA3AF]"
            }`}
            onClick={() => setActiveTab("audio")}
          >
            Audio
          </button>
        </div>

        <div className="mb-4">
          <label className="flex items-center justify-center h-16 border border-dashed border-[#3A3D46] rounded-md cursor-pointer hover:bg-[#2A2D36] transition-colors mb-4">
            <div className="flex flex-col items-center">
              <Upload size={20} className="mb-1 text-[#5D6470]" />
              <span className="text-xs text-[#5D6470]">Upload new media</span>
            </div>
            <input type="file" className="hidden" />
          </label>

          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md overflow-hidden border border-[#3A3D46] hover:border-blue-500 cursor-pointer"
                  onClick={() => onAddToCanvas(item)}
                >
                  {item.type === "image" || item.type === "video" ? (
                    <div className="relative">
                      <img src={item.src || "/placeholder.svg"} alt={item.name} className="w-full h-20 object-cover" />
                      {item.type === "video" && (
                        <div className="absolute bottom-1 right-1 bg-black/50 rounded-full p-1">
                          <Video size={12} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-20 bg-[#2A2D36] flex items-center justify-center">
                      <Music size={24} className="text-[#5D6470]" />
                    </div>
                  )}
                  <div className="p-1 bg-[#2A2D36]">
                    <p className="text-xs truncate">{item.name}</p>
                    {item.duration && <p className="text-xs text-[#9DA3AF]">{item.duration}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-[#9DA3AF]">{searchQuery ? "No results found" : "No media items available"}</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-3">Stock Media</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex flex-col items-center justify-center p-3 rounded-md border border-[#3A3D46] hover:bg-[#2A2D36]">
              <Image size={20} className="mb-1 text-[#5D6470]" />
              <span className="text-xs">Stock Photos</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-md border border-[#3A3D46] hover:bg-[#2A2D36]">
              <Video size={20} className="mb-1 text-[#5D6470]" />
              <span className="text-xs">Stock Videos</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 rounded-md border border-[#3A3D46] hover:bg-[#2A2D36]">
              <Music size={20} className="mb-1 text-[#5D6470]" />
              <span className="text-xs">Stock Music</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

