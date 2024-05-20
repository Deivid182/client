import { lazy, Suspense } from 'react'
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"
import Default from './layouts/default'
import ProtectedRoute from './layouts/protected-route'

const Register = lazy(() => import('./pages/register'))
const Login = lazy(() => import('./pages/login'))
const NewHotel = lazy(() => import('./pages/hotels/new-hotel'))
const MyHotels = lazy(() => import('./pages/hotels/my-hotels'))
const EditHotel = lazy(() => import('./pages/hotels/edit-hotel'))
const Search = lazy(() => import('./pages/hotels/search'))
const Detail = lazy(() => import('./pages/hotels/detail'))

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
            <Route index element={
              <Suspense fallback={<div>Loading...</div>}>
                <MyHotels />
              </Suspense>
            }/>

            <Route path='new-hotel' element={
              <Suspense fallback={<div>Loading...</div>}>
                <NewHotel />
              </Suspense>
            }/>

            <Route path='edit-hotel/:id' element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditHotel />
              </Suspense>
            }/>
            <Route path='detail/:id' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Detail />
              </Suspense>
            }/>
            <Route path='search' element={
              <Suspense fallback={<div>Loading...</div>}>
                <Search />
              </Suspense>
            }/>
          </Route>

        </Route>
      </Routes>
    </Router>
  )
}

export default App
