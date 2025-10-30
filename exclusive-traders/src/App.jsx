// src/App.jsx
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Industries from './components/Industries';
import Innovation from './components/Innovation';
import QuoteRequest from './components/QuoteRequest';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import useAnimation from './hooks/useAnimation';
import Products from './components/Products';
import AllProductsPage from './components/AllProductsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentIndustry, setCurrentIndustry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState(''); // 'addToCart' or 'orderNow'
  const [showSignOutSuccess, setShowSignOutSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showInnovationPage, setShowInnovationPage] = useState(false);

  useAnimation();

  // -----------------------------------------------------------------
  // Mobile menu / sidebar toggle (only one open at a time)
  // -----------------------------------------------------------------
  const toggleMobileElement = (element) => {
    if (element === 'menu') {
      setIsMobileMenuOpen((prev) => !prev);
      if (isSidebarOpen) setIsSidebarOpen(false);
    } else if (element === 'sidebar') {
      setIsSidebarOpen((prev) => !prev);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      if (!isSidebarOpen) {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    }
  };

  // -----------------------------------------------------------------
  // Auth state listener
  // -----------------------------------------------------------------
  useEffect(() => {
    setIsMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
      }
    });

    // hash-based routing
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
      if (hash !== 'innovation') {
        setShowInnovationPage(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    const hash = window.location.hash.replace('#', '') || 'home';
    setCurrentPage(hash);

    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // -----------------------------------------------------------------
  // Reset search when leaving product pages
  // -----------------------------------------------------------------
  useEffect(() => {
    if (currentPage !== 'products' && currentPage !== 'all-products') {
      setSearchTerm('');
      setIsMobileMenuOpen(false);
      setIsSidebarOpen(false);
    }
  }, [currentPage]);

  // -----------------------------------------------------------------
  // Navigation helpers
  // -----------------------------------------------------------------
  const navigateToPage = (page) => {
    setCurrentPage(page);
    if (page !== 'innovation') {
      setShowInnovationPage(false);
    }
    window.history.pushState({}, '', `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsSidebarOpen(false);
  };

  const navigateToSection = (sectionId) => {
    setCurrentPage('home');
    setShowInnovationPage(false);
    window.history.pushState({}, '', '#home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If section doesn't exist, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
    setIsMobileMenuOpen(false);
    setIsSidebarOpen(false);
  };

  const showInnovation = () => {
    setCurrentPage('innovation');
    setShowInnovationPage(true);
    window.history.pushState({}, '', '#innovation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setIsSidebarOpen(false);
  };

  const showIndustryProducts = (industry) => {
    setCurrentIndustry(industry);
    setCurrentPage('products');
    setShowInnovationPage(false);
    setSearchTerm('');
    window.history.pushState({}, '', '#products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const showAllProducts = () => {
    setCurrentPage('all-products');
    setShowInnovationPage(false);
    setSearchTerm('');
    window.history.pushState({}, '', '#all-products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const goBackToAllProducts = () => {
    setCurrentPage('all-products');
    setShowInnovationPage(false);
    setSearchTerm('');
    window.history.pushState({}, '', '#all-products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  const goBackToIndustries = () => {
    setCurrentPage('home');
    setShowInnovationPage(false);
    setSearchTerm('');
    window.history.pushState({}, '', '#home');
    setTimeout(() => navigateToSection('industries'), 100);
    setIsMobileMenuOpen(false);
    setIsSidebarOpen(false);
  };

  const handleSearchChange = (term) => setSearchTerm(term);

  // -----------------------------------------------------------------
  // Sign-out
  // -----------------------------------------------------------------
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setShowSignOutSuccess(true);
      setTimeout(() => setShowSignOutSuccess(false), 3000);
      navigateToPage('signin');
    } catch (err) {
      console.error('Sign-out error:', err);
      alert('Error signing out. Please try again.');
    }
  };

  // -----------------------------------------------------------------
  // Auth-required actions (cart / order)
  // -----------------------------------------------------------------
  const handleAuthRequired = (action) => {
    if (!currentUser) {
      setAuthAction(action);
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (authAction === 'addToCart') alert('Product added to cart successfully!');
    else if (authAction === 'orderNow') alert('Order placed successfully!');
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setAuthAction('');
  };

  const closeSignOutSuccess = () => setShowSignOutSuccess(false);

  // -----------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-secondary text-2xl font-inter">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App font-inter">
      {/* Header */}
      <Header
        navigateToPage={navigateToPage}
        navigateToSection={navigateToSection}
        currentPage={currentPage}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={() => toggleMobileElement('menu')}
      />

      {/* Main content */}
      <main>
        {currentPage === 'home' && !showInnovationPage && (
          <>
            <Hero navigateToSection={navigateToSection} showInnovation={showInnovation} />
            <Services />
            <About />
            <Industries
              showIndustryProducts={showIndustryProducts}
              currentUser={currentUser}
              onViewAllProducts={showAllProducts}
            />
            <QuoteRequest />
          </>
        )}

        {(currentPage === 'innovation' || showInnovationPage) && (
          <Innovation onBackToHome={() => navigateToPage('home')} />
        )}

        {currentPage === 'products' && (
          <Products
            industry={currentIndustry}
            goBackToProducts={goBackToAllProducts}
            searchTerm={searchTerm}
            currentUser={currentUser}
            onAuthRequired={handleAuthRequired}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => toggleMobileElement('sidebar')}
          />
        )}

        {currentPage === 'all-products' && (
          <AllProductsPage
            showIndustryProducts={showIndustryProducts}
            currentUser={currentUser}
            onBackToIndustries={goBackToIndustries}
          />
        )}

        {currentPage === 'signin' && (
          <SignIn navigateToPage={navigateToPage} onAuthSuccess={handleAuthSuccess} />
        )}

        {currentPage === 'signup' && (
          <SignUp navigateToPage={navigateToPage} onAuthSuccess={handleAuthSuccess} />
        )}
      </main>

      <Footer navigateToSection={navigateToSection} />

      {/* Auth modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-dark border border-secondary rounded-lg p-6 max-w-md w-full mx-auto">
            <div className="text-center">
              <h3 className="text-2xl text-secondary mb-4 text-shadow-neon font-inter">
                Authentication Required
              </h3>
              <p className="text-light mb-6 font-inter">
                Please sign in or create an account to{' '}
                {authAction === 'addToCart' ? 'add items to your cart' : 'place an order'}.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    closeAuthModal();
                    navigateToPage('signin');
                  }}
                  className="btn bg-secondary text-dark hover:bg-accent hover:text-dark py-3 text-lg font-inter font-semibold"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    closeAuthModal();
                    navigateToPage('signup');
                  }}
                  className="btn bg-accent text-dark hover:bg-secondary hover:text-dark py-3 text-lg font-inter font-semibold"
                >
                  Create Account
                </button>
                <button
                  onClick={closeAuthModal}
                  className="btn bg-gray-500 text-light hover:bg-gray-600 py-3 text-lg font-inter font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign-out success toast */}
      {showSignOutSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm border border-secondary rounded-lg p-4 shadow-neon max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-check text-dark text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-light font-inter">Signed Out Successfully!</p>
                <p className="text-gray-100 text-sm opacity-90 font-inter">
                  You have been logged out of your account.
                </p>
              </div>
              <button
                onClick={closeSignOutSuccess}
                className="text-light hover:text-secondary transition-colors flex-shrink-0"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;