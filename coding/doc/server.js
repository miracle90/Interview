const http = require('http')

http.createServer((req, res) => {
  console.log(req.url)
  console.log(req.headers)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end('hello world')
}).listen(3000, () => {
  console.log('server started at 3000')
})