import { Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChatRoomCardProps {
  title: string
  participants: {
    name: string
    avatar: string
  }[]
  totalParticipants: number
}

function ChatRoomCard({
  title,
  participants,
  totalParticipants,
}: ChatRoomCardProps) {
  return (
    <Card className="bg-card hover:bg-accent transition-colors">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {participants.slice(0, 2).map((participant, index) => (
                <Avatar key={index} className="border-2 border-background">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {participants.slice(0, 2).map((participant, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-sm">{participant.name}</span>
                  <span className="text-xs">💬</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>{totalParticipants}</span>
            <Users className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChatRoomCard