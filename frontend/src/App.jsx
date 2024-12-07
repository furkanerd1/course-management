import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from './pages/User'
import Course from './pages/Course'



function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route index element={<User/>}/>
            <Route path='courses' element={<Course/>}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
