import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Student Portal</Link>
        <div className="space-x-4">
          <Link to="/achievements" className="hover:text-gray-300">Achievements</Link>
          <Link to="/research" className="hover:text-gray-300">Research Papers</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          <button onClick={handleSignOut} className="hover:text-gray-300">Sign In</button>
        </div>
      </div>
    </nav>
  );
}