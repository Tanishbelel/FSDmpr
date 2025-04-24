import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function Research() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [authors, setAuthors] = useState('');
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const { data, error } = await supabase
        .from('research_papers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPapers(data);
    } catch (error) {
      toast.error('Error fetching research papers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('research_papers')
        .insert([{ title, abstract, authors }]);
      
      if (error) throw error;
      toast.success('Research paper added successfully!');
      setTitle('');
      setAbstract('');
      setAuthors('');
      fetchPapers();
    } catch (error) {
      toast.error('Error adding research paper');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Research Papers</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Abstract</label>
            <textarea
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              rows="6"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Authors</label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              placeholder="Separate authors with commas"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit Research Paper
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {papers.map((paper) => (
          <div key={paper.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{paper.title}</h3>
            <p className="text-gray-600 mt-2">{paper.abstract}</p>
            <p className="text-sm text-gray-500 mt-2">Authors: {paper.authors}</p>
          </div>
        ))}
      </div>
    </div>
  );
}