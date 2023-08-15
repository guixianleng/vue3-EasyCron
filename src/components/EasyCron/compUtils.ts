/**
 * 简单实现防抖方法
 *
 * 防抖(debounce)函数在第一次触发给定的函数时，不立即执行函数，而是给出一个期限值(delay)，比如100ms。
 * 如果100ms内再次执行函数，就重新开始计时，直到计时结束后再真正执行函数。
 * 这样做的好处是如果短时间内大量触发同一事件，只会执行一次函数。
 *
 * @param fn 要防抖的函数
 * @param delay 防抖的毫秒数
 * @returns {Function}
 */
export function simpleDebounce(fn: any, delay = 100) {
  let timer: any | null = null
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 日期格式化
 * @param date 日期
 * @param block 格式化字符串
 */
export function dateFormat(date: Date, block: string) {
  if (!date) {
    return ''
  }
  let format = block || 'yyyy-MM-dd'
  date = new Date(date)
  const map: any = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  format = format.replace(/([yMdhmsqS])+/g, (all: any, t: any) => {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = `0${v}`
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return date
        .getFullYear()
        .toString()
        .substr(4 - all.length)
    }
    return all
  })
  return format
}
