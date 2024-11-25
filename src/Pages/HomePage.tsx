import Header from "@/components/Header"
import RoomGrid from "@/components/room-grid"
import SearchBar from "@/components/search-bar"
function HomePage() {
  return (
 <div className="min-h-screen bg-zinc-950">
    <Header />
    <main className="container mx-auto px-4 py-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
    <SearchBar />
    <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors w-full sm:w-auto">
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
      Start a room
    </button>
  </div>
  <RoomGrid />
  </main>
    </div>
  )
}

export default HomePage