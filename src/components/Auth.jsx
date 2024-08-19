import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = ({ setSession }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (type) => {
    setLoading(true);
    const { error, data } =
      type === 'SIGNUP'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      setSession(data.session);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {loading ? 'Loading...' : 'Sign in or Sign up'}
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleLogin('SIGNUP')}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          >
            Sign Up
          </button>
          <button
            onClick={() => handleLogin('SIGNIN')}
            disabled={loading}
            className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-200 disabled:opacity-50"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
