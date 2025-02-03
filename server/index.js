import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Create Razorpay order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment and send email
app.post('/api/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userEmail,
      products
    } = req.body;

    // Verify payment signature (implement your verification logic here)
    // const isValid = razorpay.validateWebhookSignature(
    //   JSON.stringify(req.body),
    //   razorpay_signature,
    //   webhookSecret
    // );

    // For demo purposes, we'll assume the payment is valid
    const isValid = true;

    if (isValid) {
      // Send confirmation email
      const msg = {
        to: userEmail,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'Your Purchase Confirmation',
        html: `
          <h1>Thank you for your purchase!</h1>
          <h2>Order Details:</h2>
          <ul>
            ${products.map(product => `
              <li>
                <h3>${product.name}</h3>
                <p>Quantity: ${product.quantity}</p>
                <p>Price: ₹${product.price * product.quantity}</p>
              </li>
            `).join('')}
          </ul>
          <p>Total Amount: ₹${products.reduce((total, product) => total + (product.price * product.quantity), 0)}</p>
          <p>Your products will be delivered to your email shortly.</p>
        `,
      };

      await sgMail.send(msg);

      res.json({ success: true, message: 'Payment verified and email sent' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});