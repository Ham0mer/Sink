<script setup>
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const features = ref([
  {
    ms: '28.72',
    time:'2024-09-30',
  },
  {
    ms: '201.72',
    time:'2024-10-01',
  },
])
</script>
<template>
    <div class="grid gap-8 md:gap-16 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="item in features"
        :key="item.time"
        class="flex items-start gap-4"
      >
        <div class="w-8 h-8 p-2 mt-1 bg-black rounded-full shrink-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">
                  正常
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
