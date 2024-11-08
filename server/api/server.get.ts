export default eventHandler(async () => {
  try {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/17')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    const result = data.result.find(item => item.monitor_id === 6)
    return result
  }
  catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
})
