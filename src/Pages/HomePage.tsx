import CreateRoomModal from "@/components/create-room-modal"
import Header from "@/components/Header"
import RoomGrid from "@/components/room-grid"
import SearchBar from "@/components/search-bar"
import { Mic } from "lucide-react"
import { useState } from "react"
function HomePage() {
   const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateRoom = (data: { topic: string; roomType: "open" | "social" | "private" }) => {
    // Handle room creation logic here
    console.log("Creating room:", data)
  }
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <SearchBar />
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors w-full sm:w-auto"
          >
            <Mic className="h-5 w-5" />
            Start a room
          </button>
        </div>
        <RoomGrid />
      </main>
      <CreateRoomModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreateRoom={handleCreateRoom}
      />
    </div>
  )
}

export default HomePage


