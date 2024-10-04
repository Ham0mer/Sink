<script setup>
import { BarChart } from '@/components/ui/chart-bar'
// 创建响应式数据
const timeDelayCollection = ref([]);
const loading = ref(true);
const error = ref(null);

// 定义获取数据的函数
const fetchData = async () => {
  try {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/21');
    const data = await response.json();

    // 获取 result 的第一个元素
    const result = data.result[0];
    const createdAtList = result.created_at;
    const avgDelayList = result.avg_delay;

    // 确保最多循环 300 次
    const loopLimit = Math.min(createdAtList.length, 300);

    // 将时间和延迟 push 到集合
    for (let i = 0; i < loopLimit; i++) {
      const formattedDate = new Date(createdAtList[i] + 8 * 60 * 60 * 1000)
        .toLocaleString('zh-CN', { hour12: false });

      const delay = avgDelayList[i];

      // 将数据添加到集合中
      timeDelayCollection.value.push({
        time: formattedDate,
        ms: delay
      });
    }

    // 数据加载完成
    loading.value = false;
  } catch (err) {
    error.value = '数据获取失败: ' + err.message;
    loading.value = false;
  }
};
onMounted(() => {
  fetchData();
});
</script>
<template>
  <BarChart
    :data="timeDelayCollection"
    index="time"
    colors="#fdad32"
    :categories="['ms']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('us').format(tick).toString()} 毫秒`
        : ''
    }"
  />
</template>
