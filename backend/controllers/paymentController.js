// import axios fro the axios module
const axios = require('axios')

// function to initialize/initiate payment
const initiatePayment = async (req, res) => {
    // Destructure and extract data from the request body
    const { email, amount } = req.body // Object destructuring

    // validate the request data

    // if the email or amount is missing, send a 400 Bad request which means invalid data
    if (!email || !amount) {
        return res.status(400).json({ message: "Email and amount are required" })
    }

    try {

        const response = await axios.post(
            'https://api.paystack.co/transaction/initiaize', // Paystack API endpoint for initializing a transaction

            // send the email and amount (amount send in kobo)
            {
                email,
                amount: amount * 100
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // paystack secret key from environment variables
                    'Content-Type': 'application/json'
                }
            }

        )

        // send the response data back to the frontend to verify the transaction
        
        res.status(200).json({
            // send the authorization url to redirect the user to paystack checkout
            authorization_url: response.data.data.authorization_url,
            reference: response.data.data.reference
        })

    } catch (error) {
        console.error("Error initiating payment: ", error.message)
        res.status(500).json({ message: "Internal server error" })
    }

}


// function to verify payments
const verifyPayment = async (req, res) => {

    // Destructure and extract the payment reference from the request parameter to verify the transaction
    const { reference } = req.params

    try {
        const response = await axios.get( // GET request to paystack to check the status of a transaction
            `http://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": 'application/json'
                }
            }
        )

        // Check if the transaction was successful
        if (response.data.data.status === 'success') {
            console.log(res.data.data);
            console.log('Payment verification successful')
            return res.status(200).json({
                message: 'Payment verified successfully',
                data: response.data.data
            })
        } else {
            console.log(response.data.data.status)
            console.error('Payment verification failed.')
            return res.status(500).json({ message: 'Payment verification failed.'})
        }


    } catch (error) {
        console.error("Error verifying payment: ", error.message)
        return res.status(500).json({ message: "Internal server error."})
    }
}




// export the function
module.exports = { initiatePayment, verifyPayment }
