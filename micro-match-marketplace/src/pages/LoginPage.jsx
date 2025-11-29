// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure AuthContext is set up

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // grabs login function from context
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login (in real app, fetch from backend)
    const user = {
      name: 'Carlos',
      email,
      activeRole: 'Client', // or 'Contributor'
      needsOnboarding: true, // Simulate that user needs onboarding
    };

    login(user);          // Save user in context
    navigate(user.needsOnboarding ? '/onboarding' : '/dashboard'); // Redirect based on onboarding status
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 via-blue-800 to-cyan-800 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Sign in to your Micro-Match account
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-right text-sm mt-1">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
      <button
        onClick={() => navigate("/landing")}
        className="fixed bottom-6 left-6 flex items-center gap-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-gray-700 font-medium py-3 px-4 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home Page
      </button>
    </div>
  );
}