<template>
  <EasyCron
    v-model:value="editCronValue"
    :exeStartTime="exeStartTime"
    :hideYear="hideYear"
    :remote="remote"
    :hideSecond="hideSecond"
  />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import EasyCron from './EasyCronInner.vue'
  import { cronEmits, cronProps } from './easy.cron.data'

  const emit = defineEmits([...cronEmits])
  const props = defineProps({
    ...cronProps,
    placeholder: {
      type: String,
      default: '请输入cron表达式',
    },
    exeStartTime: {
      type: [Number, String, Object],
      default: 0,
    },
  })
  const editCronValue = ref(props.value)

  watch(
    () => props.value,
    (newVal) => {
      if (newVal !== editCronValue.value) {
        editCronValue.value = newVal
      }
    },
  )
  watch(editCronValue, (newVal) => {
    emit('change', newVal)
    emit('update:value', newVal)
  })
</script>
