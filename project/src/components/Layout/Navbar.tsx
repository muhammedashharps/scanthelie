import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Settings, History, Home, FileSearch } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Scan', path: '/scan', icon: <FileSearch size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const activeClass = 'bg-primary-100 text-primary-800';
  const inactiveClass = 'text-gray-700 hover:bg-gray-100';
  const baseClass = 'flex items-center px-4 py-2 rounded-md transition-colors duration-200 gap-2';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="bg-primary-500 text-white p-2 rounded-md">
              <FileSearch size={24} />
            </div>
            <span className="text-xl font-display font-semibold text-gray-900">
              Scan The Lie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-1 animate-fade-in">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
                onClick={closeMenu}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;