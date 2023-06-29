const express = require('express')
const app = express()
const socket = require('socket.io')
require('dotenv').config()
require('express-async-errors')

const connectDB = require('./db/connect')
const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')

const authenticateUser = require('./middleware/authenticated')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

//middlewares
app.use(express.json())

// routes
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        const server = app.listen(port,()=>{
            console.log(`Server is listening to port ${port}`)
        })
        const io = socket(server);
        // console.log(io)
        io.on("connection", (socket) => {
            console.log('a user connected!')
            socket.on("chat", (data) => {
                console.log(data);
              io.sockets.emit("chat", data);
            });
            socket.on("typing", (name) => {
              socket.broadcast.emit("typing", name);
            });
          });
          
    } catch (error) {
        console.log(error)
    }
}

start()