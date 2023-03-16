import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="h-16 flex justify-between items-center px-5 bg-gray-500 text-white">
      <span className="font-bold">React Components</span>
      <span className="flex gap-2">
        <Link to="/">Cards</Link>
        <Link to="/about">About Us</Link>
      </span>
    </nav>
  );
}
