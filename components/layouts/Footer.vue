<script setup>
import { GmailIcon, TelegramIcon } from 'vue3-simple-icons'

const email = ref(null)
onMounted(() => {
  email.value.href = email.value.href.replace('$', '@')
})
</script>

<template>
  <section class="md:pt-6">
    <div class="container flex flex-col items-center py-8 mx-auto sm:flex-row">
      <a
        href="https://github.com/ccbikai/Sink"
        class="text-xl font-black leading-none text-gray-900 select-none dark:text-gray-100 logo"
        title="Sink"
      >Sink</a>
      <a
        class="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0"
        href="https://qwq.gs"
        target="_blank"
        title="QWQ.GS"
      >
        &copy; {{ new Date().getFullYear() }} Products of QWQ.GS
      </a>
      <span
        class="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start"
      >
        <a
          ref="email"
          href="mailto:w$qwq.gs"
          title="Email"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Email</span>
          <GmailIcon
            class="w-6 h-6"
          />
        </a>
        <a
          href="https://qwq.gs/me"
          target="_blank"
          title="Telegram"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Telegram</span>
          <TelegramIcon
            class="w-6 h-6"
          />
        </a>

      </span>
    </div>
  </section>
</template>
