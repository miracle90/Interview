const crypto = require('crypto')
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

function toAcceptKey(wsKey) {
  // md5 hash算法，安全性不高
  return crypto.createHash('sha1').update(wsKey + CODE).digest('base64')
}

exports.toAcceptKey = toAcceptKey