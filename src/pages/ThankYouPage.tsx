import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Thank You for Your Purchase!</h1>
      <p className="text-lg text-gray-600">
        We've sent a confirmation email with your purchase details.
        Your products will be delivered to your email shortly.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}