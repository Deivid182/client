import { lazy, Suspense } from 'react'
import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom"
import Default from './layouts/default'

const Register = lazy(() => import('./pages/register'))
const Login = lazy(() => import('./pages/login'))

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={<div>Home</div>} />
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
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
