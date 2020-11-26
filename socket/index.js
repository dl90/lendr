const app = require("express")();
const http = require("http").createServer(app);

const io = require("socket.io")(http,{
    cors:{
        origin: "https://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders:['Access-Control-Allow-Origin']
    }
});

var msgs = [];
io.on('connection', (socket)=>{
    console.log(`${socket.id} user connected`);
    //io.on();

    socket.on('getmsg', (data)=>{
        console.log("data",data, msgs);
        msgs.push(data);
        io.emit("newmsg", msgs);
    });

    socket.on('disconnect', ()=>{
        console.log(`${socket.id} user disconnect`);
    });
})

http.listen(8888, ()=>{
    console.log('port 8888');
})