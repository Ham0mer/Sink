<script setup>
import { AreaChart } from '@/components/ui/chart-area'

const timeDelayCollection = ref([])

async function fetchData() {
  const result = await useAPI('/api/server')
  const createdAtList = result.created_at
  const avgDelayList = result.avg_delay
  const loopLimit = Math.min(createdAtList.length, 300)
  const startIndex = Math.max(0, createdAtList.length - loopLimit)
  for (let i = startIndex; i < createdAtList.length; i++) {
    const formattedTime = new Date(createdAtList[i])
      .toLocaleTimeString('zh-CN')
    const delay = avgDelayList[i]
    timeDelayCollection.value.push({
      time: formattedTime,
      ms: delay,
    })
  }
  loading.value = false
}
onMounted(() => {
  fetchData()
})
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
