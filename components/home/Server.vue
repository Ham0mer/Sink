<script setup>
import { BarChart } from '@/components/ui/chart-bar'
// 定义获取数据的函数
const features = ref([]);

async function fetchData() {
  try {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/16');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    processData(data);
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}

function processData(data) {
  const dailyData = {};
  data.result[0].created_at.forEach((timestamp, index) => {
    const date = new Date(timestamp + 8 * 60 * 60 * 1000).toISOString().split('T')[0];
    const delay = data.result[0].avg_delay[index];
    if (!dailyData[date]) {
      dailyData[date] = { avg_delay: [], count: 0 };
    }
    dailyData[date].avg_delay.push(delay);
    dailyData[date].count += 1;
  });
let dailyResults = Object.keys(dailyData).map(date => {
  const avgDelay = dailyData[date].avg_delay.reduce((a, b) => a + b, 0) / dailyData[date].avg_delay.length;
  return {
    date: date,
    ms: parseFloat(avgDelay.toFixed(3)),
    count: dailyData[date].count
  };
});
const totalRequired = 30;
const lastDate = new Date(dailyResults[dailyResults.length - 1]?.date);
while (dailyResults.length < totalRequired) {
  lastDate.setDate(lastDate.getDate() + 1);
  dailyResults.push({
    date: lastDate.toISOString().split('T')[0],
    ms: 0,
    count: 0
  });
}
features.value = dailyResults.slice(0, totalRequired);
}
onMounted(() => {
  fetchData();
});
</script>
<template>
  <BarChart
    :data="features"
    index="date"
    colors="#ffffff"
    :categories="['ms']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('us').format(tick).toString()} 毫秒`
        : ''
    }"
  />
</template>
