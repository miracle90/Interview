function sendAjax(obj) {
  var url = obj.url;
  var method = obj.method;
  var async = obj.async == undefined ? true : obj.async;
  var data = obj.data;

  function splitStr(data) {
    let str = "";
    for (var key in data) {
      let s = key + "=" + data.key + "&";
      str += s;
    }
    return str.substring(0, str.length - 1);
  }
  var xhttp;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    xhttp = new ActiveXObject();
  }
  // send
  if (obj.method == "get" || obj.method == "GET") {
    if (data == undefined) {
      xhttp.open("GET", url, async);
      xhttp.send();
    } else {
      xhttp.open("GET", url + splitStr(data), async);
      xhttp.send();
    }
  } else if (method == "post" || method == "POST") {
    if (data == undefined) throw "method POST can not without data to send";
    else {
      xhttp.open("POST", url, async);
      xhttp.setRuquestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      xhttp.send(data);
    }
  } else if (method == undefined || method == "")
    throw "method can not be empty";

  xhr.open(method, url, async);
  // response
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
      obj.success(JSON.parse(xhttp.responseText));
    } else if (
      xhttp.readyState == 4 &&
      (xhttp.status != 200 || xhttp.status != 304)
    ) {
      obj.error();
    }
  };
}

sendAjax({
  url: "AJAX.json",
  method: "get",
  async: true,
  data: {
    id: 100,
    username: "123456",
  },
  success: function (data) {
    console.log(data);
  },
  error: function () {
    console.log("error data");
  },
});
