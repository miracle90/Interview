let socket; // websocket的实例
let lockReconnect = false; // 避免重复连接

//新建websocket的函数 页面初始化 断开连接时重新调用
const getwebsocket = () => {
  let wsUrl = "ws://ip"; //url网址
  socket = new WebSocket(wsUrl);
  // 绑定一些事件，onerror,onclose,onopen，onmessage
  // 如果希望WebSocket 连接一直保持，可以在close或者error上绑定重连方法
  // 这样一般正常情况下失去连接时，触发onclose方法，就能重连了。
  socket.onerror = function (event) {
    console.log("websocket服务出错了");
    reconnect(wsUrl);
  };
  socket.onclose = function (event) {
    console.log("websocket服务关闭了");
    reconnect(wsUrl);
  };
  socket.onopen = function (event) {
    heartCheck.reset().start(); //传递信息
  };
  socket.onmessage = function (event) {
    //如果获取到消息，心跳检测重置
    //拿到任何消息都说明当前连接是正常的
    console.log("websocket服务获得数据了");
    //接受消息后的UI变化
    doWithMsg(event.data);
    heartCheck.reset().start();
  };
  //收到消息推送
  function doWithMsg(msg) {
    //执行业务代码.....
  }
};
// 重新连接
const reconnect = (url) => {
  if (lockReconnect) return;
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  setTimeout(function () {
    getwebsocket();
    lockReconnect = false;
  }, 2000);
};
//心跳检测
let heartCheck = {
  timeout: 60000, //60秒
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: () => {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: () => {
    let _this = this;
    this.timeoutObj = setTimeout(() => {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      socket.send("心跳测试");
      //如果超过一定时间还没重置，说明后端主动断开了
      _this.serverTimeoutObj = setTimeout(function () {
        //这里再onclose里执行了reconnect，
        // 所以这里检测到超时之后，执行socket.close()就触发了onclose，进而就执行了reconnect。
        socket.close();
      }, _this.timeout);
    }, this.timeout);
  },
};
