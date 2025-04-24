import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Achievements from './pages/Achievements';
import Research from './pages/Research';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/research" element={<Research />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/landingpage" element={<LandingPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;