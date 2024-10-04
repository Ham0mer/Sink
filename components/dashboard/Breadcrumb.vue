<script setup>
import { NuxtLink } from '#components'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Breadcrumb class="flex justify-between">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          首页
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink
          :as="NuxtLink"
          to="/dashboard"
        >
          面板
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{{ title }}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>

    <DashboardLogout />
  </Breadcrumb>
</template>
