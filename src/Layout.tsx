// src/Layout.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Brand.scss';
import logo from './assets/logo.png';


export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = (p: string) => (pathname === p ? 'active' : '');

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/">
            <img src= {logo} alt="TechSimple-TO" />
          </a>

          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">☰</button>

          <nav className={`nav-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
            <Link className={isActive('/')} to="/">Home</Link>
            <Link className={isActive('/services')} to="/services">Services</Link>
            <Link className={isActive('/about')} to="/about">About</Link>
            <Link className={isActive('/contact')} to="/contact">Contact</Link>
            <Link className={isActive('/quote')} to="/quote">Quote</Link>
            <Link className={isActive('/saved')} to="/saved">Saved</Link>
          </nav>
        </div>
      </header>

      <main className="page container">{children}</main>

      <footer className="site-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TechSimple-TO. All rights reserved.</p>
          <p>Contact: <a href="mailto:admin@techsimple-to.ca">admin@techsimple-to.ca</a></p>
        </div>
      </footer>
    </>
  );
}
