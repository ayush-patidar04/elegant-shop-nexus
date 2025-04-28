
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ShoppingCart, Star, Truck, Heart } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { ProductVariant } from '@/types';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate loading state
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);
  
  const product = products.find((p) => p.id === id);
  
  const handleVariantChange = (variantId: string, option: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: option
    }));
  };
  
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    toast.success(isInWishlist 
      ? `${product?.name} removed from wishlist` 
      : `${product?.name} added to wishlist`
    );
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedVariants);
      toast.success(`${product.name} added to cart`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="py-8">
        <div className="container-custom">
          <div className="mb-8">
            <Skeleton className="h-10 w-40" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-8 w-1/4" />
              <div className="border-t border-b py-4 my-6">
                <Skeleton className="h-20 w-full" />
              </div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
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
          <div className="bg-white rounded-lg overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '500px' }}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={toggleWishlist}
              className="absolute top-4 right-4 bg-white shadow-sm"
            >
              <Heart size={20} className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
            </Button>
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
            
            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                {product.variants.map((variant: ProductVariant) => (
                  <div key={variant.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{variant.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <Button
                          key={option}
                          type="button"
                          variant={selectedVariants[variant.id] === option ? "default" : "outline"}
                          onClick={() => handleVariantChange(variant.id, option)}
                          className="px-4 py-2"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center w-32">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0 && val <= product.stock) {
                      setQuantity(val);
                    }
                  }}
                  className="w-14 text-center border-y border-input h-10"
                  min="1"
                  max={product.stock}
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
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
        
        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-semibold mb-6">Customer Reviews</h2>
          
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{review.userName}</h4>
                      <div className="flex text-amber-500">
                        {'★'.repeat(Math.floor(review.rating))}
                        {'☆'.repeat(5 - Math.floor(review.rating))}
                      </div>
                    </div>
                    <span className="text-sm text-shop-gray-600">{review.date}</span>
                  </div>
                  <p className="text-shop-gray-800 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-shop-gray-50 rounded-lg">
              <Star size={40} className="mx-auto text-shop-gray-300 mb-3" />
              <h3 className="text-xl font-medium mb-2">No Reviews Yet</h3>
              <p className="text-shop-gray-600">Be the first to review this product!</p>
            </div>
          )}
          
          {/* Add Review Button - In a real app, this would open a review form */}
          <div className="mt-8 text-center">
            <Button onClick={() => toast.success("Review functionality would be implemented with backend integration")}>
              Write a Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
