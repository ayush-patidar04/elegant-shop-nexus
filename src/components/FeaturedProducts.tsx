
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductGrid from './ProductGrid';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  // Get the first 4 products for featured section
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-shop-gray-900">
            Featured Products
          </h2>
          <Button asChild variant="outline">
            <Link to="/products">View All</Link>
          </Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
