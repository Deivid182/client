import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom"
import Default from './layouts/default'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={<div>Home</div>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
