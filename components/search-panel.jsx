"use client"

import { useState } from "react"
import { X, Search } from "lucide-react"

export default function SearchPanel({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()

    // Mock search results
    if (searchQuery.trim()) {
      setSearchResults([
        { id: 1, title: "Video Templates", type: "category" },
        { id: 2, title: "Intro Templates", type: "template" },
        { id: 3, title: "Outro Templates", type: "template" },
        { id: 4, title: "Social Media Templates", type: "template" },
        { id: 5, title: "Audio Effects", type: "category" },
      ])
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="w-64 border-r border-[#2A2D36] bg-[#1A1D24] overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-[#2A2D36]">
        <h2 className="text-sm font-medium">Search</h2>
        <button className="text-[#9DA3AF] hover:text-white" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <form onSubmit={handleSearch}>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search templates, effects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md pl-9 pr-3 py-2 text-sm"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-[#9DA3AF]" />
          </div>
        </form>

        {searchResults.length > 0 ? (
          <div>
            <h3 className="text-xs font-medium text-[#9DA3AF] mb-2">Results</h3>
            <div className="space-y-1">
              {searchResults.map((result) => (
                <button key={result.id} className="w-full text-left p-2 rounded-md hover:bg-[#2A2D36] text-sm">
                  {result.title}
                  <span className="text-xs text-[#9DA3AF] ml-2">{result.type}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-[#9DA3AF]">
              {searchQuery ? "No results found" : "Search for templates, effects, and more"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

