import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen bg-spacex bg-cover bg-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create a New Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-2 text-red-600 bg-red-100 border border-red-400 rounded">{error}</div>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="block w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <div className="text-sm text-center text-gray-600">
          Already have an account? <Link to="/" className="text-green-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
    <Footer/>

    </>

  );
};

export default Signup;
