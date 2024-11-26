import ChatRoomCard from "./chat-room-card";
import RoomGridSkeleton from "./room-grid-skeleton";
import { getAllRooms } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

const getAll = async () => {
  const response = await getAllRooms();
  return response.data.data; 
};



function RoomGrid() {
  const { data: rooms, isLoading, error } = useQuery({
    queryKey: ["getrooms"],
    queryFn: getAll,
  });

  if (isLoading) {
    return <RoomGridSkeleton />;
  }

  if (error) {
    return <p>Error loading rooms: {error.message}</p>;
  }

  if (!Array.isArray(rooms)) {
    return <p>No rooms available</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {rooms.map((room) => (
        <ChatRoomCard
          key={room._id}
          title={room.topic} 
          participants={room.speakers} 
          totalParticipants={room.speakers?.length || 0}
        />
      ))}
    </div>
  );
}

export default RoomGrid;

