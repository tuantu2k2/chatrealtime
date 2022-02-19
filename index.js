const express = require('express')
const app = express()
const path = require("path");
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server)
app.use(express.static(path.join(__dirname,'public')))
app.get('/',(req, res) =>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection',(socket)=>{
    socket.on('on-connect',data=>{
        io.emit('user-connect',data)
    })
    console.log('user connected')
    socket.on('on-chat',data=>{
        io.emit('user-chat',data)
    })
})

server.listen(process.env.PORT || 3000, ()=>{
    console.log('listening on port 3000')
})