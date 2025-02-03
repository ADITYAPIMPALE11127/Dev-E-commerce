import { Link } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">Add some products to your cart to get started</p>
        <Link to="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-gray-900">₹{total}</span>
        </div>
        <Link
          to="/checkout"
          className="w-full block text-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}