import { LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🤡</span>
            <span className="text-xl font-semibold text-white">Memerhouse</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">Rakesh K</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus-visible:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User avatar" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
