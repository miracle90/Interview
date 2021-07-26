/**
 * 基于tcp传输层协议实现一个websocket应用服务器
 */
const net = require('net')
const { EventEmitter } = require('events')
const { unmask, toHeaders, toAcceptKey } = require('./utils')
const OPCODE = {
  TEXT: 1,
  BINARY: 2
}

// EventEmitter事件库，可以用来发布和订阅事件，进行事件的监听 jquery on trigger addEventListener
class Server extends EventEmitter {
  constructor(options) {
    super(options)
    this.options = options
    // 创建一个tcp服务器，每当服务器收到客户端连接后
    this.server = net.createServer(this.listener)
    this.server.listen(options.port)
  }

  // socket 套接字，发送和接收消息
  listener = (socket) => {
    socket.setKeepAlive(true) // 保持长连接

    socket.send = (payload) => {
      let opcode;
      if (Buffer.isBuffer(payload)) {
        opcode = OPCODE.BINARY
      } else {
        opcode = OPCODE.TEXT
        payload = Buffer.from(payload)
      }
      let length = payload.length
      let buffer = Buffer.alloc(length + 2)
      buffer[0] = 0b10000000 | opcode
      buffer[1] = length
      payload.copy(buffer, 2)
      socket.write(buffer)
    }
    // 当服务器收到客户端发过来的data后，chunk就是客户端发给服务器的数据
    socket.on('data', (chunk) => {
      console.log('ondata')
      // 说明客户端要求升级协议
      if (chunk.toString().match(/Upgrade: websocket/)) {
        this.upgradeProtocol(socket, chunk.toString())
      } else {
        this.onmessage(socket, chunk)
      }
    })
    // 触发connection事件，并传递socket对象
    this.emit('connection', socket)
  }

  // 如果不是握手，就是正常的发送消息
  onmessage = (socket, chunk) => {
    // 是结束帧
    let FIN = (chunk[0] & 0b10000000) === 0b10000000
    // 第一个字节，与上前4个0，把前4个干掉，得到操作码的10进制数
    let opcode = chunk[0] & 0b00001111
    // 是否掩码
    let masked = (chunk[1] & 0b10000000) === 0b10000000
    // 十进制数，数据长度
    let payloadLength = chunk[1] & 0b01111111
    let payload
    if (masked) {
      let maskKey = chunk.slice(2, 6)
      payload = chunk.slice(6, 6 + payloadLength)
      // 反码得到真正的数据
      unmask(payload, maskKey)
    } else {
      payload = chunk.slice(6, 6 + payloadLength)
    }
    if (FIN) {
      switch (opcode) {
        case OPCODE.TEXT:
          // 文本字符串的话
          socket.emit('message', payload.toString('utf8'))
          break;
        case OPCODE.BINARY:
          // 二进制
          socket.emit('message', payload)
          break;
        default:
          break;
      }
    }
  }

  upgradeProtocol = (socket, chunk) => {
    let rows = chunk.split('\r\n');//按分割符分开
    let headers = toHeaders(rows.slice(1, -2));//去掉请求行和尾部的二个分隔符
    let wsKey = headers['Sec-WebSocket-Key'];
    let acceptKey = toAcceptKey(wsKey)
    let response = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${acceptKey}`,
      '\r\n'
    ].join('\r\n')
    socket.write(response)
  }
}

exports.Server = Server