import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './components/SignIn'
import CreateAccount from './components/CreateAccount'
import HomeDashboard from './components/HomeDashboard'
import Analysis from './components/Analysis'
import BillEstimation from './components/BillEstimation'
import UpiPayment from './components/UpiPayment'
import History from './components/History'
import Profile from './components/Profile'

export default function App() {
  useEffect(() => {
    const handleThemeChange = () => {
      const isLight = localStorage.getItem('wattwatcher_theme') === 'light'
      if (isLight) {
        document.body.classList.add('light-theme')
      } else {
        document.body.classList.remove('light-theme')
      }
    }
    
    // Run once on load
    handleThemeChange()

    window.addEventListener('themeChange', handleThemeChange)
    return () => {
      window.removeEventListener('themeChange', handleThemeChange)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/bill" element={<BillEstimation />} />
        <Route path="/payment" element={<UpiPayment />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
