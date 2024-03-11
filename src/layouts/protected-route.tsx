import { Outlet, Navigate } from "react-router-dom"
import { useApp } from "../hooks/use-app"
const ProtectedRoute = () => {

  const { isAuth } = useApp();

  return (
    <>
      {isAuth ? <Outlet /> : <Navigate to="/login" />}
    </>
  )
}

export default ProtectedRoute