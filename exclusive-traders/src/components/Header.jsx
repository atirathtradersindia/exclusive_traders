// src/components/Header.jsx
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import { auth, db } from '../firebase';
import { updateProfile, updateEmail } from "firebase/auth";
import { ref, update } from "firebase/database";

const Header = ({
  navigateToPage,
  navigateToSection,
  currentPage,
  currentUser,
  onSignOut,
  isMobileMenuOpen,
  toggleMobileMenu
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const ticking = useRef(false);

  // CORRECT ORDER: Home → Services → About → Industries → Feedback → Contact
  const sections = ['hero', 'services', 'about', 'industries', 'quote-request', 'contact'];

  // INSTANT SCROLL DETECTION – INCLUDES FOOTER
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const headerHeight = 80;
        let current = 'hero';

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + scrollY - headerHeight;
            const height = el.offsetHeight;

            if (scrollY >= top && scrollY < top + height) {
              current = id;
              break;
            }
          }
        }

        // Force Contact when near bottom
        const distanceToBottom = document.body.scrollHeight - (scrollY + window.innerHeight);
        if (distanceToBottom < 150) {
          current = 'contact';
        }

        setActiveSection(current);
        ticking.current = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CLICK HANDLERS
  const handleSectionClick = (e, section) => {
    e.preventDefault();
    setActiveSection(section);
    navigateToSection(section);
    toggleMobileMenu(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setActiveSection('contact');
    if (currentPage !== 'home') {
      navigateToPage('home');
      setTimeout(() => scrollTo('contact'), 300);
    } else {
      scrollTo('contact');
    }
    toggleMobileMenu(false);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // ACTIVE STYLES
  const isActive = (section) =>
    activeSection === section
      ? 'text-secondary text-shadow-neon font-bold scale-105 transition-all duration-200'
      : 'text-light hover:text-secondary hover:text-shadow-neon transition-all duration-200';

  const getUserInitials = () => {
    if (currentUser?.displayName) {
      const names = currentUser.displayName.trim().split(' ');
      return names.length >= 2
        ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
        : currentUser.displayName.slice(0, 2).toUpperCase();
    }
    return currentUser?.email?.split('@')[0].slice(0, 2).toUpperCase() || 'US';
  };

  return (
    <header className="bg-primary/90 text-light py-4 sticky top-0 z-50 shadow-neon backdrop-blur-sm w-full">
      <div className="w-full flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain drop-shadow-neon" />
          <span className="text-3xl font-bold">
            Exclusive <span className="text-secondary text-shadow-neon">Traders</span>
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMobileMenu} className="md:hidden text-light">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav – CORRECT ORDER */}
        <nav className="hidden md:flex items-center pr-4">
          <ul className="flex gap-8 items-center">
            <li><a href="#" onClick={(e) => handleSectionClick(e, 'hero')} className={`font-medium ${isActive('hero')}`}>Home</a></li>
            <li><a href="#" onClick={(e) => handleSectionClick(e, 'services')} className={`font-medium ${isActive('services')}`}>Services</a></li>
            <li><a href="#" onClick={(e) => handleSectionClick(e, 'about')} className={`font-medium ${isActive('about')}`}>About</a></li>
            <li><a href="#" onClick={(e) => handleSectionClick(e, 'industries')} className={`font-medium ${isActive('industries')}`}>Industries</a></li>
            <li><a href="#" onClick={(e) => handleSectionClick(e, 'quote-request')} className={`font-medium ${isActive('quote-request')}`}>Feedback</a></li>
            <li><a href="#" onClick={handleContactClick} className={`font-medium ${isActive('contact')}`}>Contact</a></li>

            {currentUser ? (
              <li>
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-dark font-bold text-sm">
                  {getUserInitials()}
                </div>
              </li>
            ) : (
              <>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('signin'); }} className="font-medium hover:text-secondary">Sign In</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToPage('signup'); }} className="font-medium hover:text-secondary">Sign Up</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu – CORRECT ORDER */}
      <nav className={`md:hidden bg-primary/95 backdrop-blur-sm transition-all duration-300 w-full ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="flex flex-col items-center gap-4 py-4">
          <li><a href="#" onClick={(e) => handleSectionClick(e, 'hero')} className={`font-medium ${isActive('hero')}`}>Home</a></li>
          <li><a href="#" onClick={(e) => handleSectionClick(e, 'services')} className={`font-medium ${isActive('services')}`}>Services</a></li>
          <li><a href="#" onClick={(e) => handleSectionClick(e, 'about')} className={`font-medium ${isActive('about')}`}>About</a></li>
          <li><a href="#" onClick={(e) => handleSectionClick(e, 'industries')} className={`font-medium ${isActive('industries')}`}>Industries</a></li>
          <li><a href="#" onClick={(e) => handleSectionClick(e, 'quote-request')} className={`font-medium ${isActive('quote-request')}`}>Feedback</a></li>
          <li><a href="#" onClick={handleContactClick} className={`font-medium ${isActive('contact')}`}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;