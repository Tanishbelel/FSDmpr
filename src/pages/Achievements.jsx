import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trophy, Clock, Plus, Award, Star, ChevronDown, Trash2, ChevronUp, Filter } from 'lucide-react';

export default function Achievements() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [user, setUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
      fetchAchievements();
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/login');
    }
  };

  const fetchAchievements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      toast.error('Failed to load achievements');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to add achievements');
      navigate('/login');
      return;
    }

    try {
      const { error } = await supabase
        .from('achievements')
        .insert([{ 
          title, 
          description, 
          date,
          user_id: user.id 
        }]);
      
      if (error) throw error;
      
      toast.success('Achievement added successfully');
      setTitle('');
      setDescription('');
      setDate('');
      setIsFormOpen(false);
      fetchAchievements();
    } catch (error) {
      console.error('Error adding achievement:', error);
      toast.error('Failed to add achievement');
    }
  };

  if (!user) {
    return null;
  }

  // Categories with their respective colors
  const categories = [
    { name: 'All', color: 'bg-gray-600' },
    { name: 'Professional', color: 'bg-blue-600' },
    { name: 'Personal', color: 'bg-green-600' },
    { name: 'Learning', color: 'bg-purple-600' },
    { name: 'Health', color: 'bg-red-600' },
    { name: 'Financial', color: 'bg-yellow-600' }
  ];

  // Function to get a category color based on the title
  const getCategoryColor = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('work') || titleLower.includes('project') || titleLower.includes('career'))
      return 'bg-blue-600';
    if (titleLower.includes('learn') || titleLower.includes('course') || titleLower.includes('study'))
      return 'bg-purple-600';
    if (titleLower.includes('health') || titleLower.includes('fitness') || titleLower.includes('workout'))
      return 'bg-red-600';
    if (titleLower.includes('finance') || titleLower.includes('save') || titleLower.includes('money'))
      return 'bg-yellow-600';
    
    // Default to personal for anything else
    return 'bg-green-600';
  };
  
  const getCategory = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('work') || titleLower.includes('project') || titleLower.includes('career'))
      return 'Professional';
    if (titleLower.includes('learn') || titleLower.includes('course') || titleLower.includes('study'))
      return 'Learning';
    if (titleLower.includes('health') || titleLower.includes('fitness') || titleLower.includes('workout'))
      return 'Health';
    if (titleLower.includes('finance') || titleLower.includes('save') || titleLower.includes('money'))
      return 'Financial';
    
    // Default to personal for anything else
    return 'Personal';
  };

  // Filter achievements based on category
  const filteredAchievements = activeFilter === 'All' 
    ? achievements 
    : achievements.filter(achievement => getCategory(achievement.title) === activeFilter);
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Achievement Tracker</h1>
              <p className="text-gray-600 mt-1">Track, celebrate, and reflect on your progress</p>
            </div>
            <button 
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span className="font-medium">Add Achievement</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Form Section */}
        {isFormOpen && (
          <div className="mb-8 bg-white rounded-lg shadow p-6 border border-gray-100 transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Record New Achievement</h2>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-full"
                aria-label="Close form"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Achievement Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="What did you accomplish?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows="4"
                  placeholder="Describe your achievement and why it matters to you"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Achieved</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors shadow-sm"
                >
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Dashboard Top Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow border border-gray-100 p-5 flex items-center">
            <div className="bg-blue-100 p-4 rounded-lg text-blue-600 mr-4">
              <Trophy size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Achievements</h3>
              <p className="text-3xl font-bold text-gray-900">{achievements.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow border border-gray-100 p-5 flex items-center">
            <div className="bg-green-100 p-4 rounded-lg text-green-600 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">This Month</h3>
              <p className="text-3xl font-bold text-gray-900">
                {achievements.filter(a => {
                  const achievementDate = new Date(a.date);
                  const now = new Date();
                  return achievementDate.getMonth() === now.getMonth() &&
                         achievementDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow border border-gray-100 p-5 flex items-center">
            <div className="bg-purple-100 p-4 rounded-lg text-purple-600 mr-4">
              <Star size={24} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Latest Achievement</h3>
              <p className="text-xl font-semibold text-gray-900 truncate max-w-xs">
                {achievements.length > 0 ? achievements[0].title : 'None yet'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Filter and Categories Section */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">Your Achievements</h2>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
              <span>Filter: {activeFilter}</span>
              {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 ${activeFilter === category.name ? 'bg-gray-50' : ''}`}
                    onClick={() => {
                      setActiveFilter(category.name);
                      setIsFilterOpen(false);
                    }}
                  >
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Achievements Display */}
        <div className="mb-12">
          {filteredAchievements.length === 0 ? (
            <div className="bg-white rounded-lg shadow border border-gray-100 p-8 text-center">
              <Trophy className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {activeFilter === 'All' ? 'No achievements yet' : `No ${activeFilter} achievements yet`}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {activeFilter === 'All' 
                  ? 'Start tracking your accomplishments to build your achievement history.' 
                  : `You haven't added any ${activeFilter.toLowerCase()} achievements yet. Add one to start tracking your progress.`}
              </p>
              <button 
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-colors shadow-sm font-medium"
              >
                <Plus size={16} /> 
                {activeFilter === 'All' ? 'Add your first achievement' : `Add ${activeFilter} achievement`}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => {
                const categoryColor = getCategoryColor(achievement.title);
                const category = getCategory(achievement.title);
                
                return (
                  <div key={achievement.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`h-2 ${categoryColor}`}></div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {achievement.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          category === 'Professional' ? 'bg-blue-100 text-blue-800' :
                          category === 'Personal' ? 'bg-green-100 text-green-800' :
                          category === 'Learning' ? 'bg-purple-100 text-purple-800' :
                          category === 'Health' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {achievement.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-2 border-t border-gray-100">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>
                            {new Date(achievement.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        <button className="text-gray-400 hover:text-red-500 p-1" aria-label="Delete achievement">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Quick Stats & Timeline Section */}
        {achievements.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats by Category */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories Breakdown</h3>
              <div className="space-y-4">
                {categories.slice(1).map((category) => {
                  const count = achievements.filter(a => getCategory(a.title) === category.name).length;
                  const percentage = achievements.length > 0 ? (count / achievements.length) * 100 : 0;
                  
                  return (
                    <div key={category.name}>
                      <div className="flex justify-between mb-1">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                          <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${category.color.replace('bg-', 'bg-')}`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Timeline */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {achievements.slice(0, 5).map((achievement, index) => {
                  const categoryColor = getCategoryColor(achievement.title);
                  
                  return (
                    <div key={achievement.id} className="relative pl-6 pb-4">
                      {/* Timeline dot */}
                      <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${categoryColor}`}></div>
                      
                      {/* Line connecting dots */}
                      {index < achievements.slice(0, 5).length - 1 && (
                        <div className="absolute left-1.5 top-4 -ml-px h-full w-0.5 bg-gray-300"></div>
                      )}
                      
                      <h4 className="text-base font-medium text-gray-900">{achievement.title}</h4>
                      <time className="text-xs text-gray-500">
                        {new Date(achievement.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}