<script setup>
import { AreaChart } from '@/components/ui/chart-area'
const timeDelayCollection = ref([]);
const loading = ref(true);
const error = ref(null);
const fetchData = async () => {
  try {
    const response = await fetch('https://server.dogb.cn/api/v1/monitor/21');
    const data = await response.json();
    const result = data.result[0];
    const createdAtList = result.created_at;
    const avgDelayList = result.avg_delay;
    const loopLimit = Math.min(createdAtList.length, 300);
    for (let i = 0; i < loopLimit; i++) {
      const formattedTime = new Date(createdAtList[i] + 8 * 60 * 60 * 1000)
        .toLocaleTimeString('zh-CN', { hour12: false });

      const delay = avgDelayList[i];
      timeDelayCollection.value.push({
        time: formattedDate,
        ms: delay
      });
    }
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
  <h2 class="font-bold text-center text-slate-600">
      每分钟延迟，来自中国内蒙古的一个随身WiFi
    </h2>
  <AreaChart 
    :data="timeDelayCollection" 
    index="time" 
    :categories="['ms']"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `${new Intl.NumberFormat('us').format(tick).toString()} 毫秒`
        : ''
    }"
  />
</template>
