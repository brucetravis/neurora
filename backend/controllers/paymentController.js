const axios = require('axios')

const initiatePayment = async (req, res) => {
    const { email, amount } = req.body

    if (!email || !amount) {
        return res.status(400).json({ message: "Email and amount are required" })
    }

    // DEBUG: Log everything
    // console.log('==========================================')
    // console.log('Email:', email)
    // console.log('Amount:', amount)
    // console.log('API Key (first 15 chars):', process.env.PAYSTACK_SECRET_KEY?.substring(0, 15))
    // console.log('Key type:', process.env.PAYSTACK_SECRET_KEY?.startsWith('sk_test') ? 'TEST' : 'LIVE')
    // console.log('==========================================')

    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount: amount * 100 // Amount in kobo
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        // console.log('Paystack Response:', response.data)

        res.status(200).json({
            authorization_url: response.data.data.authorization_url,
            reference: response.data.data.reference
        })

    } catch (error) {
        console.error("Error initiating payment:")
        console.error("Message:", error.message)
        console.error("Response:", error.response?.data)
        res.status(500).json({ message: "Internal server error", error: error.response?.data })
    }
}

const verifyPayment = async (req, res) => {
    const { reference } = req.params

    try {
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`, // FIXED: was 'http'
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": 'application/json'
                }
            }
        )

        if (response.data.data.status === 'success') {
            console.log(response.data.data); // FIXED: was 'res'
            console.log('Payment verification successful')
            return res.status(200).json({
                message: 'Payment verified successfully',
                data: response.data.data
            })
        } else {
            console.log(response.data.data.status)
            console.error('Payment verification failed.')
            return res.status(400).json({ message: 'Payment verification failed.'})
        }

    } catch (error) {
        console.error("Error verifying payment: ", error.message)
        console.error("Full error:", error.response?.data)
        return res.status(500).json({ message: "Internal server error."})
    }
}

module.exports = { initiatePayment, verifyPayment }