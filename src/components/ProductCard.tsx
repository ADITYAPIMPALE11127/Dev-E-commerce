import { Product } from '../types';
import { useCart } from '../store/useCart';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className={cn(
          "px-2 py-1 text-xs font-semibold rounded-full",
          product.category === 'website' ? "bg-blue-100 text-blue-800" :
          product.category === 'api' ? "bg-green-100 text-green-800" :
          "bg-gray-100 text-gray-800"
        )}>
          {product.category.toUpperCase()}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-gray-600 text-sm">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900" style={{letterspacing:1}}>₹{product.price}</span>
          <button
            onClick={() => addItem(product)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}