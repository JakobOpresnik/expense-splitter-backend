const express = require('express')
const app = express()
const dotenv = require('dotenv')
const db = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRouter = require('./routes/UserRoutes')
const groupRouter  = require('./routes/GroupRoutes')
const purchaseRouter = require('./routes/PurchaseRoutes')

// load environment variables
dotenv.config()

// "/home" route
app.get("/home", (req, res)=>{
    res.status(200).send("<h1>Hello World!😎😎</h1>")
})

// declaring our port number variable
const PORT = process.env.PORT || 9000;

// connect to mongodb
db()

// to parse JSON request body
app.use(bodyParser.json());
app.use(cors());

// use routers
app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/purchases", purchaseRouter);

app.use(express.json());

// creating a server with the PORT variable declared above
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});