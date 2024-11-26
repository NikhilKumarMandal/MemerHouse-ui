import React from "react";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useAuthStore } from "@/store";
import { Navigate, useParams } from "react-router-dom";

const Room: React.FC = () => {
  const { id: roomId } = useParams<{ id: string }>();
    const { user } = useAuthStore();
    if (!user) {
    return <Navigate to="/auth/login" replace />;
    }

  const { clients, provideRef } = useWebRTC(roomId!, user);

  return (
<div>
  <h1 className="text-lg font-bold mb-4">All Connected Clients</h1>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {clients.map((client) => (
      <div
        key={client._id || Math.random()} // Ensure a unique key for debugging, but replace Math.random for production
        className="flex items-center p-4 border rounded shadow-sm"
      >
        <audio
          ref={(instance) => {
            if (instance) provideRef(instance, client._id);
          }}
          controls
          autoPlay
          className="mr-4"
        />
        <h4 className="font-medium text-gray-700">
          {client.username || "Unnamed Client"}
        </h4>
      </div>
    ))}
  </div>
</div>

  );
};

export default Room;
