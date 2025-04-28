
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategorySection = () => {
  return (
    <section className="py-12 bg-shop-gray-100">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-shop-gray-900 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="aspect-video bg-shop-gray-200 flex items-center justify-center">
                <div className="text-3xl text-shop-gray-800 group-hover:scale-110 transition-transform">
                  {category.id === 'electronics' && '🎧'}
                  {category.id === 'clothing' && '👕'}
                  {category.id === 'home' && '🏠'}
                  {category.id === 'books' && '📚'}
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-shop-gray-900">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
