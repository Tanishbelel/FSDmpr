import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 font-sans">
      {/* Navigation - Keeping only one navbar */}
      {/*  */}

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Create. Connect. Glow Up.
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-12 text-gray-600">
            The platform where creativity meets community. Build your digital presence with our next-gen tools.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/login"><button className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 font-bold text-lg transition-all shadow-lg">
              Get Started
            </button></a>
            <button className="px-8 py-4 rounded-full bg-transparent border-2 border-purple-300 text-purple-600 hover:bg-purple-100 font-bold text-lg transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white/60 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Express Yourself
          </h2>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 hover:bg-purple-50 transition-all shadow-lg">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-lg text-white">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Digital Identity</h3>
              <p className="text-gray-600">Create your unique digital presence with customizable profiles and content that represents the real you.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 hover:bg-purple-50 transition-all shadow-lg">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg text-white">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Creative Tools</h3>
              <p className="text-gray-600">Access next-level design tools that help you express your ideas in ways you never thought possible.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 hover:bg-purple-50 transition-all shadow-lg">
              <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg text-white">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Community Vibes</h3>
              <p className="text-gray-600">Connect with like-minded creators in a space that celebrates authenticity and collaborative energy.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          How It Works
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start mb-16">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mr-8">
              01
            </div>
            <div className="mt-4 md:mt-0">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Create Your Profile</h3>
              <p className="text-gray-600">Set up your digital identity with our intuitive tools. Express yourself through customizable themes, avatars, and multimedia content.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start mb-16">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mr-8">
              02
            </div>
            <div className="mt-4 md:mt-0">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Connect With Others</h3>
              <p className="text-gray-600">Join communities that match your interests or create your own. Our AI matching system helps you find like-minded creators.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start">
            <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mr-8">
              03
            </div>
            <div className="mt-4 md:mt-0">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Build Your Presence</h3>
              <p className="text-gray-600">Use our next-gen tools to create content that stands out. From interactive media to immersive experiences.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="bg-gradient-to-br from-purple-100/50 to-blue-100/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            The Community is Talking
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl hover:bg-purple-50 transition-all shadow-lg">
              <p className="mb-6 text-lg text-gray-700">"This platform completely changed how I express myself online. The aesthetic is immaculate and the tools are so intuitive!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-500"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Alex Kim</h4>
                  <p className="text-sm text-gray-600">Digital Artist</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl hover:bg-purple-50 transition-all shadow-lg">
              <p className="mb-6 text-lg text-gray-700">"No cap, the community here is unmatched. I've connected with so many amazing creators who inspire me daily."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Jordan Rey</h4>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl hover:bg-purple-50 transition-all shadow-lg">
              <p className="mb-6 text-lg text-gray-700">"The aesthetic is everything! I've never seen a platform that understands the vibe so well. It's giving main character energy."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">Taylor Quinn</h4>
                  <p className="text-sm text-gray-600">Trend Forecaster</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Ready to Level Up Your Digital Presence?
          </h2>
          <p className="text-xl mb-12 text-gray-600">
            Join thousands of creators who are redefining self-expression in the digital age.
          </p>
          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 font-bold text-lg transition-all shadow-xl">
            Join The Movement
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                NEON.WAVE
              </div>
              <p className="max-w-xs text-gray-600">
                Redefining digital expression for the next generation of creators.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Twitter</a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Discord</a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">TikTok</a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4 text-gray-800">Platform</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Roadmap</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-gray-800">Resources</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Tutorials</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-gray-800">Company</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-purple-600 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>© 2025 NEON.WAVE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}