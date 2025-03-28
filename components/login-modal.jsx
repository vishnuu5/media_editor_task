"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function LoginModal({ onLogin, onClose }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1A1D24] rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{isRegistering ? "Create an account" : "Log in to your account"}</h2>
          <button className="text-[#9DA3AF] hover:text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-[#9DA3AF] mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-[#9DA3AF] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2A2D36] border border-[#3A3D46] rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium">
            {isRegistering ? "Register" : "Log in"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="text-sm text-blue-400 hover:underline" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Log in" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  )
}

