const http = require("http")
const express = require("express")
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const bodyparser = require('body-parser')
const sharedsession = require('express-socket.io-session')

app.use(bodyparser.urlencoded({extended:false}))

const session = require('express-session')({
    secret: 'chatmessage',
    resave : false,
    saveUninitialized : false
})

app.use(session)
io.use(sharedsession(session,{
    autoSave:true
}))

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))

app.get("/", function (request,response){

    if (!request.session.kulad)
    {
        response.sendFile('./index.html',{root : __dirname})
    }else
    {
        response.sendFile('./chat.html',{root : __dirname})

    }

})

app.post("/chat", function (request,response){

    if (request.body.kulad)
    {
        request.session.kulad = request.body.kulad
    }
    if (request.session.kulad)
    {
        response.sendFile('./chat.html',{root : __dirname})
    }else
    {
        response.sendFile('./index.html',{root : __dirname})

    }

})

io.on('connection', function (socket){
    console.log("Bir kullanıcı bağlandı" + socket.handshake.session.kulad)

    socket.on('newmessage', function (msg){
       io.emit('newmessage', socket.handshake.session.kulad, msg)
    })

    socket.on('disconnect', function (){
        console.log("Bir kullanıcı ayrıldı")
    })

})

server.listen(8000,function (){
    console.log("server");
})