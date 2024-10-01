<script setup>
import { BarChart } from '@/components/ui/chart-bar'
async function fetchData() {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/16');
    const data = await response.json();

    return data.result[0];
}

async function analyzeData() {
    const { avg_delay, created_at } = await fetchData();

    // 提取 avg_delay 和 created_at
    const avgDelay = avg_delay;
    const createdAt = created_at;
    
    // 创建一个对象来存储每一天的延迟值
    const dailyData = {};
    
    // 获取当前时间和 30 天前的时间戳
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    
    // 遍历每个时间戳和对应的延迟
    for (let i = 0; i < createdAt.length; i++) {
        const timestamp = createdAt[i];
        const delay = avgDelay[i];
        
        // 只处理过去 30 天内的数据
        if (timestamp >= thirtyDaysAgo) {
            // 获取日期
            const date = new Date(timestamp).toISOString().split('T')[0];
    
            // 初始化日期数据
            if (!dailyData[date]) {
                dailyData[date] = {
                    totalDelay: 0,
                    count: 0
                };
            }
    
            // 累加延迟和计数
            dailyData[date].totalDelay += delay;
            dailyData[date].count += 1;
        }
    }
    
    // 计算平均延迟
    const result = Object.keys(dailyData).map(date => {
        const { totalDelay, count } = dailyData[date];
        const avg = totalDelay / count;
        
        return {
            date,
            avg_delay: avg,
            avg_connectivity: count // 假设联通性为样本数
        };
    });
    
    // 打印结果
    console.log(result);
    return result;
}
// 调用函数
const features = analyzeData();
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
