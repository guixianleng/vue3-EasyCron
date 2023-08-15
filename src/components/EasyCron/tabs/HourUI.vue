<template>
  <div :class="`${prefixCls}-config-list`">
    <el-radio-group v-model="type">
      <div class="item">
        <el-radio :label="TypeEnum.every" v-bind="beforeRadioAttrs"> 每时 </el-radio>
      </div>
      <div class="item">
        <el-radio :label="TypeEnum.range" v-bind="beforeRadioAttrs"> 区间 </el-radio>
        <span> 从 </span>
        <el-input-number v-model="valueRange.start" v-bind="typeRangeAttrs" />
        <span> 时 至 </span>
        <el-input-number v-model="valueRange.end" v-bind="typeRangeAttrs" />
        <span> 时 </span>
      </div>
      <div class="item">
        <el-radio :label="TypeEnum.loop" v-bind="beforeRadioAttrs"> 循环 </el-radio>
        <span> 从 </span>
        <el-input-number v-model="valueLoop.start" v-bind="typeLoopAttrs" />
        <span> 时开始，间隔 </span>
        <el-input-number v-model="valueLoop.interval" v-bind="typeLoopAttrs" />
        <span> 时 </span>
      </div>
      <div class="item">
        <el-radio :label="TypeEnum.specify" v-bind="beforeRadioAttrs"> 指定 </el-radio>
        <div class="list">
          <el-checkbox-group v-model="valueList">
            <template v-for="i in specifyRange" :key="i">
              <el-checkbox :label="i" v-bind="typeSpecifyAttrs">
                {{ i }}
              </el-checkbox>
            </template>
          </el-checkbox-group>
        </div>
      </div>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useTabProps, useTabEmits, useTabSetup } from './useTabMixin'

  export default defineComponent({
    name: 'HourUI',
    props: useTabProps({
      defaultValue: '*',
    }),
    emits: useTabEmits(),
    setup(props, context) {
      return useTabSetup(props, context, {
        defaultValue: '*',
        minValue: 0,
        maxValue: 23,
        valueRange: { start: 0, end: 23 },
        valueLoop: { start: 0, interval: 1 },
      })
    },
  })
</script>
