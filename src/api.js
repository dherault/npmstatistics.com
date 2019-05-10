import store from './state/store'

function toJSON(response) {
  return response.json()
}

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.npmstatistics.com' : 'http://localhost:7000'

async function fetchPackage(packageId) {
  const [metadata, monthlyDownloads] = await Promise.all([
    fetch(`${baseUrl}/registry/${packageId}`).then(toJSON),
    fetch(`${baseUrl}/api/downloads/range/last-month/${packageId}`).then(toJSON),
  ])

  delete metadata.versions

  store.dispatch({
    type: 'CREATE_PACKAGE',
    payload: {
      id: packageId,
      ...metadata,
      monthlyDownloads,
    },
  })
}

export default {
  fetchPackage,
}
