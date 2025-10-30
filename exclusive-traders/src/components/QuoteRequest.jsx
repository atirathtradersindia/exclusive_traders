import { useState } from 'react';

const QuoteRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Validate all fields are filled
    if (!formData.name || !formData.industry || !formData.message) {
      alert('Please fill all fields.');
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('quote-' + Date.now(), JSON.stringify(formData));
    alert('Quote request submitted successfully! We will contact you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      industry: '',
      message: ''
    });
  };

  return (
    <section id="quote-request" className="py-20 bg-light text-dark">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-12">
          <h2 className="text-4xl text-primary mb-4">Feedback</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tell us your needs, and we'll craft a tailored solution.
          </p>
        </div>
        
        <form className="quote-form max-w-2xl mx-auto" onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label htmlFor="quote-name" className="block text-primary font-medium mb-2">Name</label>
            <input 
              type="text" 
              id="quote-name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:border-secondary focus:outline-none"
              required 
            />
          </div>
          
          <div className="form-group mb-6">
            <label htmlFor="quote-email" className="block text-primary font-medium mb-2">Email</label>
            <input 
              type="email" 
              id="quote-email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email" 
              className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:border-secondary focus:outline-none"
              required 
            />
          </div>
          
          <div className="form-group mb-6">
            <label htmlFor="quote-industry" className="block text-primary font-medium mb-2">Industry</label>
            <select 
              id="quote-industry" 
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:border-secondary focus:outline-none"
              required
            >
              <option value="">Select Industry</option>
              <option value="food">Food & Beverage</option>
              <option value="pharma">Pharmaceuticals</option>
              <option value="retail">Retail Goods</option>
              <option value="auto">Automotive</option>
              <option value="electronics">Electronics</option>
              <option value="industrial">Industrial Parts</option>
            </select>
          </div>
          
          <div className="form-group mb-6">
            <label htmlFor="quote-message" className="block text-primary font-medium mb-2">Requirements</label>
            <textarea 
              id="quote-message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your needs" 
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 focus:border-secondary focus:outline-none"
              required 
            ></textarea>
          </div>
          
          <button type="submit" className="btn w-full">Submit Feedback</button>
        </form>
      </div>
    </section>
  );
};

export default QuoteRequest;