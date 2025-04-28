
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card animate-fade-in">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
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
