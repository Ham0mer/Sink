<script setup>
import { BarChart } from '@/components/ui/chart-bar'
async function fetchData() {
    try {
        // const response = await fetch('https://server.dogb.cn/api/v1/monitor/16');
        const response = await fetch('https://server.dogb.cn/api/v1/monitor/16', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // 检查响应状态
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // 解析响应为 JSON

        // 创建一个对象用于存储每一天的总延迟和计数
        const dailyStats = {};

        // 遍历结果
        data.result.forEach(item => {
            item.created_at.forEach((timestamp, index) => {
                const date = new Date(timestamp).toISOString().split('T')[0]; // 格式化日期
                const delay = item.avg_delay[index];

                if (!dailyStats[date]) {
                    dailyStats[date] = { totalDelay: 0, count: 0 };
                }

                dailyStats[date].totalDelay += delay; // 累加延迟
                dailyStats[date].count += 1; // 计数
            });
        });

        // 计算每一天的平均延迟
        const averageDelays = Object.entries(dailyStats).map(([date, stats]) => {
            return {
                date: date,
                avgDelay: (stats.totalDelay / stats.count).toFixed(3) // 计算平均值并保留三位小数
            };
        });

        // 输出结果
        console.log(averageDelays);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// 调用函数
const features = fetchData();
</script>
<template>
  <BarChart
    :data="features"
    index="date"
    :categories="['avgDelay']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('us').format(tick).toString()} 毫秒`
        : ''
    }"
  />
</template>
