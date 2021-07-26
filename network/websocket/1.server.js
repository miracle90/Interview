const { Server } = require('./ws')

const wsServer = new Server({ port: 8888 })

wsServer.on('connection', (socket) => {
  console.log('onconnection~~~~~~~~~~~')
  // onmessage监听客户端过来的链接
  socket.on('message', (message) => {
    console.log(`服务端onmessage：`, message)
    socket.send(`message：${message}`)
  })
})