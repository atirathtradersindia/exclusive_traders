const About = () => {
  return (
    <section id="about" className="py-20 bg-light text-dark">
      <div className="container mx-auto px-4">
        <div className="about-content flex flex-col md:flex-row items-center gap-12">
          <div className="about-text flex-1">
            <h2 className="text-3xl text-primary font-bold mb-6">About Exclusive Traders</h2>
            <p className="mb-4">
              Exclusive Traders is at the forefront of logistics innovation in the United Kingdom, specializing in next-generation import/export and warehousing solutions. With over 15 years of experience, we integrate AI, blockchain, and IoT to revolutionize supply chains.
            </p>
            <p className="mb-4">
              Our commitment to sustainability, transparency, and customer-centric innovation sets us apart. We build lasting partnerships by delivering measurable value and adapting to the evolving global trade landscape.
            </p>
            <p>
              Join us in shaping the future of international commerce.
            </p>
          </div>
          <div className="about-image flex-1 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Futuristic Warehouse" 
              className="w-full h-auto block transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;