<template>
  <NuxtLink class="text-primary-500 font-bold" :to="to">
    <slot />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: String,
});
</script>
