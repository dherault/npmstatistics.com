import store from './state/store'

const toJson = response => response.json()
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.npmstatistics.com' : 'http://localhost:7007'

async function fetchPackage(packageId) {
  const packageData = await fetch(`${baseUrl}/package/${packageId}`).then(toJson)

  store.dispatch({
    type: 'CREATE_PACKAGE',
    payload: {
      id: packageId,
      ...packageData,
    },
  })
}

export default {
  fetchPackage,
}
