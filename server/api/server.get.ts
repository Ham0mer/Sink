export default eventHandler(async () => {
  try {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/21')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data.result[2]
  }
  catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
})
