import { Skeleton } from "@/components/ui/skeleton"

function RoomGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-lg bg-zinc-900 p-4">
          <Skeleton className="h-6 w-3/4 mb-4 bg-zinc-800" />
          <div className="flex -space-x-2 mb-4">
            <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
            <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-4 w-12 bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoomGridSkeleton