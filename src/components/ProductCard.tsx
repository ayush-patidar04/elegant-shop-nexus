
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isInWishlist, setIsInWishlist] = useState(product.isInWishlist || false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInWishlist(!isInWishlist);
    
    if (!isInWishlist) {
      toast.success(`${product.name} added to wishlist`);
    } else {
      toast.success(`${product.name} removed from wishlist`);
    }
    
    // Note: In a real app, this would call an API to update the user's wishlist
  };

  return (
    <div className="product-card animate-fade-in bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
          <Button 
            size="icon" 
            variant="ghost"
            onClick={toggleWishlist}
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-red-500"
          >
            <Heart size={18} className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-shop-gray-900 line-clamp-1">{product.name}</h3>
            <div className="text-sm font-semibold text-shop-blue">
              ${product.price.toFixed(2)}
            </div>
          </div>
          <div className="mb-3 text-sm text-shop-gray-800 line-clamp-2">
            {product.description}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-amber-500">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="ml-1 text-xs text-shop-gray-800">({product.rating})</span>
            </div>
            <Button 
              size="sm"
              onClick={handleAddToCart} 
              className="flex items-center gap-1"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
