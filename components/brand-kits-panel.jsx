"use client"

import { useState } from "react"
import { X, Plus, Trash2, Edit } from "lucide-react"

export default function BrandKitsPanel({ brandKits, onClose }) {
  const [selectedKit, setSelectedKit] = useState(null)
  const [showAddKit, setShowAddKit] = useState(false)

  return (
    <div className="w-64 border-r border-[#2A2D36] bg-[#1A1D24] overflow-y-auto h-full">
      <div className="flex items-center justify-between p-4 border-b border-[#2A2D36] sticky top-0 bg-[#1A1D24] z-10">
        <h2 className="text-sm font-medium">Brand Kits</h2>
        <button className="text-[#9DA3AF] hover:text-white" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Your Brand Kits</h3>
          <button className="bg-[#2A2D36] hover:bg-[#3A3D46] p-1 rounded-md" onClick={() => setShowAddKit(!showAddKit)}>
            <Plus size={16} />
          </button>
        </div>

        {showAddKit && (
          <div className="mb-4 p-3 bg-[#2A2D36] rounded-md">
            <h4 className="text-xs font-medium mb-2">New Brand Kit</h4>
            <input
              type="text"
              placeholder="Brand Kit Name"
              className="w-full bg-[#3A3D46] border border-[#4A4D56] rounded-md px-3 py-1 text-sm mb-2"
            />
            <div className="flex gap-2 mb-2">
              <input type="color" defaultValue="#0066CC" className="w-8 h-8 rounded-md border border-[#4A4D56] p-0" />
              <input type="color" defaultValue="#00CC66" className="w-8 h-8 rounded-md border border-[#4A4D56] p-0" />
              <input type="color" defaultValue="#CC0000" className="w-8 h-8 rounded-md border border-[#4A4D56] p-0" />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-md text-xs">Save</button>
              <button
                className="flex-1 bg-[#3A3D46] hover:bg-[#4A4D56] text-white py-1 rounded-md text-xs"
                onClick={() => setShowAddKit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {brandKits.map((kit) => (
            <div
              key={kit.id}
              className={`p-3 rounded-md cursor-pointer ${
                selectedKit === kit.id ? "bg-[#2A2D36]" : "hover:bg-[#2A2D36]"
              }`}
              onClick={() => setSelectedKit(kit.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">{kit.name}</h4>
                <div className="flex gap-1">
                  <button className="text-[#9DA3AF] hover:text-white">
                    <Edit size={14} />
                  </button>
                  <button className="text-[#9DA3AF] hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mb-2">
                {kit.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-md border border-[#4A4D56]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="text-xs text-[#9DA3AF]">Fonts: {kit.fonts.join(", ")}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Apply Brand Kit</h3>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm"
            disabled={!selectedKit}
          >
            Apply to Project
          </button>
        </div>
      </div>
    </div>
  )
}

