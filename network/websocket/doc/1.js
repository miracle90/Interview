const crypto = require('crypto')

const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
let SecWebSocketKey = 'IFUnA2e9Ud/h8aMaCN9JBA=='
let SecWebSocketAccept = 'EFKawHQH5PirjVYXJjJ52mnm1HY='


function toAcceptKey(wsKey) {
  // md5 hash算法，安全性不高
  return crypto.createHash('sha1').update(wsKey + CODE).digest('base64')
}

let result = toAcceptKey(SecWebSocketKey)
console.log(`Sec-WebSocket-Accept：${result}`)
console.log(result === SecWebSocketAccept)