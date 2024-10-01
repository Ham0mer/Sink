<script setup>
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
const generateData = (startDate, count) => {  
  const data = [];  
  const msRange = [1, 1000]; // 毫秒数的范围（这里只是示例，实际可以根据需要调整）  
  
  for (let i = 0; i < count; i++) {  
    // 生成随机毫秒数（这里转换为字符串，但通常应该是数字）  
    const ms = Math.floor(Math.random() * (msRange[1] - msRange[0] + 1)) + msRange[0].toString();  
  
    // 生成日期（假设startDate是一个有效的Date对象）  
    const date = new Date(startDate);  
    date.setDate(date.getDate() + i); // 增加天数  
    const time = date.toISOString().split('T')[0]; // 转换为YYYY-MM-DD格式  
  
    data.push({  
      ms: ms,  
      time: time,  
    });  
  }  
  
  return data;  
};
const startDate = new Date('2024-09-30');  
const features = generateData(startDate, 30); 
// const features = ref([
//   {
//     ms: '28.72',
//     time:'2024-09-30',
//   },
//   {
//     ms: '201.72',
//     time:'2024-10-01',
//   },
// ])
</script>
<style>
  .grid-container {
    display: grid;
    gap: 8px; /* 定义网格项的间距 */
  }

  /* 手机上显示8列 */
  @media (max-width: 767px) {
    .grid-container {
      grid-template-columns: repeat(6, 1fr); /* 8列 */
    }
  }

  /* 电脑上显示15列 */
  @media (min-width: 768px) {
    .grid-container {
      grid-template-columns: repeat(15, 1fr); /* 15列 */
    }
  }
</style>
<template>
    <div class="grid-container">
      <div
        v-for="item in features"
        :key="item.time"
        class="flex items-start gap-1"
      >
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button :variant="item.ms > 300 ? 'destructive' : ''">
                {{ item.ms > 300 ? '异常' : '正常' }}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ item.ms }}ms</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
</template>
