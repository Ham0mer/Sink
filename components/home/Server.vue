<script setup>
import CustomChartTooltip from './CustomChartTooltip.vue'
import { BarChart } from '@/components/ui/chart-bar'
// 定义获取数据的函数
const features = ref([]); // 用于存储处理后的数据

async function fetchData() {
  try {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/16');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    processData(data); // 处理获取到的数据
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}

function processData(data) {
  const dailyData = {};

  // 遍历时间戳和延迟数据
  data.result[0].created_at.forEach((timestamp, index) => {
    const date = new Date(timestamp + 8 * 60 * 60 * 1000).toISOString().split('T')[0]; // 转换为中国时区
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
  features.value = Object.keys(dailyData).map(date => {
    const avgDelay = dailyData[date].avg_delay.reduce((a, b) => a + b, 0) / dailyData[date].avg_delay.length;
    return {
      date: date,
      ms: parseFloat(avgDelay.toFixed(3)), // 保留三位小数
      count: dailyData[date].count
    };
  });
}

// 在组件挂载时调用 fetchData
onMounted(() => {
  fetchData();
});
</script>
<template>
  <BarChart
    :data="features"
    index="date"
    :categories="['ms']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('us').format(tick).toString()} 毫秒`
        : ''
    }"
    :custom-tooltip="CustomChartTooltip"
  />
</template>
