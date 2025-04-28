
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import { products, categories } from '@/data/products';
import { Product } from '@/types';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Extract any category filter from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategoryFilters([categoryParam]);
    }
  }, [searchParams]);

  // Filter products based on criteria
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by price
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by category
    if (categoryFilters.length > 0) {
      filtered = filtered.filter((product) => categoryFilters.includes(product.category));
    }
    
    setFilteredProducts(filtered);
  }, [priceRange, categoryFilters]);

  const handleCategoryChange = (categoryId: string) => {
    setCategoryFilters((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setCategoryFilters([]);
    setSearchParams({});
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-heading font-bold text-shop-gray-900 mb-8">
          All Products
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4">
            <Button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              variant="outline"
              className="w-full flex justify-between items-center"
            >
              <span className="flex items-center gap-2">
                <Filter size={18} />
                Filters
              </span>
              {isMobileFilterOpen ? <X size={18} /> : null}
            </Button>
          </div>
          
          {/* Sidebar Filters */}
          <aside className={`${
            isMobileFilterOpen || window.innerWidth >= 1024 ? 'block' : 'hidden'
          } lg:block lg:w-64 flex-shrink-0 bg-white p-6 rounded-lg shadow-sm`}>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading font-medium text-lg">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-sm text-shop-blue hover:text-shop-blue-dark"
                >
                  Clear All
                </Button>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider
                  value={priceRange}
                  min={0}
                  max={500}
                  step={10}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-shop-gray-800">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id}
                        checked={categoryFilters.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={category.id}>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Product grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-shop-gray-800">No products match your filters.</p>
                <Button onClick={clearFilters} variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
