
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, User, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading font-bold text-2xl text-shop-gray-900">
            ElegantShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-shop-gray-800 hover:text-shop-blue transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-shop-gray-800 hover:text-shop-blue transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-shop-gray-800 hover:text-shop-blue transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-shop-gray-800 hover:text-shop-blue transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-shop-gray-800 hover:text-shop-blue">
              <Search size={20} />
            </Button>
            
            <Link to="/account" className="text-shop-gray-800 hover:text-shop-blue">
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </Link>
            
            <Link to="/cart" className="text-shop-gray-800 hover:text-shop-blue relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-shop-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-shop-gray-800" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3">
            <Link 
              to="/" 
              className="block px-4 py-2 text-shop-gray-800 hover:bg-shop-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block px-4 py-2 text-shop-gray-800 hover:bg-shop-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="block px-4 py-2 text-shop-gray-800 hover:bg-shop-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-4 py-2 text-shop-gray-800 hover:bg-shop-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
