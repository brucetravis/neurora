// middleware to check if the email and the amount exist

const initPaymentMiddleware = (req, res, next) => {
    // get the email and the amount from the request body
    const { email, amount } = req.body

    // check if email and amount exist
    if (!email || !amount) {
        // if they do not exist, return a 400 response error
        return res.status(400).json({ message: 'Cannot initiate payment. Missing email or data'})
    }

    // if the payment was successfull, call the next middleware
    next()
}


// export the middleware
module.exports = initPaymentMiddleware

