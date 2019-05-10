function toJSON(response) {
  return response.json()
}

const baseUrl = 'https://6i82fb7gdg.execute-api.us-east-1.amazonaws.com/production/'
const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

async function fetchPackage(packageId) {
  const [metadata, monthlyDownloads] = await Promise.all([
    fetch(`${baseUrl}/registry/${packageId}`, fetchOptions).then(toJSON),
    fetch(`${baseUrl}/api/downloads/range/last-month/${packageId}`, fetchOptions).then(toJSON)
  ])

  console.log('metadata', metadata)
  console.log('monthlyDownloads', monthlyDownloads)
}

export default {
  fetchPackage,
}
