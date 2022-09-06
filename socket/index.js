const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', async (socket) => {
  socket.on('newuser', (name) => {
    addUser(socket, name)
  });
  socket.on('chat', (data) => {
    sendMessage(data, socket);
  });
  socket.on('disconnect', () => {
    disconnect(socket);
  });
});

function sendMessage(data, socket) {
  let output = [];
  users.forEach((element, index ) => {
    if (data.sendTo && data.sendTo !== 'all') {
      if(element.name === data.sendTo || element.name === data.owner) {
        // output = pushMessage(data, element, socket.name)
        // console.log(element)
        element.emit('chat', data);
      }
    } else {
      // output = pushMessage(data, element, socket.name)
      // console.log(element.messages), console.log(output.messages)
      element.emit('chat', data);

    }
  });
}

function disconnect(socket) {
  var user = findUser(users, socket.name); 
  if (user >= 0 && users[user]) {
    users[user].status = 0;
  }
  getListUser()
}

function addUser(socket, name) {
  socket.name = name;
  socket.status = 1;
  socket.messages = [];
  // var user = findUser(users, name);
  // if (user >= 0 && users[user]) {
  //   socket = users[user];
  // } else {
  //   users.push(socket)
  // }
  users.push(socket)
  getListUser()
}

function pushMessage(data, user, formUser) {
  if (!user.messages) {
    user.messages = [];
  }
  if (!user.messages[formUser]) {
    user.messages[formUser] = [];
  }
  user.messages[formUser].push = data;
  return user
}

function getListUser() {
  var listUser = [];

  users.forEach(element => {
    listUser.push({
      name: element.name,
      id: element.id,
      status: element.status
    })
  });
  io.emit('listUser', listUser);
}

function findUser(array, userName) {
  return array.findIndex(({ name }) => name === userName);
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});