import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store"

function ProfilePage() {
  const [fullName, setFullName] = useState("Rakesh K")
  const [avatar, setAvatar] = useState("/placeholder.svg")
  const { user } = useAuthStore()

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string) // Set base64 string as the avatar
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log("Profile updated:", { fullName, avatar })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatar || "/placeholder.svg"} alt="Profile picture" />
                <AvatarFallback>
                  {user?.username ? user?.username[0] : "U"}
                </AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar" className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Change Avatar
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{user?.email}</Label>
              <Input id="email" type="email" value="rakesh@example.com" disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">{user?.username}</Label>
              <Input id="username" value="rakesh_k" disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={handleFullNameChange}
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
