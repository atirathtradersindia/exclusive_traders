import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { ref, set } from "firebase/database";

const SignUp = ({ navigateToPage, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!formData.name) {
      alert('Please enter your name.');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Update user profile with the full name from form
      await updateProfile(userCredential.user, {
        displayName: formData.name.trim() // Store the full name
      });

      // Save additional user data to Firebase with the full name
      await set(ref(db, 'users/' + userCredential.user.uid), { 
        name: formData.name.trim(), // Store the full name
        email: formData.email,
        createdAt: new Date().toISOString()
      });

      // Sign out the user immediately after signup
      await signOut(auth);

      alert('Account created successfully! Please sign in to continue.');
      
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Call the auth success callback if provided
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      
      // Redirect to signin page after successful signup
      navigateToPage('signin');
      
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
          <h2 className="text-3xl text-secondary text-center mb-8 text-shadow-neon">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-6">
              <label htmlFor="signup-name" className="block text-light font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="signup-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-500 rounded-md text-base transition-colors duration-300 focus:border-secondary focus:outline-none bg-dark text-light"
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="signup-email" className="block text-light font-medium mb-2">Email</label>
              <input
                type="email"
                id="signup-email"
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
              <label htmlFor="signup-password" className="block text-light font-medium mb-2">Password</label>
              <input
                type="password"
                id="signup-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min. 6 characters)"
                className="w-full p-3 border border-gray-500 rounded-md text-base transition-colors duration-300 focus:border-secondary focus:outline-none bg-dark text-light"
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="signup-confirm-password" className="block text-light font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                id="signup-confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          <div className="auth-link text-center mt-4">
            <p className="text-light">
              Already have an account?{' '}
              <a
                href="#"
                onClick={(e) => handleNavigation(e, 'signin')}
                className="text-secondary no-underline font-medium hover:text-secondary"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;