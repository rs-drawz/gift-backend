const catchasyncError = require('../middleware/catchasyncError');
const stripe = require('stripe')('sk_test_51NfR8LSEs8PhK36jE7DQ5yBu0Gw6ZdjDpKyaC9o88kYFg9hw0m5HJxu9ZgXQjI0OHVacIBvzSaeHKtVRkmee7x0b00klmOYgjf');

exports.processPayment = catchasyncError(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment" },
        shipping: req.body.shipping
    })
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
});

exports.sendStripeApi = catchasyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});
