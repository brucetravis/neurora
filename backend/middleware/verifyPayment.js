// Middleware to verify payments


const verifyPaymentMiddleware = (req, res, next) => {

    // destructure the reference from the request body
    const { reference } = req.body

    // check if the reference has been provided
    if (!reference) {
        // send a 400 bad request invalid error
        return res.status(400).json({ message: 'Payment reference midding '})
    }
}


// export the middleware
module.exports = verifyPaymentMiddleware