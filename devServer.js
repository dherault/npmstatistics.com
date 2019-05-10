const http = require('http')
const https = require('https')
const url = require('url')

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })

  const pathName = url.parse(request.url).pathname

  console.log('pathName', pathName)

  const pathNameArray = pathName.split('/')

  pathNameArray.shift()

  const namespace = pathNameArray.shift()

  if (!(namespace === 'api' || namespace === 'registry')) {
    return response.end()
  }

  const proxyUrl = pathNameArray.join('/')

  https.get(`https://${namespace}.npmjs.org/${proxyUrl}`, res => {
    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', chunk => rawData += chunk)
    res.on('end', () => {
      response.write(rawData)
      response.end()
    })
  })
})
.listen(7000)
