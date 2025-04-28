
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ShoppingCart, Star, Truck } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-heading font-semibold mb-4">
          Product Not Found
        </h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            asChild
            className="text-shop-gray-800 hover:text-shop-blue flex items-center gap-1"
          >
            <Link to="/products">
              <ChevronLeft size={16} />
              Back to Products
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-heading font-bold text-shop-gray-900">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-shop-gray-800">({product.rating})</span>
            </div>
            
            <div className="text-2xl font-semibold text-shop-blue">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="border-t border-b py-4 my-6">
              <p className="text-shop-gray-800">
                {product.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-green-700 bg-green-50 p-3 rounded-md">
              <Truck size={18} />
              <span>{product.stock > 0 ? 'In stock - Ready to ship' : 'Out of stock'}</span>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                size="lg"
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="space-y-4 pt-6">
              <h3 className="font-heading font-medium text-lg">Product Details</h3>
              <ul className="space-y-2 text-shop-gray-800">
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Stock:</strong> {product.stock} units</li>
                <li><strong>Shipping:</strong> Free shipping on orders over $50</li>
                <li><strong>Returns:</strong> 30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
