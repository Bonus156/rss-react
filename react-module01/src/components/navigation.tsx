import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function HomeTitle() {
  return <span>Home</span>;
}

export function AboutTitle() {
  return <span>About Us</span>;
}
export function NotFoundTitle() {
  return <span>Error 404. Page Not Found</span>;
}
export function FormTitle() {
  return <span>Form</span>;
}

export function Navigation() {
  return (
    <nav className="h-16 flex justify-between items-center px-5 bg-gray-500 text-white">
      <span className="font-bold">React Components</span>
      <Outlet />
      <span className="flex gap-2">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'text-blue-300' : '')}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-blue-300' : '')}>
          About Us
        </NavLink>
        <NavLink to="/form" className={({ isActive }) => (isActive ? 'text-blue-300' : '')}>
          Forms
        </NavLink>
      </span>
    </nav>
  );
}
