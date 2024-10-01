<script setup>
import { BarChart } from '@/components/ui/chart-bar'
// 定义获取数据的函数
async function fetchData() {
  try {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/16');
    
    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 处理数据
    processData(data);
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}

// 数据处理函数
function processData(data) {
  const dailyData = {};

  // 遍历时间戳和延迟数据
  data.result[0].created_at.forEach((timestamp, index) => {
    const date = new Date(timestamp + 8 * 60 * 60 * 1000).toISOString().split('T')[0]; // 获取日期部分
    const delay = data.result[0].avg_delay[index];

    // 初始化日期数据
    if (!dailyData[date]) {
      dailyData[date] = { avg_delay: [], count: 0 };
    }

    // 收集延迟数据
    dailyData[date].avg_delay.push(delay);
    dailyData[date].count += 1;
  });

  // 计算每天的平均延迟
  const dailyResults = Object.keys(dailyData).map(date => {
    const avgDelay = dailyData[date].avg_delay.reduce((a, b) => a + b, 0) / dailyData[date].avg_delay.length;
    return {
      date: date,
      average_delay: avgDelay,
      count: dailyData[date].count
    };
  });
  return dailyResults;
}
// 调用函数
const features = fetchData();
console.log(features);
</script>
<template>
  <BarChart
    :data="features"
    index="date"
    :categories="['average_delay']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('us').format(tick).toString()} 毫秒`
        : ''
    }"
  />
</template>
