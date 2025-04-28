
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-shop-gray-100 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-shop-gray-900 mb-6">
              About ElegantShop
            </h1>
            <p className="text-xl text-shop-gray-800">
              We're on a mission to provide high-quality products with exceptional customer service.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=600" 
                alt="Our team at work" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-heading font-semibold text-shop-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-shop-gray-800">
                <p>
                  Founded in 2020, ElegantShop began as a small passion project with a simple idea: 
                  create an online shopping experience that prioritizes quality, transparency, and customer satisfaction.
                </p>
                <p>
                  What started as a small operation has grown into a trusted e-commerce destination, 
                  offering carefully curated products across multiple categories. Our team has expanded, 
                  but our commitment to quality remains unchanged.
                </p>
                <p>
                  Today, we continue to source the best products from around the world, 
                  working with ethical suppliers who share our values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-heading font-semibold text-shop-gray-900 mb-12 text-center">
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-shop-gray-100 p-6 rounded-lg text-center">
              <div className="text-shop-blue text-4xl mb-4">❖</div>
              <h3 className="text-xl font-medium mb-3">Quality</h3>
              <p className="text-shop-gray-800">
                We never compromise on quality. Every product in our store meets our strict standards.
              </p>
            </div>
            
            <div className="bg-shop-gray-100 p-6 rounded-lg text-center">
              <div className="text-shop-blue text-4xl mb-4">♡</div>
              <h3 className="text-xl font-medium mb-3">Customer Care</h3>
              <p className="text-shop-gray-800">
                We believe in exceptional service before, during, and after your purchase.
              </p>
            </div>
            
            <div className="bg-shop-gray-100 p-6 rounded-lg text-center">
              <div className="text-shop-blue text-4xl mb-4">♺</div>
              <h3 className="text-xl font-medium mb-3">Sustainability</h3>
              <p className="text-shop-gray-800">
                We're committed to reducing our environmental impact through responsible practices.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="py-16 bg-shop-blue">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-semibold text-white mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-white opacity-90 mb-8">
              Browse our collections and discover products that combine quality, style, and value.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
