const http = require("http")
const express = require("express")
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))

app.get("/", function (request,response){
    response.sendFile('./index.html',{root : __dirname})

})

io.on('connection', function (socket){
    console.log("Bir kullanıcı bağlandı")

    socket.on('newmessage', function (msg){
       io.emit('mesajvar', msg)
    })

    socket.on('disconnect', function (){
        console.log("Bir kullanıcı ayrıldı")
    })

})

server.listen(8000,function (){
    console.log("server");
})