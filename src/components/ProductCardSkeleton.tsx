
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-shop-gray-200 rounded-md mb-4"></div>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-8 w-12 rounded-md" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
