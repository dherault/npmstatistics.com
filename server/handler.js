'use strict';
const https = require('https')

function getHttpsJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let rawData = ''
      res.setEncoding('utf8')
      res.on('data', chunk => rawData += chunk)
      res.on('end', () => resolve(JSON.parse(rawData)))
      res.on('error', error => reject(error))
    })
  })
}

function prependZero(number) {
  let string = number.toString()

  if (string.length === 1) string = `0${string}`

  return string
}

function toNpmDateFormat(date) {
  return `${date.getFullYear()}-${prependZero(date.getMonth() + 1)}-${prependZero(date.getDate())}`
}

function createResponse(bodyObject, statusCode = 200) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(bodyObject),
  }
}

async function getPackage(event, context) {
  const { packageId } = event.pathParameters

  const metadata = await getHttpsJson(`https://registry.npmjs.org/${packageId}`)

  if (metadata.error) {
    return createResponse(metadata)
  }

  delete metadata.versions

  let creation
  let today = toNpmDateFormat(new Date())

  if (metadata.time) {
    creation = toNpmDateFormat(new Date(metadata.time.created))
  }
  else {
    const d = new Date()

    d.setFullYear(d.getFullYear() - 1)

    creation = toNpmDateFormat(d)
  }

  const downloads = []

  while (today !== creation) {
    const downloadsData = await getHttpsJson(`https://api.npmjs.org/downloads/range/${creation}:${today}/${packageId}`)

    downloads.unshift(...downloadsData.downloads)

    if (today === downloadsData.start) break

    today = downloadsData.start
  }

  metadata.downloads = downloads

  return createResponse(metadata)
}

module.exports = {
  getPackage,
}
