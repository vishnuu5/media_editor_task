"use client"

import { useState, useRef, useEffect } from "react"
import { Settings, MessageSquare } from "lucide-react"

export default function Timeline({
  mediaItems,
  currentTime,
  zoom,
  fps,
  showComments,
  showSoundwaves,
  setShowComments,
  setShowSoundwaves,
  setFps,
  setSelectedItem,
}) {
  const [showSettings, setShowSettings] = useState(false)
  const timelineRef = useRef(null)
  const [soundwaveHeights, setSoundwaveHeights] = useState([])

  // Generate random heights for soundwaves only once
  useEffect(() => {
    const heights = Array.from({ length: 8 }, () => Math.random() * 60 + 20)
    setSoundwaveHeights(heights)
  }, [])

  // Auto-scroll timeline to keep current time indicator visible
  useEffect(() => {
    if (timelineRef.current) {
      const timelineWidth = timelineRef.current.scrollWidth
      const containerWidth = timelineRef.current.clientWidth
      const scrollPosition = (currentTime / maxEndTime) * timelineWidth * zoom

      // Only scroll if the current time indicator would be outside the visible area
      if (
        scrollPosition < timelineRef.current.scrollLeft ||
        scrollPosition > timelineRef.current.scrollLeft + containerWidth - 50
      ) {
        timelineRef.current.scrollLeft = scrollPosition - containerWidth / 2
      }
    }
  }, [currentTime, zoom])

  // Calculate the maximum end time across all media items
  const maxEndTime = Math.max(
    ...mediaItems.map((item) => item.endTime),
    10, // Default minimum timeline length
  )

  // Apply zoom to timeline
  const timelineWidth = `${maxEndTime * 100 * zoom}px`

  return (
    <div className="p-4 h-24 relative">
      <div className="absolute top-0 right-4 flex gap-2 z-20">
        <button
          className="bg-[#2A2D36] hover:bg-[#3A3D46] p-1 rounded-md"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={14} />
        </button>
      </div>

      {showSettings && (
        <div className="absolute top-[-10rem] right-7 bg-[#2A2D36] p-3 rounded-md shadow-lg z-20 w-64">
          <h4 className="text-sm font-medium mb-2">Timeline Settings</h4>

          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[#9DA3AF]">Show Comments</label>
            <button
              className={`w-8 h-4 rounded-full relative ${showComments ? "bg-blue-600" : "bg-[#3A3D46]"}`}
              onClick={() => setShowComments(!showComments)}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                  showComments ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[#9DA3AF]">Show Soundwaves</label>
            <button
              className={`w-8 h-4 rounded-full relative ${showSoundwaves ? "bg-blue-600" : "bg-[#3A3D46]"}`}
              onClick={() => setShowSoundwaves(!showSoundwaves)}
            >
              <span
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                  showSoundwaves ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="mb-2">
            <label className="text-xs text-[#9DA3AF] block mb-1">Frames Per Second</label>
            <select
              value={fps}
              onChange={(e) => setFps(Number(e.target.value))}
              className="w-full bg-[#3A3D46] border border-[#4A4D56] rounded-md px-2 py-1 text-xs"
            >
              <option value="24">24 fps</option>
              <option value="30">30 fps</option>
              <option value="60">60 fps</option>
            </select>
          </div>
        </div>
      )}

      <div
        ref={timelineRef}
        className="relative h-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#3A3D46] scrollbar-track-[#2A2D36]"
      >
        <div style={{ width: timelineWidth, height: "100%" }}>
          {/* Timeline ruler */}
          <div className="absolute top-0 left-0 right-0 h-6 flex">
            {Array.from({ length: Math.ceil(maxEndTime) + 1 }).map((_, i) => (
              <div key={i} className="border-l border-[#3A3D46] relative" style={{ width: `${100 * zoom}px` }}>
                <span className="absolute text-xs text-[#5D6470] -left-1 -top-4">{i}s</span>
              </div>
            ))}
          </div>

          {/* Current time indicator */}
          <div
            className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
            style={{ left: `${(currentTime / maxEndTime) * 100 * zoom}%` }}
          />

          {/* Media items on timeline */}
          <div className="absolute top-8 left-0 right-0 bottom-0">
            {mediaItems.map((item, index) => {
              const itemWidth = ((item.endTime - item.startTime) / maxEndTime) * 100 * zoom
              const itemLeft = (item.startTime / maxEndTime) * 100 * zoom

              return (
                <div
                  key={item.id}
                  className={`absolute h-8 rounded-sm ${
                    item.type === "video" ? "bg-blue-600" : item.type === "image" ? "bg-green-600" : "bg-purple-600"
                  }`}
                  style={{
                    left: `${itemLeft}%`,
                    width: `${itemWidth}%`,
                    top: index * 10,
                  }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="px-2 truncate text-xs leading-8 text-white">
                    {item.type === "image" ? "Image" : item.type === "video" ? "Video" : "Audio"} {item.id}
                  </div>

                  {/* Show soundwaves for audio items if enabled */}
                  {showSoundwaves && item.type === "audio" && soundwaveHeights.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      {soundwaveHeights.map((height, i) => (
                        <div key={i} className="w-0.5 bg-white mx-0.5" style={{ height: `${height}%` }} />
                      ))}
                    </div>
                  )}

                  {/* Show comment icon if comments are enabled */}
                  {showComments && (
                    <div className="absolute -top-3 -right-1 bg-yellow-500 rounded-full p-0.5">
                      <MessageSquare size={10} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Timeline zoom controls */}
      <div className="absolute bottom-1 right-10 top-[-1.8rem] flex items-center gap-2 z-10">
        <button
          className="bg-[#2A2D36] hover:bg-[#3A3D46] p-1 rounded-md text-xs"
          onClick={() => timelineRef.current?.scrollTo({ left: 0, behavior: "smooth" })}
        >
          Start
        </button>
        <button
          className="bg-[#2A2D36] hover:bg-[#3A3D46] p-1 rounded-md text-xs"
          onClick={() => {
            if (timelineRef.current) {
              timelineRef.current.scrollLeft -= timelineRef.current.clientWidth / 2
            }
          }}
        >
          ◀
        </button>
        <button
          className="bg-[#2A2D36] hover:bg-[#3A3D46] p-1 rounded-md text-xs"
          onClick={() => {
            if (timelineRef.current) {
              timelineRef.current.scrollLeft += timelineRef.current.clientWidth / 2
            }
          }}
        >
          ▶
        </button>
        <button
          className="bg-[#2A2D36] hover:bg-[#3A3D46] p-1 rounded-md text-xs"
          onClick={() => {
            if (timelineRef.current) {
              timelineRef.current.scrollLeft = timelineRef.current.scrollWidth
            }
          }}
        >
          End
        </button>
      </div>
    </div>
  )
}

