var app = require('express')();
var WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 9000 });
wss.on('connection', function connection(ws) {
    console.log('已建立连接');
    ws.on('message', function incoming(message) {
        console.log('收到消息：', message.toString());
        ws.send(`你好 ${new Date()}`);
    });
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
