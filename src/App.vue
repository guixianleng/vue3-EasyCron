<template>
  <div class="content">
    <div class="title">cron表达式：</div>
    <EasyCron v-model:value="cronVal" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { EasyCron } from './components/EasyCron'

  const cronVal = ref<string>('* * * * * ? *')
</script>

<style lang="scss" scoped>
  .content {
    width: 1000px;
    margin: 20px auto;
    .title {
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 600;
      color: #000;
    }
  }
</style>
