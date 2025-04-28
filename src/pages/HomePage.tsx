
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategorySection from '@/components/CategorySection';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      
      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-shop-gray-900 mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-shop-gray-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-500">★★★★★</div>
                <span className="ml-2 text-shop-gray-800">5.0</span>
              </div>
              <p className="text-shop-gray-800 mb-4">
                "The quality of the products exceeded my expectations. Fast shipping and excellent customer service."
              </p>
              <div className="font-medium">- Sarah J.</div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-shop-gray-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-500">★★★★★</div>
                <span className="ml-2 text-shop-gray-800">5.0</span>
              </div>
              <p className="text-shop-gray-800 mb-4">
                "I've been a repeat customer for years. Their attention to detail and product quality is unmatched."
              </p>
              <div className="font-medium">- Michael T.</div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-shop-gray-100 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-amber-500">★★★★★</div>
                <span className="ml-2 text-shop-gray-800">5.0</span>
              </div>
              <p className="text-shop-gray-800 mb-4">
                "Easy checkout process and quick delivery. Will definitely shop here again!"
              </p>
              <div className="font-medium">- Emily R.</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-shop-blue">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-white opacity-90 mb-6">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-shop-blue px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
