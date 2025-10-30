import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ navigateToPage, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Signed in successfully! Welcome back.');
      setFormData({
        email: '',
        password: ''
      });
      
      // Call the auth success callback if provided
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      
      // Redirect to home page after successful signin
      navigateToPage('home');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (e, page) => {
    e.preventDefault();
    navigateToPage(page);
  };

  return (
    <div className="auth-page py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="auth-form max-w-md mx-auto">
          <h2 className="text-3xl text-secondary text-center mb-8 text-shadow-neon">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-6">
              <label htmlFor="signin-email" className="block text-light font-medium mb-2">Email</label>
              <input
                type="email"
                id="signin-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-500 rounded-md text-base transition-colors duration-300 focus:border-secondary focus:outline-none bg-dark text-light"
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="signin-password" className="block text-light font-medium mb-2">Password</label>
              <input
                type="password"
                id="signin-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-500 rounded-md text-base transition-colors duration-300 focus:border-secondary focus:outline-none bg-dark text-light"
                required
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              className="btn w-full flex justify-center items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          <div className="auth-link text-center mt-4">
            <p className="text-light">
              Don't have an account?{' '}
              <a
                href="#"
                onClick={(e) => handleNavigation(e, 'signup')}
                className="text-secondary no-underline font-medium hover:text-secondary"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;