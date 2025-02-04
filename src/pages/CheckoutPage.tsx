import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { db } from '../firebase/firebaseConfig'; // Import your Firebase configuration
import { collection, doc, setDoc } from 'firebase/firestore';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', phone: '' };

    // Name validation
    if (userInfo.name.length < 5 || userInfo.name.length > 25) {
      newErrors.name = 'Name must be between 5 and 25 characters.';
      valid = false;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(userInfo.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!validateForm()) {
      setIsProcessing(false);
      return; // Stop processing if validation fails
    }

    try {
      const purchaseId = doc(collection(db, 'purchases')).id;

      const purchaseData = {
        user: {
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
        },
        products: items,
        total,
        purchaseDate: new Date(),
      };

      await setDoc(doc(db, 'purchases', purchaseId), purchaseData);
      clearCart();

      // Navigate to Thank You page with product info
      navigate('/thank-you', { state: { products: items } });
    } catch (error) {
      console.error("Error saving purchase data: ", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Order Summary</h5>
        </div>
        <div className="card-body">
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} x {item.quantity}
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="card p-4">
        <h5 className="mb-3">User Information</h5>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>} {/* Error message for name */}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>} {/* Error message for email */}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            required
            className="form-control"
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>} {/* Error message for phone */}
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="btn btn-primary btn-block"
        >
          {isProcessing ? 'Processing...' : 'Confirm Order'}
        </button>
      </form>
    </div>
  );
}
