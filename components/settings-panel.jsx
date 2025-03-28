"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

export default function SettingsPanel({
  aspectRatio,
  setAspectRatio,
  backgroundColor,
  setBackgroundColor,
  fps,
  setFps,
  onClose,
}) {
  const [duration, setDuration] = useState("auto")
  const [fixedDuration, setFixedDuration] = useState(30)

  const aspectRatios = [
    { label: "16:9 (Landscape)", value: "16:9" },
    { label: "9:16 (Portrait)", value: "9:16" },
    { label: "1:1 (Square)", value: "1:1" },
    { label: "4:3 (Standard)", value: "4:3" },
    { label: "21:9 (Ultrawide)", value: "21:9" },
  ]

  const backgroundColors = [
    { label: "Black", value: "#000000" },
    { label: "White", value: "#FFFFFF" },
    { label: "Blue", value: "#0066CC" },
    { label: "Green", value: "#00CC66" },
    { label: "Red", value: "#CC0000" },
    { label: "Purple", value: "#6600CC" },
  ]

  const durationOptions = [
    { label: "Automatic", value: "auto" },
    { label: "Fixed", value: "fixed" },
  ]

  const fpsOptions = [
    { label: "24 fps", value: 24 },
    { label: "30 fps", value: 30 },
    { label: "60 fps", value: 60 },
  ]

  return (
    <div className="w-64 border-r border-[#2A2D36] bg-[#1A1D24] overflow-y-auto h-full">
      <div className="flex items-center justify-between p-4 border-b border-[#2A2D36] sticky top-0 bg-[#1A1D24] z-10">
        <h2 className="text-sm font-medium">Settings</h2>
        <button className="text-[#9DA3AF] hover:text-white" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Aspect Ratio</h3>
          <div className="grid grid-cols-2 gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.value}
                className={`flex items-center justify-center p-2 rounded-md border ${
                  aspectRatio === ratio.value ? "border-blue-500 bg-blue-500/10" : "border-[#3A3D46] hover:bg-[#2A2D36]"
                }`}
                onClick={() => setAspectRatio(ratio.value)}
              >
                <span className="text-xs">{ratio.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Background Color</h3>
          <div className="grid grid-cols-3 gap-2">
            {backgroundColors.map((color) => (
              <button
                key={color.value}
                className={`relative h-10 rounded-md border ${
                  backgroundColor === color.value ? "border-blue-500" : "border-[#3A3D46]"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setBackgroundColor(color.value)}
              >
                {backgroundColor === color.value && (
                  <Check
                    size={16}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                      ["#FFFFFF", "#00CC66"].includes(color.value) ? "text-black" : "text-white"
                    }`}
                  />
                )}
              </button>
            ))}
            <div className="h-10 rounded-md border border-[#3A3D46] flex items-center justify-center relative">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full h-full opacity-0 cursor-pointer absolute"
              />
              <span className="text-xs">Custom</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Duration</h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {durationOptions.map((option) => (
              <button
                key={option.value}
                className={`flex items-center justify-center p-2 rounded-md border ${
                  duration === option.value ? "border-blue-500 bg-blue-500/10" : "border-[#3A3D46] hover:bg-[#2A2D36]"
                }`}
                onClick={() => setDuration(option.value)}
              >
                <span className="text-xs">{option.label}</span>
              </button>
            ))}
          </div>

          {duration === "fixed" && (
            <div>
              <label className="block text-xs text-[#9DA3AF] mb-1">Duration (seconds)</label>
              <input
                type="number"
                min="1"
                value={fixedDuration}
                onChange={(e) => setFixedDuration(Number.parseInt(e.target.value))}
                className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-1 text-sm"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Frames Per Second</h3>
          <div className="grid grid-cols-3 gap-2">
            {fpsOptions.map((option) => (
              <button
                key={option.value}
                className={`flex items-center justify-center p-2 rounded-md border ${
                  fps === option.value ? "border-blue-500 bg-blue-500/10" : "border-[#3A3D46] hover:bg-[#2A2D36]"
                }`}
                onClick={() => setFps(option.value)}
              >
                <span className="text-xs">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Output Quality</h3>
          <div className="grid grid-cols-3 gap-2">
            <button className="flex items-center justify-center p-2 rounded-md border border-[#3A3D46] hover:bg-[#2A2D36]">
              <span className="text-xs">Low</span>
            </button>
            <button className="flex items-center justify-center p-2 rounded-md border border-blue-500 bg-blue-500/10">
              <span className="text-xs">Medium</span>
            </button>
            <button className="flex items-center justify-center p-2 rounded-md border border-[#3A3D46] hover:bg-[#2A2D36]">
              <span className="text-xs">High</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Advanced Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-[#9DA3AF]">Auto-save</label>
              <button className="w-8 h-4 rounded-full relative bg-blue-600">
                <span className="absolute top-0.5 w-3 h-3 rounded-full bg-white translate-x-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs text-[#9DA3AF]">Hardware acceleration</label>
              <button className="w-8 h-4 rounded-full relative bg-blue-600">
                <span className="absolute top-0.5 w-3 h-3 rounded-full bg-white translate-x-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

