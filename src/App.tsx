import { lazy, Suspense } from 'react'
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import Default from './layouts/default'
import ProtectedRoute from './layouts/protected-route'

const Register = lazy(() => import('./pages/register'))
const Login = lazy(() => import('./pages/login'))
const NewHotel = lazy(() => import('./pages/hotels/new-hotel'))

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route path='register' element={
            <Suspense fallback={<div>Loading...</div>}>
              <Register />
            </Suspense>
          }/>
          <Route path='login' element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }/>
          <Route path="/home" element={<ProtectedRoute />}>
            <Route path='new-hotel' element={
              <Suspense fallback={<div>Loading...</div>}>
                <NewHotel />
              </Suspense>
            }/>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
