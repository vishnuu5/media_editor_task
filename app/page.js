"use client"

import { useState, useRef, useEffect } from "react"
import {
  Upload,
  Play,
  Pause,
  Clock,
  Undo,
  Redo,
  Scissors,
  Mic,
  SkipBack,
  SkipForward,
  ZoomIn,
  ZoomOut,
  Save,
} from "lucide-react"
import MediaCanvas from "@/components/media-canvas"
import MediaControls from "@/components/media-controls"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import Timeline from "@/components/timeline"
import SettingsPanel from "@/components/settings-panel"
import SearchPanel from "@/components/search-panel"
import LoginModal from "@/components/login-modal"
import BrandKitsPanel from "@/components/brand-kits-panel"
import MediaLibraryPanel from "@/components/media-library-panel"

export default function Home() {
  const [mediaItems, setMediaItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [activePanel, setActivePanel] = useState(null)
  const [projectName, setProjectName] = useState("Untitled Project")
  const [aspectRatio, setAspectRatio] = useState("16:9")
  const [backgroundColor, setBackgroundColor] = useState("#000000")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [showSoundwaves, setShowSoundwaves] = useState(true)
  const [fps, setFps] = useState(30)
  const timerRef = useRef(null)

  const [brandKits, setBrandKits] = useState([
    { id: 1, name: "Default Brand", colors: ["#0066CC", "#00CC66", "#CC0000"], fonts: ["Arial", "Helvetica"] },
    { id: 2, name: "Corporate", colors: ["#333333", "#666666", "#999999"], fonts: ["Times New Roman", "Georgia"] },
    { id: 3, name: "Modern", colors: ["#FF6B6B", "#4ECDC4", "#292F36"], fonts: ["Montserrat", "Open Sans"] },
  ])

  const [mediaLibrary, setMediaLibrary] = useState([
    { id: 1, type: "image", name: "Background 1", src: "/placeholder.svg?height=150&width=250" },
    { id: 2, type: "image", name: "Logo", src: "/placeholder.svg?height=150&width=150" },
    { id: 3, type: "video", name: "Intro Video", src: "/placeholder.svg?height=150&width=250" },
    { id: 4, type: "audio", name: "Background Music", duration: "2:30" },
  ])

  // Save current state to history when media items change
  useEffect(() => {
    if (mediaItems.length > 0) {
      const newHistoryState = {
        mediaItems: JSON.parse(JSON.stringify(mediaItems)),
        selectedItem: selectedItem ? JSON.parse(JSON.stringify(selectedItem)) : null,
      }

      // Only add to history if we're at the end of the history array
      if (historyIndex === history.length - 1 || historyIndex === -1) {
        setHistory([...history.slice(0, historyIndex + 1), newHistoryState])
        setHistoryIndex(historyIndex + 1)
      }
    }
  }, [mediaItems])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const isVideo = file.type.startsWith("video/")
    const isImage = file.type.startsWith("image/")
    const isAudio = file.type.startsWith("audio/")

    if (!isVideo && !isImage && !isAudio) {
      alert("Please upload a video, image, or audio file")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const newItem = {
        id: Date.now(),
        type: isVideo ? "video" : isImage ? "image" : "audio",
        src: event.target.result,
        x: 100,
        y: 100,
        width: 320,
        height: 240,
        startTime: 0,
        endTime: 10,
        volume: 1,
      }

      setMediaItems([...mediaItems, newItem])
      setSelectedItem(newItem)
    }
    reader.readAsDataURL(file)
  }

  const updateMediaItem = (id, updates) => {
    const updatedItems = mediaItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
    setMediaItems(updatedItems)

    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, ...updates })
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
    clearInterval(timerRef.current)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      const previousState = history[newIndex]
      setMediaItems(previousState.mediaItems)
      setSelectedItem(previousState.selectedItem)
      setHistoryIndex(newIndex)
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      const nextState = history[newIndex]
      setMediaItems(nextState.mediaItems)
      setSelectedItem(nextState.selectedItem)
      setHistoryIndex(newIndex)
    }
  }

  const handleSplit = () => {
    if (!selectedItem) return

    // Only split video or audio items
    if (selectedItem.type !== "video" && selectedItem.type !== "audio") return

    const splitPoint = currentTime

    // Check if split point is within the item's time range
    if (splitPoint <= selectedItem.startTime || splitPoint >= selectedItem.endTime) return

    // Create two new items from the split
    const firstPart = {
      ...selectedItem,
      id: Date.now(),
      endTime: splitPoint,
    }

    const secondPart = {
      ...selectedItem,
      id: Date.now() + 1,
      startTime: splitPoint,
    }

    // Remove the original item and add the two new parts
    const newMediaItems = mediaItems.filter((item) => item.id !== selectedItem.id)
    newMediaItems.push(firstPart, secondPart)

    setMediaItems(newMediaItems)
    setSelectedItem(secondPart) // Select the second part
  }

  const handleVoiceOver = () => {
    // Request microphone access
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        const audioChunks = []

        // Start recording
        mediaRecorder.start()
        alert("Recording voice over... Click OK to stop recording.")

        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data)
        })

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/mp3" })
          const audioUrl = URL.createObjectURL(audioBlob)

          // Add the voice over as a new audio item
          const newAudioItem = {
            id: Date.now(),
            type: "audio",
            src: audioUrl,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            startTime: currentTime,
            endTime: currentTime + 10, // Default 10 seconds duration
            volume: 1,
          }

          setMediaItems([...mediaItems, newAudioItem])
          setSelectedItem(newAudioItem)

          // Stop all tracks
          stream.getTracks().forEach((track) => track.stop())
        })

        // Stop recording when user clicks OK
        setTimeout(() => {
          mediaRecorder.stop()
        }, 100)
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error)
        alert("Could not access microphone. Please check your browser permissions.")
      })
  }

  const handleFrameBack = () => {
    const frameTime = 1 / fps
    setCurrentTime((prev) => Math.max(0, prev - frameTime))
  }

  const handleFrameForward = () => {
    const frameTime = 1 / fps
    setCurrentTime((prev) => prev + frameTime)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleSaveProject = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    // In a real app, this would save to a database
    const projectData = {
      name: projectName,
      aspectRatio,
      backgroundColor,
      mediaItems,
      currentTime,
      zoom,
      fps,
    }

    localStorage.setItem("savedProject", JSON.stringify(projectData))
    alert("Project saved successfully!")
  }

  const togglePanel = (panel) => {
    if (activePanel === panel) {
      setActivePanel(null)
    } else {
      setActivePanel(panel)
    }
  }

  const handleLogin = (username, password) => {
    // This is a mock login - in a real app, you would validate with a backend
    setIsLoggedIn(true)
    setUsername(username)
    setShowLoginModal(false)
  }

  useEffect(() => {
    if (isPlaying) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const frameTime = 1 / fps
          const newTime = prev + frameTime
          return Number.parseFloat(newTime.toFixed(3))
        })
      }, 1000 / fps)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [isPlaying, fps])

  // Get aspect ratio dimensions
  const getAspectRatioDimensions = () => {
    const [width, height] = aspectRatio.split(":").map(Number)
    return { width, height }
  }

  return (
    <main className="flex flex-col h-screen bg-[#0E1116] text-white">
      <Header
        projectName={projectName}
        setProjectName={setProjectName}
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={() => setShowLoginModal(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePanel={activePanel} onPanelToggle={togglePanel} />

        {activePanel === "settings" && (
          <SettingsPanel
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            fps={fps}
            setFps={setFps}
            onClose={() => setActivePanel(null)}
          />
        )}

        {activePanel === "search" && <SearchPanel onClose={() => setActivePanel(null)} />}

        {activePanel === "brand" && <BrandKitsPanel brandKits={brandKits} onClose={() => setActivePanel(null)} />}

        {activePanel === "media" && (
          <MediaLibraryPanel
            mediaLibrary={mediaLibrary}
            onAddToCanvas={(item) => {
              // Add media item to canvas
              const newItem = {
                id: Date.now(),
                type: item.type,
                src: item.src,
                x: 100,
                y: 100,
                width: 320,
                height: 240,
                startTime: 0,
                endTime: 10,
                volume: 1,
              }

              setMediaItems([...mediaItems, newItem])
              setSelectedItem(newItem)
            }}
            onClose={() => setActivePanel(null)}
          />
        )}

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 relative overflow-hidden bg-[#1A1D24] p-4">
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <button
                className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md"
                onClick={handleUndo}
                disabled={historyIndex <= 0}
              >
                <Undo size={16} />
              </button>
              <button
                className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                <Redo size={16} />
              </button>
              <button
                className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md"
                onClick={handleSplit}
                disabled={!selectedItem || (selectedItem.type !== "video" && selectedItem.type !== "audio")}
              >
                <Scissors size={16} />
              </button>
              <button className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md" onClick={handleVoiceOver}>
                <Mic size={16} />
              </button>
            </div>

            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md" onClick={handleFrameBack}>
                <SkipBack size={16} />
              </button>
              <button
                className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md"
                onClick={isPlaying ? handlePause : handlePlay}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md" onClick={handleFrameForward}>
                <SkipForward size={16} />
              </button>
              <div className="bg-[#2A2D36] p-2 rounded-md flex items-center gap-1">
                <Clock size={16} />
                <span>{currentTime.toFixed(2)}s</span>
              </div>
              <button className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md" onClick={handleZoomOut}>
                <ZoomOut size={16} />
              </button>
              <button className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md" onClick={handleZoomIn}>
                <ZoomIn size={16} />
              </button>
              <button className="bg-[#2A2D36] hover:bg-[#3A3D46] p-2 rounded-md" onClick={handleSaveProject}>
                <Save size={16} />
              </button>
            </div>

            <MediaCanvas
              mediaItems={mediaItems}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              updateMediaItem={updateMediaItem}
              currentTime={currentTime}
              zoom={zoom}
              backgroundColor={backgroundColor}
              aspectRatio={aspectRatio}
            />
          </div>

          <div className="h-64 bg-[#1A1D24] border-t border-[#2A2D36]">
            <div className="flex h-full">
              <div className="w-64 border-r border-[#2A2D36] p-4">
                <div className="flex flex-col h-full">
                  <h3 className="text-sm font-medium mb-4">Media</h3>
                  <label className="flex items-center justify-center h-20 border border-dashed border-[#3A3D46] rounded-md cursor-pointer hover:bg-[#2A2D36] transition-colors">
                    <div className="flex flex-col items-center">
                      <Upload size={20} className="mb-2 text-[#5D6470]" />
                      <span className="text-xs text-[#5D6470]">Upload a file</span>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>

              <div className="flex-1">
                {selectedItem && <MediaControls selectedItem={selectedItem} updateMediaItem={updateMediaItem} />}
                <Timeline
                  mediaItems={mediaItems}
                  currentTime={currentTime}
                  zoom={zoom}
                  fps={fps}
                  showComments={showComments}
                  showSoundwaves={showSoundwaves}
                  setShowComments={setShowComments}
                  setShowSoundwaves={setShowSoundwaves}
                  setFps={setFps}
                  setSelectedItem={setSelectedItem}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />}
    </main>
  )
}

