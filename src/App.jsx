import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import NewGame from './Pages/NewGame.jsx'
import Instructions from './Pages/Instructions.jsx'
import RoleAssignment from './Pages/RoleAssignment.jsx'
import GameRound from './Pages/GameRound.jsx'
import RoundSummary from './Pages/RoundSummary.jsx'
import GameSummary from './Pages/GameSummary.jsx'
import './styles/jungle-theme.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-game" element={<NewGame />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/role-assignment" element={<RoleAssignment />} />
        <Route path="/game-round" element={<GameRound />} />
        <Route path="/round-summary" element={<RoundSummary />} />
        <Route path="/game-summary" element={<GameSummary />} />
      </Routes>
    </Router>
  )
}

export default App
