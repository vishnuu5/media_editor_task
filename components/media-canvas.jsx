"use client"

import { useRef } from "react"
import { Rnd } from "react-rnd"

export default function MediaCanvas({
  mediaItems,
  selectedItem,
  setSelectedItem,
  updateMediaItem,
  currentTime,
  zoom,
  backgroundColor,
  aspectRatio,
}) {
  const canvasRef = useRef(null)

  const handleSelect = (item) => {
    setSelectedItem(item)
  }

  const isItemVisible = (item) => {
    return currentTime >= item.startTime && currentTime <= item.endTime
  }

  // Calculate canvas dimensions based on aspect ratio
  const getCanvasDimensions = () => {
    const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number)
    const ratio = widthRatio / heightRatio

    // Base size
    let width = 640
    let height = width / ratio

    // Apply zoom
    width = width * zoom
    height = height * zoom

    return { width, height }
  }

  const { width, height } = getCanvasDimensions()

  return (
    <div className="w-full h-full flex items-center justify-center overflow-auto">
      <div
        ref={canvasRef}
        className="relative rounded-md overflow-hidden"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: backgroundColor,
        }}
      >
        {mediaItems.map((item) => {
          if (!isItemVisible(item)) return null

          if (item.type === "audio") {
            // Audio items don't have visual representation on canvas
            return null
          }

          return (
            <Rnd
              key={item.id}
              size={{ width: item.width, height: item.height }}
              position={{ x: item.x, y: item.y }}
              onDragStop={(e, d) => {
                updateMediaItem(item.id, { x: d.x, y: d.y })
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                updateMediaItem(item.id, {
                  width: Number.parseInt(ref.style.width),
                  height: Number.parseInt(ref.style.height),
                  x: position.x,
                  y: position.y,
                })
              }}
              className={`${selectedItem?.id === item.id ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => handleSelect(item)}
            >
              {item.type === "image" ? (
                <img src={item.src || "/placeholder.svg"} alt="Media" className="w-full h-full object-cover" />
              ) : (
                <video src={item.src} className="w-full h-full object-cover" controls={false} />
              )}
            </Rnd>
          )
        })}
      </div>
    </div>
  )
}

