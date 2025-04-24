import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    achievements: 0,
    papers: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);
      await fetchStats(user.id);
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async (userId) => {
    try {
      const [achievementsCount, papersCount] = await Promise.all([
        supabase
          .from('achievements')
          .select('id', { count: 'exact' })
          .eq('user_id', userId),
        supabase
          .from('research_papers')
          .select('id', { count: 'exact' })
          .eq('user_id', userId)
      ]);

      setStats({
        achievements: achievementsCount.count || 0,
        papers: papersCount.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Error loading profile statistics');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="text-lg">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Achievements</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.achievements}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Research Papers</h3>
              <p className="text-3xl font-bold text-green-600">{stats.papers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}