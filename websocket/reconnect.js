let socket;
let url = "ws://localhost:8080";

class HeartCheck {
  time = 6000;
  checkTimer = null;
  checkServer = null;
  startCheck = () => {
    this.checkTimer = setTimeout(() => {
      socket.send("发送心跳检测");
      this.checkServer = setTimeout(() => {
        socket.onclose("心跳检测失败，先断开连接");
      }, this.time);
    }, this.time);
  };
  resetCheck = () => {
    clearTimeout(this.checkTimer);
    clearTimeout(this.checkServer);
    return this;
  };
  reconnect() {
    wsConnect();
  }
}
function wsConnect(url) {
  socket = new WebSocket(url);
  const heartCheck = new HeartCheck();
  socket.onclose = () => {
    console.log("连接断开");
    heartCheck.reconnect();
  };
  socket.onerror = (err) => {
    console.log("连接出错");
    heartCheck.reconnect();
  };
  socket.onopen = () => {
    console.log("建立连接");
    heartCheck.resetCheck().startCheck();
  };
  socket.onmessage = (message) => {
    console.log("收到信息", message.data);
    heartCheck.resetCheck().startCheck();
    // todo...
  };
}
