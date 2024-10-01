<script setup>
import { AreaChart, Hourglass, Link, Paintbrush, ServerOff, Sparkles } from 'lucide-vue-next'

const features = ref([
  {
    title: '探针',
    description:
          '哪吒面板搭建的探针.',
    icon: Sparkles,
    link: 'https://server.dogb.cn',
  },
  {
    title: 'Bing每日壁纸',
    description:
          '每天一张高质量bing壁纸.',
    icon: AreaChart,
    link: 'https://server.dogb.cn',
  },
  {
    title: 'Bark',
    description:
          'Bark公益推送.',
    icon: ServerOff,
    link: 'https://msg.dogb.cn',
  },
  {
    title: '博客',
    description:
          '从10年前就断断续续，尝试过很多风格的，最后没有数据的博客.',
    icon: Paintbrush,
    link: 'https://dogb.cn',
  },
  {
    title: '私人短链接',
    description:
          '面条大佬的程序，部署在大善人Cloudflare.',
    icon: Link,
    link: 'https://qwq.gs',
  },
  {
    title: '小七商店',
    description:
          '独角数卡.',
    icon: Hourglass,
    link: 'https://777911.xyz',
  },
])
</script>

<template>
  <main class="pt-16 md:py-12">
    <div class="md:pb-12">
      <h2 class="text-4xl font-bold lg:text-5xl lg:tracking-tight">
        其他站点
      </h2>
      <p class="my-8 text-lg md:mb-0 text-slate-600">
        看起来有点乱
      </p>
    </div>

    <div class="grid gap-8 md:gap-16 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="item in features"
        :key="item.title"
        class="flex items-start gap-4"
      >
        <div class="w-8 h-8 p-2 mt-1 bg-black rounded-full shrink-0">
          <component
            :is="item.icon"
            class="w-4 h-4 text-white"
          />
        </div>
        <div>
          <a
            :href="item.link"
          >
            <h3 class="text-lg font-semibold">
              {{ item.title }}
            </h3>
          </a>
          <p class="mt-2 leading-relaxed text-slate-500">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
