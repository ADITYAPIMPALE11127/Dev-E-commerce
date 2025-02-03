import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/useCart';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Load Razorpay script
      await loadRazorpayScript();

      // Create order
      const response = await fetch('http://localhost:3000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      const order = await response.json();

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Dev Shop',
        description: 'Purchase of developer products',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment and send email
            const verifyResponse = await fetch('http://localhost:3000/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userEmail: email,
                products: items,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              clearCart();
              navigate('/thank-you');
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('An error occurred while verifying your payment.');
          }
        },
        prefill: {
          email: email,
        },
        theme: {
          color: '#2563eb',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred while processing your payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Checkout</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-600">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
}