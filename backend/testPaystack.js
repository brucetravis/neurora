// Add this line at the very top!
require('dotenv').config()

const axios = require('axios');

const testPaystack = async () => {
  try {
    // Log the key to verify it's loading (first 10 chars only for security)
    console.log('API Key loaded:', process.env.PAYSTACK_SECRET_KEY?.substring(0, 10) + '...')
    
    const response = await axios.get('https://api.paystack.co/transaction/verify/test', {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });
    console.log('Connection works:', response.data);
  } catch (err) {
    console.error('Cannot reach Paystack:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Response:', err.response.data);
    }
  }
};

testPaystack();