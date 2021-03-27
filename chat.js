const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.get("/", function (request,response){
    response.sendFile('./index.html',{root : __dirname})

})

server.listen(8000,function (){
    console.log("server");
})