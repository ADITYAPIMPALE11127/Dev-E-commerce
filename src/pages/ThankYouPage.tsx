import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  service_link: string;  // Ensure this is a direct link to a downloadable file
  github_link: string;
}

export default function ThankYouPage() {
  const location = useLocation();
  const products: Product[] = location.state?.products || []; // Get products from state

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

      {/* Display Service and GitHub Links */}
      {products.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6">Your Products:</h2>
          <ul className="list-disc list-inside">
            {products.map((product) => (
              <li key={product.id}>
                <span>{product.name}: </span>
                <a 
                  href={product.service_link} 
                  download // This will trigger a download
                  className="text-blue-600"
                >
                  Download Product
                </a>
                <span> | </span>
                <a 
                  href={product.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600"
                >
                  View on GitHub
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
