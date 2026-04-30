import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import ChatRoom from './ChatRoom'

function Home() {
  const [roomName, setRoomName] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const joinRoom = (e) => {
    e.preventDefault()
    if (roomName.trim() && username.trim()) {
      navigate(`/chat/${roomName}`, { state: { username } })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join a Chat</h1>
          <p className="text-gray-500">Enter your details to connect instantly.</p>
        </div>

        <form onSubmit={joinRoom} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              placeholder="e.g., Gaurav" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
            <input 
              type="text" 
              placeholder="e.g., coding-lounge" 
              value={roomName} 
              onChange={(e) => setRoomName(e.target.value)} 
              required 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md mt-4"
          >
            Enter Room
          </button>
        </form>

      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:roomName" element={<ChatRoom />} />
      </Routes>
    </Router>
  )
}

export default App