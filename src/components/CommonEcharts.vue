<template>
  <div ref="commonEchartsRef" :style="{ width, height }"></div>
</template>
<script setup lang='ts'>
import useEcharts from '@/hooks/useEcharts';
import { onMounted, ref, watchEffect } from 'vue';
const commonEchartsRef = ref<HTMLElement>()
const props = withDefaults(defineProps<{ width: string, height: string, options: any }>(), { width: '100%', height: '360px' })
onMounted(() => {
  const { setOptions, resize } = useEcharts(commonEchartsRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
  window.addEventListener('resize', () => {
    resize();
  })
})
</script>
<style scoped lang='scss'>
</style>