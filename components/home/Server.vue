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
  const msRange = [1, 10000]; // 毫秒数的范围（这里只是示例，实际可以根据需要调整）  
  
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
<template>
    <div class="grid gap-2 sm:grid-cols-15" style="grid-template-columns: repeat(15, 1fr);">
      <div
        v-for="item in features"
        :key="item.time"
        class="flex items-start gap-1"
      >
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button :variant="item.ms > 3000 ? 'destructive' : 'outline'">
                {{ item.ms > 3000 ? '异常' : '正常' }}
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
