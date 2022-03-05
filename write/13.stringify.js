// 概念解释
// JSON.stringify([,replacer,[,space]])方法是将一个 JavaScript 值(对象或者数组)转换为一个 JSON 字符串。此处模拟实现，不考虑可选的第二个参数 replacer 和第三个参数 space

// 转换规则如下：

// 基本数据类型

// undefined 转换之后仍是 undefined(类型也是 undefined)

// boolean 值转换之后是字符串 "false"/"true"

// number 类型(除了 NaN 和 Infinity)转换之后是字符串类型的数值

// symbol 转换之后是 undefined

// null 转换之后是字符串 "null"

// string 转换之后是字符串 string

// NaN 和 Infinity 转换之后是字符串 "null"

// 如果是函数类型

// 转换之后是 undefined

// 如果是对象类型(非函数)

// 如果有 toJSON()方法，那么序列化 toJSON()的返回值

// 如果是一个数组，如果属性值中出现了 undefined、任意的函数以及 symbol，转换成字符串"null"

// 如果是 RegExp 对象，返回{}(类型是 string)

// 如果是 Date 对象，返回 Date 的 toJSON 字符串值

// 如果是普通对象

// 如果属性值中出现了 undefined、任意的函数以及 symbol 值，忽略
// 所有以 symbol 为属性键的属性都会被完全会忽略掉
// 对包含循环引用的对象(对象之间相互引用，形成无限循环)执行此方法，会抛出错误

// 代码实现
if (!window.JSON) {
  window.JSON = {
    parse: function (sJSON) {
      return eval("(" + sJSON + ")");
    },
    stringify: (function () {
      var toString = Object.prototype.toString;
      var isArray =
        Array.isArray ||
        function (a) {
          return toString.call(a) === "[object Array]";
        };
      var escMap = {
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
      };
      var escFunc = function (m) {
        return (
          escMap[m] ||
          "\\u" + (m.charCodeAt(0) + 0x10000).toString(16).substr(1)
        );
      };
      var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
      return function stringify(value) {
        if (value == null) {
          return "null";
        } else if (typeof value === "number") {
          return isFinite(value) ? value.toString() : "null";
        } else if (typeof value === "boolean") {
          return value.toString();
        } else if (typeof value === "object") {
          if (typeof value.toJSON === "function") {
            return stringify(value.toJSON());
          } else if (isArray(value)) {
            var res = "[";
            for (var i = 0; i < value.length; i++)
              res += (i ? ", " : "") + stringify(value[i]);
            return res + "]";
          } else if (toString.call(value) === "[object Object]") {
            var tmp = [];
            for (var k in value) {
              if (value.hasOwnProperty(k))
                tmp.push(stringify(k) + ": " + stringify(value[k]));
            }
            return "{" + tmp.join(", ") + "}";
          }
        }
        return '"' + value.toString().replace(escRE, escFunc) + '"';
      };
    })(),
  };
}
