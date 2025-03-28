"use client"

import { useState, useEffect } from "react"
import { Volume2 } from "lucide-react"

export default function MediaControls({ selectedItem, updateMediaItem }) {
  const [width, setWidth] = useState(selectedItem?.width || 0)
  const [height, setHeight] = useState(selectedItem?.height || 0)
  const [startTime, setStartTime] = useState(selectedItem?.startTime || 0)
  const [endTime, setEndTime] = useState(selectedItem?.endTime || 10)
  const [volume, setVolume] = useState(selectedItem?.volume || 1)
  const [opacity, setOpacity] = useState(selectedItem?.opacity || 1)
  const [rotation, setRotation] = useState(selectedItem?.rotation || 0)
  const [scale, setScale] = useState(selectedItem?.scale || 1)

  useEffect(() => {
    if (selectedItem) {
      setWidth(selectedItem.width)
      setHeight(selectedItem.height)
      setStartTime(selectedItem.startTime)
      setEndTime(selectedItem.endTime)
      setVolume(selectedItem.volume || 1)
      setOpacity(selectedItem.opacity || 1)
      setRotation(selectedItem.rotation || 0)
      setScale(selectedItem.scale || 1)
    }
  }, [selectedItem])

  const handleWidthChange = (e) => {
    const newWidth = Number.parseInt(e.target.value)
    setWidth(newWidth)
    updateMediaItem(selectedItem.id, { width: newWidth })
  }

  const handleHeightChange = (e) => {
    const newHeight = Number.parseInt(e.target.value)
    setHeight(newHeight)
    updateMediaItem(selectedItem.id, { height: newHeight })
  }

  const handleStartTimeChange = (e) => {
    const newStartTime = Number.parseFloat(e.target.value)
    setStartTime(newStartTime)
    updateMediaItem(selectedItem.id, { startTime: newStartTime })
  }

  const handleEndTimeChange = (e) => {
    const newEndTime = Number.parseFloat(e.target.value)
    setEndTime(newEndTime)
    updateMediaItem(selectedItem.id, { endTime: newEndTime })
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    updateMediaItem(selectedItem.id, { volume: newVolume })
  }

  const handleOpacityChange = (e) => {
    const newOpacity = Number.parseFloat(e.target.value)
    setOpacity(newOpacity)
    updateMediaItem(selectedItem.id, { opacity: newOpacity })
  }

  const handleRotationChange = (e) => {
    const newRotation = Number.parseInt(e.target.value)
    setRotation(newRotation)
    updateMediaItem(selectedItem.id, { rotation: newRotation })
  }

  const handleScaleChange = (e) => {
    const newScale = Number.parseFloat(e.target.value)
    setScale(newScale)
    updateMediaItem(selectedItem.id, { scale: newScale })
  }

  if (!selectedItem) return null

  return (
    <div className="p-4 border-b border-[#2A2D36] max-h-[calc(100%-80px)] overflow-y-auto">
      <h3 className="text-sm font-medium mb-3">Media Properties</h3>

      <div className="grid grid-cols-2 gap-4">
        {(selectedItem.type === "image" || selectedItem.type === "video") && (
          <>
            <div>
              <label className="block text-xs text-[#9DA3AF] mb-1">Width</label>
              <input
                type="number"
                value={width}
                onChange={handleWidthChange}
                className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9DA3AF] mb-1">Height</label>
              <input
                type="number"
                value={height}
                onChange={handleHeightChange}
                className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-1 text-sm"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-xs text-[#9DA3AF] mb-1">Start Time (s)</label>
          <input
            type="number"
            value={startTime}
            onChange={handleStartTimeChange}
            step="0.1"
            min="0"
            className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-1 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs text-[#9DA3AF] mb-1">End Time (s)</label>
          <input
            type="number"
            value={endTime}
            onChange={handleEndTimeChange}
            step="0.1"
            min={startTime}
            className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-1 text-sm"
          />
        </div>

        {(selectedItem.type === "video" || selectedItem.type === "audio") && (
          <div className="col-span-2">
            <label className="block text-xs text-[#9DA3AF] mb-1">Volume</label>
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-[#9DA3AF]" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-[#2A2D36] rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-[#9DA3AF]">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        )}

        {/* Additional properties for more advanced editing */}
        {(selectedItem.type === "image" || selectedItem.type === "video") && (
          <>
            <div className="col-span-2">
              <label className="block text-xs text-[#9DA3AF] mb-1">Opacity</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={handleOpacityChange}
                  className="flex-1 h-2 bg-[#2A2D36] rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-[#9DA3AF]">{Math.round(opacity * 100)}%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#9DA3AF] mb-1">Rotation (deg)</label>
              <input
                type="number"
                value={rotation}
                onChange={handleRotationChange}
                step="1"
                className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9DA3AF] mb-1">Scale</label>
              <input
                type="number"
                value={scale}
                onChange={handleScaleChange}
                step="0.1"
                min="0.1"
                max="10"
                className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-1 text-sm"
              />
            </div>
          </>
        )}

        {/* Effects section */}
        <div className="col-span-2 mt-4">
          <h4 className="text-sm font-medium mb-2">Effects</h4>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 bg-[#2A2D36] hover:bg-[#3A3D46] rounded-md text-xs">Fade In</button>
            <button className="p-2 bg-[#2A2D36] hover:bg-[#3A3D46] rounded-md text-xs">Fade Out</button>
            <button className="p-2 bg-[#2A2D36] hover:bg-[#3A3D46] rounded-md text-xs">Blur</button>
            <button className="p-2 bg-[#2A2D36] hover:bg-[#3A3D46] rounded-md text-xs">Sharpen</button>
            <button className="p-2 bg-[#2A2D36] hover:bg-[#3A3D46] rounded-md text-xs">Grayscale</button>
            <button className="p-2 bg-[#2A2D36] hover:bg-[#3A3D46] rounded-md text-xs">Sepia</button>
          </div>
        </div>
      </div>
    </div>
  )
}

