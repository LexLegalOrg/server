const express = require('express'), 
      mongoose = require('mongoose'), 
      passport = require('passport'), 
      morgan = require('morgan'), 
      bodyParser = require('body-parser'),
      cors = require('cors'),
      dotenv = require('dotenv').config()


// routes

// initalizations
const app = express()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('Connected to DB'))
.catch(err=>console.log(err))

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use(bodyParser.json({limit:'50mb'}))

// USER ROUTES
const usersRoutes = require('./routes/users.routes')
app.use('/api/users', usersRoutes)

// DEALS ROUTES
const dealsRoutes = require('./routes/deals.routes')
app.use('/api/deals', dealsRoutes)

// LEADS ROUTES
const leadsRoutes = require('./routes/leads.routes')
app.use('/api/leads', leadsRoutes)

// AUTH ROUTES
const authRoutes = require('./routes/auth.routes')
app.use('/api/auth', authRoutes)

// Bonus ROUTES
const bonusesRoutes = require('./routes/bonuses.routes')
app.use('/api/bonus', bonusesRoutes)

// PLANNING ROUTES
const planningRoutes = require('./routes/planning.routes')
app.use('/api/plan', planningRoutes)



module.exports = app