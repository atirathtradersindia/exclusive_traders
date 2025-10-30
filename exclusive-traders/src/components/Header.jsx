import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { auth, db } from '../firebase';
import { updateProfile, updateEmail } from "firebase/auth";
import { ref, update } from "firebase/database";

const Header = ({ navigateToPage, navigateToSection, currentPage, searchTerm, onSearchChange, currentUser, onSignOut, isMobileMenuOpen, toggleMobileMenu }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'about', 'industries', 'quote-request', 'cta'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
      if (showProfileModal && !event.target.closest('.profile-modal')) {
        setShowProfileModal(false);
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen, showProfileModal]);

  // Initialize edit form when modal opens or user changes
  useEffect(() => {
    if (currentUser) {
      setEditForm({
        name: currentUser.displayName || '',
        email: currentUser.email || ''
      });
    }
  }, [currentUser, showProfileModal]);

  const isActive = (section) => {
    return activeSection === section ? 'text-secondary text-shadow-neon' : 'text-light';
  };

  const handleNavigation = (e, page) => {
    e.preventDefault();
    navigateToPage(page);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleSectionNavigation = (e, section) => {
    e.preventDefault();
    navigateToSection(section);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    
    // Navigate to home page first if we're not already there
    if (currentPage !== 'home') {
      navigateToPage('home');
    }
    
    // Wait for page transition then scroll to contact
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        console.warn('Contact section not found');
        // Fallback: scroll to bottom of page
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 300);
    
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsMobileMenuOpen(false); // Close mobile menu if profile dropdown is toggled
  };

  const handleSignOutClick = (e) => {
    e.preventDefault();
    if (onSignOut) {
      onSignOut();
    }
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setShowProfileModal(false);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    setShowProfileModal(true);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsEditing(false);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form to original values
    setEditForm({
      name: currentUser?.displayName || '',
      email: currentUser?.email || ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    setIsSaving(true);
    try {
      // Update profile in Firebase Auth
      if (editForm.name !== currentUser.displayName) {
        await updateProfile(currentUser, {
          displayName: editForm.name.trim()
        });
      }

      // Update email if changed (requires reauthentication in production)
      if (editForm.email !== currentUser.email) {
        await updateEmail(currentUser, editForm.email.trim());
      }

      // Update user data in Realtime Database
      await update(ref(db, 'users/' + currentUser.uid), {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        updatedAt: new Date().toISOString()
      });

      alert('Profile updated successfully!');
      setIsEditing(false);
      
      // Refresh the page to get updated user data
      window.location.reload();
      
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.code === 'auth/requires-recent-login') {
        alert('For security, please sign in again to change your email.');
        onSignOut();
      } else {
        alert('Error updating profile: ' + error.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Get user initials from displayName (first 2 letters of first and last name)
  const getUserInitials = () => {
    if (currentUser?.displayName) {
      const names = currentUser.displayName.trim().split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      } else {
        return currentUser.displayName.slice(0, 2).toUpperCase();
      }
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0].slice(0, 2).toUpperCase();
    }
    return 'US';
  };

  // Get user full name for display in dropdown
  const getUserFullName = () => {
    return currentUser?.displayName || 'User';
  };

  // Get user email
  const getUserEmail = () => {
    return currentUser?.email || '';
  };

  // Get account creation date (if available)
  const getAccountCreationDate = () => {
    if (currentUser?.metadata?.creationTime) {
      return new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Unknown';
  };

  return (
    <header className="bg-primary/90 text-light py-4 sticky top-0 z-50 shadow-neon backdrop-blur-sm w-full">
      <div className="w-full flex justify-between items-center">
        <div className="logo flex items-center gap-4 pl-4">
          <img
            src={logo}
            alt="Exclusive Traders Logo"
            className="h-12 w-auto object-contain filter drop-shadow-neon"
          />
          <span className="logo-text text-3xl font-bold">
            Exclusive <span className="text-secondary text-shadow-neon">Traders</span>
          </span>
        </div>

        <div className="flex items-center gap-2 pr-4">
          {/* Profile Section for Mobile View */}
          <div className="md:hidden flex items-center">
            {currentUser ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors duration-300 border border-gray-500"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-dark font-bold text-sm">
                    {getUserInitials()}
                  </div>
                  <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-12 mt-2 w-64 bg-dark border border-secondary rounded-lg shadow-neon backdrop-blur-sm z-50">
                    <div className="p-4 border-b border-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-dark font-bold text-lg">
                          {getUserInitials()}
                        </div>
                        <div>
                          <p className="font-semibold text-light">{getUserFullName()}</p>
                          <p className="text-gray-100 text-sm">{getUserEmail()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <a
                        href="#"
                        onClick={handleProfileClick}
                        className="flex items-center gap-3 px-3 py-2 text-light no-underline rounded-md hover:bg-white/10 transition-colors duration-300"
                      >
                        <i className="fas fa-user-circle text-secondary w-5"></i>
                        <span>My Account</span>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setIsProfileDropdownOpen(false); alert('My Orders page coming soon!'); }}
                        className="flex items-center gap-3 px-3 py-2 text-light no-underline rounded-md hover:bg-white/10 transition-colors duration-300"
                      >
                        <i className="fas fa-shopping-bag text-secondary w-5"></i>
                        <span>My Orders</span>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setIsProfileDropdownOpen(false); alert('Settings page coming soon!'); }}
                        className="flex items-center gap-3 px-3 py-2 text-light no-underline rounded-md hover:bg-white/10 transition-colors duration-300"
                      >
                        <i className="fas fa-cog text-secondary w-5"></i>
                        <span>Settings</span>
                      </a>
                    </div>
                    
                    <div className="p-2 border-t border-gray-500">
                      <button
                        onClick={handleSignOutClick}
                        className="w-full flex items-center gap-3 px-3 py-2 text-light rounded-md hover:bg-red-500/20 hover:text-red-300 transition-colors duration-300 text-left"
                      >
                        <i className="fas fa-sign-out-alt text-red-400 w-5"></i>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <a
                  href="#"
                  onClick={(e) => handleNavigation(e, 'signin')}
                  className="text-light text-sm no-underline hover:text-secondary transition-colors duration-300"
                >
                  Sign In
                </a>
                <span className="text-light">/</span>
                <a
                  href="#"
                  onClick={(e) => handleNavigation(e, 'signup')}
                  className="text-light text-sm no-underline hover:text-secondary transition-colors duration-300"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-light focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block pr-4">
          <ul className="flex gap-8 list-none items-center">
            <li>
              <a
                href="#"
                onClick={(e) => handleSectionNavigation(e, 'hero')}
                className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('hero')}`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => handleSectionNavigation(e, 'services')}
                className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('services')}`}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => handleSectionNavigation(e, 'industries')}
                className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('industries')}`}
              >
                Industries
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => handleSectionNavigation(e, 'about')}
                className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('about')}`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => handleSectionNavigation(e, 'quote-request')}
                className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('quote-request')}`}
              >
                Feedback
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handleContactClick}
                className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon text-light`}
              >
                Contact
              </a>
            </li>
            {currentUser ? (
              <li className="relative profile-dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors duration-300 border border-gray-500"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-dark font-bold text-sm">
                    {getUserInitials()}
                  </div>
                  <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>
                
                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-12 mt-2 w-64 bg-dark border border-secondary rounded-lg shadow-neon backdrop-blur-sm z-50">
                    <div className="p-4 border-b border-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-dark font-bold text-lg">
                          {getUserInitials()}
                        </div>
                        <div>
                          <p className="font-semibold text-light">{getUserFullName()}</p>
                          <p className="text-gray-100 text-sm">{getUserEmail()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <a
                        href="#"
                        onClick={handleProfileClick}
                        className="flex items-center gap-3 px-3 py-2 text-light no-underline rounded-md hover:bg-white/10 transition-colors duration-300"
                      >
                        <i className="fas fa-user-circle text-secondary w-5"></i>
                        <span>My Account</span>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setIsProfileDropdownOpen(false); alert('My Orders page coming soon!'); }}
                        className="flex items-center gap-3 px-3 py-2 text-light no-underline rounded-md hover:bg-white/10 transition-colors duration-300"
                      >
                        <i className="fas fa-shopping-bag text-secondary w-5"></i>
                        <span>My Orders</span>
                      </a>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); setIsProfileDropdownOpen(false); alert('Settings page coming soon!'); }}
                        className="flex items-center gap-3 px-3 py-2 text-light no-underline rounded-md hover:bg-white/10 transition-colors duration-300"
                      >
                        <i className="fas fa-cog text-secondary w-5"></i>
                        <span>Settings</span>
                      </a>
                    </div>
                    
                    <div className="p-2 border-t border-gray-500">
                      <button
                        onClick={handleSignOutClick}
                        className="w-full flex items-center gap-3 px-3 py-2 text-light rounded-md hover:bg-red-500/20 hover:text-red-300 transition-colors duration-300 text-left"
                      >
                        <i className="fas fa-sign-out-alt text-red-400 w-5"></i>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNavigation(e, 'signin')}
                    className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon text-light`}
                  >
                    Sign In
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNavigation(e, 'signup')}
                    className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon text-light`}
                  >
                    Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Search Bar - Only show on products page */}
      {currentPage === 'products' && (
        <div className="md:hidden px-4 mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/10 border border-gray/20 rounded-full py-2 px-4 pl-10 text-light placeholder-gray focus:outline-none focus:border-accent transition-colors"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray"></i>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <nav
        className={`mobile-menu md:hidden bg-primary/95 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out w-full ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4 px-0">
          <li>
            <a
              href="#"
              onClick={(e) => handleSectionNavigation(e, 'hero')}
              className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('hero')}`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => handleSectionNavigation(e, 'services')}
              className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('services')}`}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => handleSectionNavigation(e, 'industries')}
              className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('industries')}`}
            >
              Industries
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => handleSectionNavigation(e, 'about')}
              className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('about')}`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => handleSectionNavigation(e, 'quote-request')}
              className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon ${isActive('quote-request')}`}
            >
              Feedback
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={handleContactClick}
              className={`no-underline font-medium transition-colors duration-300 hover:text-secondary hover:text-shadow-neon text-light`}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Profile Modal - Positioned in top-right corner below header */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Modal positioned in top-right corner */}
          <div className="profile-modal absolute top-20 right-4 w-80 bg-dark border border-secondary rounded-lg shadow-neon backdrop-blur-sm animate-slide-in-right">
            <div className="p-4">
              {/* Header with Edit Button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl text-secondary text-shadow-neon">My Account</h3>
                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <button
                      onClick={handleEditClick}
                      className="text-light hover:text-secondary transition-colors flex items-center gap-1"
                      title="Edit Profile"
                    >
                      <i className="fas fa-edit text-sm"></i>
                      <span className="text-sm">Edit</span>
                    </button>
                  )}
                  <button
                    onClick={closeProfileModal}
                    className="text-light hover:text-secondary transition-colors"
                  >
                    <i className="fas fa-times text-lg"></i>
                  </button>
                </div>
              </div>
              
              {/* Profile Content */}
              <div className="space-y-4">
                {/* Profile Picture and Basic Info */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-dark font-bold text-lg">
                    {getUserInitials()}
                  </div>
                  <div>
                    <p className="font-semibold text-light">{getUserFullName()}</p>
                    <p className="text-gray-100 text-sm">{getUserEmail()}</p>
                  </div>
                </div>
                
                {/* Account Details */}
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-light font-semibold mb-2 flex items-center gap-2">
                      <i className="fas fa-info-circle text-secondary"></i>
                      Account Information
                    </h4>
                    
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-gray-100 text-sm block mb-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={editForm.name}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-dark border border-gray-500 rounded text-light text-sm focus:border-secondary focus:outline-none"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="text-gray-100 text-sm block mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={editForm.email}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-dark border border-gray-500 rounded text-light text-sm focus:border-secondary focus:outline-none"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={handleCancelEdit}
                            className="btn bg-gray-500 text-light hover:bg-gray-600 flex-1 text-sm py-2"
                            disabled={isSaving}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            className="btn bg-secondary text-dark hover:bg-accent flex-1 text-sm py-2 flex items-center justify-center gap-2"
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <>
                                <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                              </>
                            ) : (
                              'Save'
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-100">Full Name:</span>
                          <span className="text-light">{getUserFullName()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Email:</span>
                          <span className="text-light">{getUserEmail()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-100">Member Since:</span>
                          <span className="text-light">{getAccountCreationDate()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!isEditing && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="text-light font-semibold mb-2 flex items-center gap-2">
                        <i className="fas fa-shield-alt text-secondary"></i>
                        Account Status
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-100">Status:</span>
                        <span className="text-secondary font-medium flex items-center gap-1">
                          <i className="fas fa-check-circle"></i>
                          Verified
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                {!isEditing && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={closeProfileModal}
                      className="btn bg-gray-500 text-light hover:bg-gray-600 flex-1 text-sm py-2"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleSignOutClick}
                      className="btn bg-red-500 text-light hover:bg-red-600 flex-1 text-sm py-2"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;