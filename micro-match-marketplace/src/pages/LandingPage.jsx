// src/pages/LandingPage.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  
  const { user } = useAuth(); // or check localStorage/sessionStorage
  const navigate = useNavigate();

  const isAuthenticated = !!user; // true if user is logged in
  
    return (
    <div className="flex flex-col items-center w-full h-full bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="w-full text-center py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Connect Talent with <span className="text-blue-600">Opportunities</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Micro-Match Marketplace connects students, labs, and startups with skilled contributors.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-md font-medium flex items-center justify-center hover:bg-blue-700 transition"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(isAuthenticated ? '/projects' : '/login')}
            className="border border-gray-300 text-gray-800 px-6 py-3 rounded-xl text-md font-medium hover:bg-gray-100 transition"
          >
            Browse Projects
          </button>
        </div>
      </section>

      {/* Why Choose Micro-Match */}
      <section className="w-full max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Why Choose Micro-Match?
        </h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Our platform makes it easy to find the right talent
          for your projects and showcase your skills to
          potential clients.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border rounded-2xl shadow-sm">
            <div className="text-3xl mb-4">📂</div>
            <h3 className="text-xl font-semibold mb-2">
              Diverse Projects
            </h3>
            <p className="text-sm text-gray-600">
              From short-term tasks to long-term collaborations,
              find projects that match your skills and
              interests.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-2xl shadow-sm">
            <div className="text-3xl mb-4">👨‍💻</div>
            <h3 className="text-xl font-semibold mb-2">
              Skilled Contributors
            </h3>
            <p className="text-sm text-gray-600">
              Connect with verified contributors who have the
              expertise you need for your projects.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-2xl shadow-sm">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">
              Seamless Communication
            </h3>
            <p className="text-sm text-gray-600">
              Built-in messaging and milestone tracking keep
              your projects organized and on track.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white w-full px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 max-w-5xl mx-auto">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">
              For Clients
            </h3>
            <ul className="text-gray-700 text-sm space-y-3">
              <li>
                <span className="font-bold text-blue-600">1.</span>{' '}
                Post Your Project – Describe your project, set
                budget and timeline, specify required skills.
              </li>
              <li>
                <span className="font-bold text-blue-600">2.</span>{' '}
                Review Bids – Compare proposals from qualified
                contributors and choose the best fit.
              </li>
              <li>
                <span className="font-bold text-blue-600">3.</span>{' '}
                Collaborate & Deliver – Work through milestones
                and deliver exceptional results.
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">
              For Contributors
            </h3>
            <ul className="text-gray-700 text-sm space-y-3">
              <li>
                <span className="font-bold text-green-600">1.</span>{' '}
                Browse Projects – Find projects that match your
                skills and interests.
              </li>
              <li>
                <span className="font-bold text-green-600">2.</span>{' '}
                Submit Your Bid – Propose your approach,
                timeline, and pricing for the project.
              </li>
              <li>
                <span className="font-bold text-green-600">3.</span>{' '}
                Deliver Excellence – Complete milestones and
                build your reputation with quality work.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full px-6 py-16 text-center bg-gray-50">
        <div className="flex flex-wrap justify-center gap-12 text-xl font-semibold text-gray-800">
          <div>
            <p className="text-3xl text-blue-600 font-bold">500+</p>
            Active Projects
          </div>
          <div>
            <p className="text-3xl text-blue-600 font-bold">1,200+</p>
            Contributors
          </div>
          <div>
            <p className="text-3xl text-blue-600 font-bold">300+</p>
            Clients
          </div>
          <div>
            <p className="text-3xl text-blue-600 font-bold">4.8</p>
            Average Rating
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-blue-600 text-white py-16 text-center px-6 rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Join thousands of contributors and clients already collaborating on Micro-Match.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl text-md font-medium hover:bg-gray-100 transition"
          >
            Sign Up Now
          </button>
          <button
            onClick={() => navigate(isAuthenticated ? '/projects' : '/login')}
            className="border border-white px-6 py-3 rounded-xl text-md font-medium hover:bg-white hover:text-blue-600 transition"
          >
            Browse Projects
          </button>
        </div>
      </section>
    </div>
  );
}
