import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { authState,logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">SpaceX Missions</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:text-gray-300">Home</Link>
          </li>
          {authState.isAuthenticated ? (
            <>
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-300">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
