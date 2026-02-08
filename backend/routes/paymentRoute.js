// import the express framework
const express = require('express')

// create a minimal router using the express framework
const router = express.Router()

// import the payment controller functions
const { initiatePayment, verifyPayment } = require('../controllers/paymentController')

// import the middleware functions

// middleware to initiate payments
const initPaymentMiddleware  = require("../middleware/initiatePayment")

// Middleware to verify payments
const verifyPaymentMiddleware  = require("../middleware/verifyPayment")

router.post('/initPayment', initPaymentMiddleware, initiatePayment) // Route to initiate payment

// route to verify payment
// verifyPayment:reference route to a dynamic parameter
// :reference captures the transaction reference from the URL
router.get('/verifyPayment/:reference', verifyPaymentMiddleware, verifyPayment)


// export the route
module.exports = router