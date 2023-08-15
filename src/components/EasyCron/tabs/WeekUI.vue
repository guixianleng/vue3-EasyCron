<template>
  <div :class="`${prefixCls}-config-list`">
    <el-radio-group v-model="type">
      <div class="item">
        <el-radio :label="TypeEnum.unset" v-bind="beforeRadioAttrs"> 不设置 </el-radio>
        <span class="tip-info">日和周只能设置其中之一</span>
      </div>
      <div class="item">
        <el-radio :label="TypeEnum.range" v-bind="beforeRadioAttrs"> 区间 </el-radio>
        <span> 从 </span>
        <el-select v-model="valueRange.start" v-bind="typeRangeSelectAttrs">
          <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span> 至 </span>
        <el-select v-model="valueRange.end" v-bind="typeRangeSelectAttrs">
          <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="item">
        <el-radio :label="TypeEnum.loop" v-bind="beforeRadioAttrs"> 循环 </el-radio>
        <span> 从 </span>
        <el-select v-model="valueLoop.start" v-bind="typeLoopSelectAttrs">
          <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span> 开始，间隔 </span>
        <el-input-number v-model="valueLoop.interval" v-bind="typeLoopAttrs" />
        <span> 天 </span>
      </div>
      <div class="item">
        <el-radio :label="TypeEnum.specify" v-bind="beforeRadioAttrs"> 指定 </el-radio>
        <div class="list list-cn">
          <el-checkbox-group v-model="valueList">
            <template v-for="opt in weekOptions" :key="opt">
              <el-checkbox :label="opt.value" v-bind="typeSpecifyAttrs">
                {{ opt.label }}
              </el-checkbox>
            </template>
          </el-checkbox-group>
        </div>
      </div>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
  import { computed, watch, defineComponent } from 'vue'
  import { useTabProps, useTabEmits, useTabSetup, TypeEnum } from './useTabMixin'

  const WEEK_MAP_EN: any = {
    1: 'SUN',
    2: 'MON',
    3: 'TUE',
    4: 'WED',
    5: 'THU',
    6: 'FRI',
    7: 'SAT',
  }

  const WEEK_MAP_CN: any = {
    1: '周日',
    2: '周一',
    3: '周二',
    4: '周三',
    5: '周四',
    6: '周五',
    7: '周六',
  }

  export default defineComponent({
    name: 'WeekUI',
    props: useTabProps({
      defaultValue: '?',
      props: {
        day: { type: String, default: '*' },
      },
    }),
    emits: useTabEmits(),
    setup(props, context) {
      const disabledChoice = computed(() => {
        return (props.day && props.day !== '?') || props.disabled
      })
      const setup = useTabSetup(props, context, {
        defaultType: TypeEnum.unset,
        defaultValue: '?',
        minValue: 1,
        maxValue: 7,
        // 0,7表示周日 1表示周一
        valueRange: { start: 1, end: 7 },
        valueLoop: { start: 2, interval: 1 },
        disabled: disabledChoice,
      })
      const weekOptions = computed(() => {
        const options: { label: string; value: number }[] = []
        for (const weekKey of Object.keys(WEEK_MAP_CN)) {
          const weekName: string = WEEK_MAP_CN[weekKey]
          options.push({
            value: Number.parseInt(weekKey),
            label: weekName,
          })
        }
        return options
      })

      const typeRangeSelectAttrs = computed(() => ({
        class: ['w80'],
        disabled: setup.typeRangeAttrs.value.disabled,
      }))

      const typeLoopSelectAttrs = computed(() => ({
        class: ['w80'],
        disabled: setup.typeLoopAttrs.value.disabled,
      }))

      watch(
        () => props.day,
        () => {
          setup.updateValue(disabledChoice.value ? '?' : setup.computeValue.value)
        },
      )

      return {
        ...setup,
        weekOptions,
        typeLoopSelectAttrs,
        typeRangeSelectAttrs,
        WEEK_MAP_CN,
        WEEK_MAP_EN,
      }
    },
  })
</script>
