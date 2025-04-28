import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import { products, categories } from '@/data/products';
import { Product } from '@/types';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Filter, 
  X, 
  Search, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

// Sort options
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Extract any category filter from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategoryFilters([categoryParam]);
    }
    
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    const sortParam = searchParams.get('sort');
    if (sortParam) {
      setSortBy(sortParam);
    }
    
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
  }, [searchParams]);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [categoryFilters, priceRange, searchQuery, sortBy]);

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
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, you would sort by date
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // Featured - keep original order
        break;
    }
    
    setFilteredProducts(filtered);
  }, [priceRange, categoryFilters, searchQuery, sortBy]);
  
  // Pagination
  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setDisplayedProducts(filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct));
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (categoryId: string) => {
    setCategoryFilters((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setCategoryFilters([]);
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (searchQuery) {
        newParams.set('search', searchQuery);
      } else {
        newParams.delete('search');
      }
      newParams.set('page', '1');
      return newParams;
    });
  };
  
  const handleSort = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('sort', value);
      newParams.set('page', '1');
      return newParams;
    });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page.toString());
      return newParams;
    });
  };

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle pagination navigation with Button components instead of PaginationLink
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-heading font-bold text-shop-gray-900 mb-8">
          All Products
        </h1>
        
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-shop-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          
          <div className="flex items-center gap-4">
            <div className="w-48">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full h-10 border border-input bg-background rounded-md px-3 text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <Button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              variant="outline"
              className="md:hidden flex items-center gap-2"
            >
              <SlidersHorizontal size={18} />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4">
            {isMobileFilterOpen ? (
              <Button 
                onClick={() => setIsMobileFilterOpen(false)}
                variant="outline"
                className="w-full flex justify-between items-center"
              >
                <span className="flex items-center gap-2">
                  <Filter size={18} />
                  Hide Filters
                </span>
                <X size={18} />
              </Button>
            ) : null}
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
            <ProductGrid 
              products={displayedProducts} 
              isLoading={isLoading}
            />
            
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-shop-gray-300 mb-3" />
                <p className="text-lg text-shop-gray-800 mb-6">No products match your filters.</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {!isLoading && filteredProducts.length > 0 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {/* Replace PaginationPrevious with Button + Link */}
                      {currentPage === 1 ? (
                        <Button 
                          variant="outline" 
                          size="default"
                          className="gap-1 pl-2.5 cursor-not-allowed opacity-50"
                          onClick={() => {}}
                          disabled
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Previous</span>
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="default"
                          className="gap-1 pl-2.5"
                          onClick={handlePreviousPage}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Previous</span>
                        </Button>
                      )}
                    </PaginationItem>
                    
                    {[...Array(pageCount)].map((_, index) => {
                      const pageNum = index + 1;
                      // Only show a limited number of pages
                      if (
                        pageNum === 1 || 
                        pageNum === pageCount || 
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink 
                              isActive={currentPage === pageNum}
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        (pageNum === currentPage - 2 && pageNum > 1) || 
                        (pageNum === currentPage + 2 && pageNum < pageCount)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <span className="flex h-9 w-9 items-center justify-center">...</span>
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}
                    
                    <PaginationItem>
                      {/* Replace PaginationNext with Button */}
                      {currentPage === pageCount ? (
                        <Button 
                          variant="outline"
                          size="default"
                          className="gap-1 pr-2.5 cursor-not-allowed opacity-50"
                          onClick={() => {}}
                          disabled
                        >
                          <span>Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline"
                          size="default"
                          className="gap-1 pr-2.5"
                          onClick={handleNextPage}
                        >
                          <span>Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
