<script setup>
import { BarChart } from '@/components/ui/chart-bar'
async function fetchData() {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/16');
    const data = await response.json();

    return data.result[0];
}

async function analyzeData() {
    const { avg_delay, created_at } = await fetchData();

    const dailyData = {};
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

    for (let i = 0; i < created_at.length; i++) {
        const timestamp = created_at[i];
        const delay = avg_delay[i];

        if (timestamp >= thirtyDaysAgo) {
            const date = new Date(timestamp).toISOString().split('T')[0];

            if (!dailyData[date]) {
                dailyData[date] = {
                    totalDelay: 0,
                    count: 0
                };
            }

            dailyData[date].totalDelay += delay;
            dailyData[date].count += 1;
        }
    }

    const result = Object.keys(dailyData).map(date => {
        const { totalDelay, count } = dailyData[date];
        const avg = totalDelay / count;

        return {
            date,
            avg_delay: avg,
            avg_connectivity: count
        };
    });

    console.log(result);
    return result;
}
// 调用函数
const features = fetchData();
</script>
<template>
  <BarChart
    :data="features"
    index="date"
    :categories="['avg_delay']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('us').format(tick).toString()} 毫秒`
        : ''
    }"
  />
</template>
