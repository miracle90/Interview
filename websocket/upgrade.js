const http = require("http");
const crypto = require("crypto");
const MAGIC_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const port = 8080;

/**
 * 根据请求头的key生成accpet
 * 采用sha1算法，加盐
 * @param {*} secWsKey 
 * @returns 
 */
function generateAcceptValue(secWsKey) {
  return crypto
    .createHash("sha1")
    .update(secWsKey + MAGIC_KEY, "utf-8")
    .digest("base64");
}
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  res.end("创建服务");
});
server.on("upgrade", (req, socket) => {
  if (req.headers["upgrade"] !== "websocket") {
    socket.end("HTTP/1.1 400 Bad Request");
    return;
  }
  // 读取客户端提供的 Sec-WebSocket-Key
  const secWsKey = req.headers["sec-websocket-key"];
  // 使用SHA-1 算法生成Sec-WebSocket-Accept
  const hash = generateAcceptValue(secWsKey);
  // 设置HTTP响应头
  const responseHeaders = [
    "HTTP/1.1 101 Web Socket Protocol Handshake",
    "Upgrade: WebSocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${hash}`,
  ];
  // 返回握手请求头信息
  socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");
});
server.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
