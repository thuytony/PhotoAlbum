import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import PhotoGrid from './components/PhotoGrid'
import PhotoDetail from './components/PhotoDetail'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/photos" element={<PhotoGrid />} />
              <Route path="/photos/:id" element={<PhotoDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App