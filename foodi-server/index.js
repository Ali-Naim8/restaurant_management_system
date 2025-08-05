const express = require("express");
const app = express();
const cors = require("cors"); //  Importing the CORS middleware for handling Cross-Origin Resource Sharing.
const port = process.env.PORT || 6001; // Defining the port number from the environment variable or defaulting to 6001.
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for creating and verifying JSON Web Tokens.
require('dotenv').config() // Loading environment variables from a .env file into process.env.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //  Importing the Stripe library and initializing it with the Stripe secret key from the environment variables.
//const EmailSender = require("./SendEmail");



// zahranmohammad30
// cvgVcai4rAdG2qCr

// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@foodi-cluster.71gefql.mongodb.net/foodi-client?retryWrites=true&w=majority&appName=foodi-cluster`
    )
    .then(
        console.log("MongoDB Connected Succesfully!")
    )
    .catch((error) => console.log("Error connecting to MongoDB", error));

    // jwt authintucation
    app.post('/jwt', async(req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1hr'
      });
      res.send({token})
    })
    // Defining a route /jwt for generating a JWT token based on user credentials provided in the request body.
    // The token is signed using the secret key from environment variables and sent back in the response.

    
  
// import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const paymentRoutes = require('./api/routes/paymentRoutes');
const bookingRoutes = require('./api/routes/bookingRoutes');
const reviewRoutes = require('./api/routes/reviewRoutes')
const adminStats = require('./api/routes/adminStats');
const orderStats = require('./api/routes/orderStats');



app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/booking', bookingRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);
app.use('/adminStats', adminStats);
app.use('/orderStats', orderStats);




// stripe payment routes
// Create a PaymentIntent with the order amount and currency
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price*100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",

    payment_method_types: ["card"],

  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Contact
/*
app.post("/send", async (req, res) => {
  try {
    const { fullName,email,phone,message} = req.body
    EmailSender({fullName,email,phone,message})
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});
*/
//Defining a route /create-payment-intent for creating a PaymentIntent with the order amount and currency using
//the Stripe API. The client secret of the PaymentIntent is sent back in the response.

app.get('/',   (req, res) => {
  res.send('Hello Foodi Client Server!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})