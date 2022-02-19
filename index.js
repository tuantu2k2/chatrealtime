const express = require('express')
const app = express()
const path = require("path");
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io');
const res = require('express/lib/response');

const io = new Server(server)
app.use(express.static(path.join(__dirname,'public')))
app.get('/',(req, res) =>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection',(socket)=>{
    const users = {};
    socket.on('on-connect',data=>{
        io.emit('user-connect',data)
    })
    console.log('user connected')
    socket.on('on-chat',data=>{
        io.emit('user-chat',data)
    })
    //arr
    

    socket.on('login', function(data){
        console.log('a user ' + data.userId + ' connected');
        // saving userId to object with socket ID
        users[socket.id] = data.userId;
        // io.emit('view-onl',users)
      });
    
      socket.on('disconnect', function(){
        io.emit('user-disconnect',users[socket.id])
        console.log('user ' + users[socket.id] + ' disconnected');
        // remove saved socket from users object
        delete users[socket.id];
      });
      
})

server.listen(process.env.PORT || 3000, ()=>{
    console.log('listening on port 3000')
})