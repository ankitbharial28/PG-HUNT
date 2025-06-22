const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
require('dotenv').config();


const db = require("./server/config/db")
db()
const router = require("./server/routes/UserRoute")

const {seedAdmin}= require("./server/config/seed")
seedAdmin()
const port  = process.env.PORT || 2005 

app.use(cors())
app.use("/upload",express.static(path.join(__dirname,"./server/public/uploads")))
// In your Express app (usually in app.js or server.js)
// app.use('/uploads', express.static('public/uploads'));


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",router)
app.use('/uploads', express.static('uploads'));



app.listen(port,()=>{
    console.log(`server is running at port  number http://localhost:${port}`)
})

