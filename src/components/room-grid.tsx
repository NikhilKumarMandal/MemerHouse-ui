import { useEffect, useState } from "react"
import ChatRoomCard from "./chat-room-card"
import RoomGridSkeleton from "./room-grid-skeleton"

const rooms = [
  {
    id: 1,
    title: "Which framework best for frontend?",
    participants: [
      { name: "John Doe", avatar: "/placeholder.svg" },
      { name: "Jane Doe", avatar: "/placeholder.svg" },
    ],
    totalParticipants: 40,
  },
  {
    id: 2,
    title: "What's new in machine learning?",
    participants: [
      { name: "Alice Smith", avatar: "/placeholder.svg" },
      { name: "Bob Johnson", avatar: "/placeholder.svg" },
    ],
    totalParticipants: 35,
  },
  {
    id: 3,
    title: "Why people use stack overflow?",
    participants: [
      { name: "Emma Wilson", avatar: "/placeholder.svg" },
      { name: "Michael Brown", avatar: "/placeholder.svg" },
    ],
    totalParticipants: 28,
  },
  {
    id: 4,
    title: "Artificial intelligence is the future?",
    participants: [
      { name: "Olivia Davis", avatar: "/placeholder.svg" },
      { name: "Daniel Lee", avatar: "/placeholder.svg" },
    ],
    totalParticipants: 52,
  },
]

function RoomGrid() {
    const [isLoading, setIsLoading] = useState(true)
    
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <RoomGridSkeleton />
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {rooms.map((room) => (
        <ChatRoomCard
          key={room.id}
          title={room.title}
          participants={room.participants}
          totalParticipants={room.totalParticipants}
        />
      ))}
    </div>
  )
}



export default RoomGrid;