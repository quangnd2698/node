const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const rooms = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/room', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  io.on("connection", (socket) => {
    socket.join("some room");
  });
});
io.on('connection', async (socket) => {
  const userId = await fetchUserId(socket);
    console.log(userId)
  socket.on('chat message', (anotherSocketId, data ) => {
    
    // if (data.roomId.length) {
    //   if (!rooms.find(element => element === data.roomId)) {
    //     console.log(2);
    //     rooms.push(data.roomId)
    //   }
    //   socket.join(data.roomId); 
    //   io.to(data.roomId).emit("chat message", data.msg);
    // } else {
    //   io.emit('chat message', data.msg);
    // }
    console.log(rooms)
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});