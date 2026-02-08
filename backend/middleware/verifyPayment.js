// Middleware to verify payments


const verifyPaymentMiddleware = (req, res, next) => {
    const { reference } = req.params

    if (!reference) {
        return res.status(400).json({ message: 'Payment reference missing'})
    }

    next()
}

module.exports = verifyPaymentMiddleware


// export the middleware
module.exports = verifyPaymentMiddleware