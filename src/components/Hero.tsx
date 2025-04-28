
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-shop-gray-100 to-white py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-shop-gray-900">
              Discover Quality Products for Your Lifestyle
            </h1>
            <p className="text-lg text-shop-gray-800">
              Explore our curated collection of premium products designed to enhance your everyday experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1024" 
              alt="Shopping Experience" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
