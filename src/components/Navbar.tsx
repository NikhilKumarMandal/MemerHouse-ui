import { Mic, LogOut, User, Search, Menu, Home } from 'lucide-react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuthStore } from '@/store'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function Navbar() {
    const { user } = useAuthStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false)
  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/75"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-zinc-400 hover:text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-gradient-to-b from-zinc-900 to-zinc-950 text-white">
            <nav className="flex flex-col space-y-6 mt-8">
              <Link to="/" className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
                <Home className="h-5 w-5" />
                <span className="font-semibold">Home</span>
              </Link>
              
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center space-x-2 ml-4 md:ml-0">
          <motion.span 
            role="img" 
            aria-label="logo" 
            className="text-3xl"
            whileHover={{ rotate: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            🏠
          </motion.span>
          <span className="hidden font-bold text-white text-xl md:inline-block">
            Memerhouse
          </span>
        </Link>

        <div className="flex-1 flex items-center justify-end md:justify-center px-4">
          <motion.div 
            className={`relative w-full max-w-md ${isSearchOpen ? 'flex' : 'hidden md:flex'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="search"
              placeholder="Search Memerhouse..."
              className="w-full bg-zinc-800 border-zinc-700 pl-10 pr-4 py-2 rounded-full placeholder:text-zinc-500 focus-visible:ring-emerald-500 focus-visible:ring-offset-zinc-900"
            />
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Toggle search</span>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {}}
              className="bg-primary hover:bg-emerald-700 text-white hidden sm:flex rounded-full"
              size="sm"
            >
              <Mic className="mr-2 h-4 w-4" />
              Start a room
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {}}
              className="bg-primary hover:bg-emerald-700 text-white sm:hidden rounded-full"
              size="icon"
            >
              <Mic className="h-4 w-4" />
              <span className="sr-only">Start a room</span>
            </Button>
          </motion.div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-blue-400-500">
                    <AvatarImage src={user._id} alt={user.username} />
                    <AvatarFallback className=" text-white">{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-zinc-900 border-zinc-800"
                align="end"
                forceMount
              >
                <DropdownMenuItem className="flex items-center text-white hover:bg-zinc-800">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  className="flex items-center text-red-400 focus:text-red-400 hover:bg-zinc-800"
                  onClick={() => {}}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" className="text-white hover:bg-zinc-800">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar