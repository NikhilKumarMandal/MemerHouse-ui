import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

 function SearchBar() {
  return (
     <div className="relative w-full max-w-md mx-auto sm:mx-0">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 w-full bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700"
      />
    </div>
  )
}

export default SearchBar
