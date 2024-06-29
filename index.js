const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_API)

const app = express()
 app.use(cors({origin : true}))

 app.use(express.json())
  app.get('/',(req, res)=>{
    res.status(200).json({msg :"success"})
  })

  app.post('/payment/create',async (req, res)=>{
    const total = parseInt(req.query.total);
    if (total > 0){
        const paymentIntent = await stripe.paymentIntents.create ({
            amount : total,
            currency :"usd"
        })
        // res.status(200).json(paymentIntent)
        res.status(200).json({
            client_secret : paymentIntent.client_secret
        })
    }
    else{
        res.status(401).json({msg :"not lessthan zero"}) 
    }
    
  })

  app.listen(5000, ()=>{
    console.log("it is listenig")
  })