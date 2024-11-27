import Header from "@/components/Header"
import { useAuthStore } from "@/store"
import { Navigate, Outlet } from "react-router-dom"

function Dhashboard() {
    const { user } = useAuthStore()
  
    if (user === null) {
      return <Navigate to={`/auth/login?returnTo=${location.pathname}`} replace={ true } />
     }
  return (
    <div>
      <Header/>
      <Outlet />    
    </div>
  )
}

export default Dhashboard