"use client"

import { useState } from "react"
import { ChevronDown, User, LogOut } from "lucide-react"
import ExportModal from "./export-modal"

export default function Header({ projectName, setProjectName, isLoggedIn, username, onLogin, onLogout }) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState(projectName)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  const handleNameChange = (e) => {
    setTempName(e.target.value)
  }

  const handleNameSubmit = () => {
    setProjectName(tempName)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNameSubmit()
    }
  }

  return (
    <header className="h-14 border-b border-[#2A2D36] flex items-center px-4">
      <div className="text-xl font-bold">VEED</div>

      <div className="ml-8 flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={tempName}
            onChange={handleNameChange}
            onBlur={handleNameSubmit}
            onKeyDown={handleKeyDown}
            className="bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-1 text-sm"
            autoFocus
          />
        ) : (
          <div className="flex items-center cursor-pointer" onClick={() => setIsEditing(true)}>
            <span className="text-sm font-medium">{projectName}</span>
            <ChevronDown size={16} className="ml-1" />
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-4">
        {isLoggedIn ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-[#2A2D36] hover:bg-[#3A3D46] px-3 py-1.5 rounded-md text-sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <User size={16} />
              <span>{username}</span>
              <ChevronDown size={14} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-[#2A2D36] rounded-md shadow-lg z-20">
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-[#3A3D46]"
                  onClick={() => {
                    onLogout()
                    setShowUserMenu(false)
                  }}
                >
                  <LogOut size={14} />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="bg-[#2A2D36] hover:bg-[#3A3D46] px-3 py-1.5 rounded-md text-sm" onClick={onLogin}>
            Log in
          </button>
        )}

        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm font-medium"
          onClick={() => setShowExportModal(true)}
        >
          Export
        </button>
      </div>

      {showExportModal && <ExportModal onClose={() => setShowExportModal(false)} />}
    </header>
  )
}

