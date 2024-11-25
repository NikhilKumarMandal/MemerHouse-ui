import { useAuthStore } from "@/store"
import { Navigate, Outlet } from "react-router-dom"


function NonAuth() {
    const { user } = useAuthStore()
  if (user !== null) {
      const returnTo = new URLSearchParams(location.search).get('returnTo') || "/"
        return <Navigate to={returnTo} replace={ true } />
    }
  return (
    <Outlet/>
  )
}

export default NonAuth