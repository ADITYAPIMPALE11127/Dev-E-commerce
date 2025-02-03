import { ShoppingCart, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/useCart';

export default function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Dev Shop</span>
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}