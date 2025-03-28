"use client"

import { useState } from "react"
import { X, Download, Film, Image, FileText } from "lucide-react"

export default function ExportModal({ onClose }) {
  const [exportFormat, setExportFormat] = useState("mp4")
  const [quality, setQuality] = useState("medium")
  const [resolution, setResolution] = useState("1080p")
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)

  const formats = [
    { id: "mp4", label: "MP4 Video", icon: Film },
    { id: "gif", label: "GIF", icon: Image },
    { id: "jpg", label: "JPG Image", icon: Image },
    { id: "mp3", label: "MP3 Audio", icon: FileText },
  ]

  const qualities = [
    { id: "low", label: "Low", description: "Faster export, smaller file" },
    { id: "medium", label: "Medium", description: "Balanced quality and size" },
    { id: "high", label: "High", description: "Best quality, larger file" },
  ]

  const resolutions = [
    { id: "480p", label: "480p", width: 854, height: 480 },
    { id: "720p", label: "720p", width: 1280, height: 720 },
    { id: "1080p", label: "1080p", width: 1920, height: 1080 },
    { id: "4k", label: "4K", width: 3840, height: 2160 },
  ]

  const handleExport = () => {
    setIsExporting(true)
    setProgress(0)

    // Simulate export process
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsExporting(false)
            alert("Export complete! Your file has been downloaded.")
            onClose()
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 200)
  }

  const getSelectedResolution = () => {
    return resolutions.find((r) => r.id === resolution)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1A1D24] rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Export Project</h2>
          <button className="text-[#9DA3AF] hover:text-white" onClick={onClose} disabled={isExporting}>
            <X size={24} />
          </button>
        </div>

        {isExporting ? (
          <div className="py-8">
            <h3 className="text-lg font-medium mb-4 text-center">Exporting your project...</h3>
            <div className="w-full bg-[#2A2D36] h-4 rounded-full mb-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-[#9DA3AF]">{progress}% complete</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Format</h3>
              <div className="grid grid-cols-4 gap-3">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    className={`flex flex-col items-center justify-center p-4 rounded-md border ${
                      exportFormat === format.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-[#3A3D46] hover:bg-[#2A2D36]"
                    }`}
                    onClick={() => setExportFormat(format.id)}
                  >
                    <format.icon size={24} className="mb-2" />
                    <span className="text-sm">{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Quality</h3>
              <div className="grid grid-cols-3 gap-3">
                {qualities.map((q) => (
                  <button
                    key={q.id}
                    className={`flex flex-col items-center justify-center p-4 rounded-md border ${
                      quality === q.id ? "border-blue-500 bg-blue-500/10" : "border-[#3A3D46] hover:bg-[#2A2D36]"
                    }`}
                    onClick={() => setQuality(q.id)}
                  >
                    <span className="text-sm font-medium mb-1">{q.label}</span>
                    <span className="text-xs text-[#9DA3AF] text-center">{q.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Resolution</h3>
              <div className="grid grid-cols-4 gap-3">
                {resolutions.map((res) => (
                  <button
                    key={res.id}
                    className={`flex flex-col items-center justify-center p-3 rounded-md border ${
                      resolution === res.id ? "border-blue-500 bg-blue-500/10" : "border-[#3A3D46] hover:bg-[#2A2D36]"
                    }`}
                    onClick={() => setResolution(res.id)}
                  >
                    <span className="text-sm font-medium mb-1">{res.label}</span>
                    <span className="text-xs text-[#9DA3AF]">
                      {res.width}×{res.height}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Advanced Settings</h3>
              <div className="bg-[#2A2D36] rounded-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium">Include Watermark</h4>
                    <p className="text-xs text-[#9DA3AF]">Add your brand logo to the video</p>
                  </div>
                  <button className="w-10 h-5 rounded-full relative bg-[#3A3D46]">
                    <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white translate-x-1" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium">Hardware Acceleration</h4>
                    <p className="text-xs text-[#9DA3AF]">Use GPU for faster export</p>
                  </div>
                  <button className="w-10 h-5 rounded-full relative bg-blue-600">
                    <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white translate-x-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Optimize for Web</h4>
                    <p className="text-xs text-[#9DA3AF]">Compress for faster loading</p>
                  </div>
                  <button className="w-10 h-5 rounded-full relative bg-blue-600">
                    <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white translate-x-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#2A2D36] p-4 rounded-md mb-6">
              <div>
                <h4 className="text-sm font-medium">Estimated File Size</h4>
                <p className="text-xs text-[#9DA3AF]">Based on your current settings</p>
              </div>
              <span className="text-sm font-medium">
                {quality === "low" ? "12.4 MB" : quality === "medium" ? "24.8 MB" : "48.2 MB"}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-[#2A2D36] hover:bg-[#3A3D46] text-white py-3 rounded-md font-medium"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium flex items-center justify-center gap-2"
                onClick={handleExport}
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

