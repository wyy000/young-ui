import {createPopper} from '@popperjs/core'
import {nanoid} from 'nanoid'
import {nextTick} from 'vue'

/**
 * @example
 * [
 *   [36df, {
 *     event: 'click',
 *     handler: () => {...},
 *     visitable: false,
 *     stop: () => {...},
 *   }],
 * ]
 */
const stack = []
let _id = 0

/**
 * 关联el与popper实例
 * @param el
 * @param config
 * @returns {*}
 */
function update (el, {value: config}) {
  console.log(el, config)
  if (!el || !config.popper) return

  let event = config.event ?? 'click'
  let id = el.popperId ?? nanoid(4)

  if (!el.popperId) {
    addId()
    el.popperId = id
    let state = { visitable: false }
    if (config.handler) state.handler = config.handler
    if (config.stop) state.stop = config.stop
    stack.push([id, state])
    el.addEventListener(event, updatePopper, true)
  } else {
    // popper更新函数
  }

  async function updatePopper () {
    // createPopper(el, config.popper.$ref.comp, {...config})
    let popper = stack.find(it => it[0] === id)
    popper.visitable = !popper.visitable
    await nextTick()
    popper.handle?.()
  }
}

function remove (el) {
  const index = stack.findIndex(it => it[0] === el.popperId)
  stack.splice(index, 1)
}

function addId () {
  _id++
}

if (!_id) {
  document.addEventListener('click', handle, true)
}

function handle ({target}) {
  let current = target
  do {
    if (current.hasAttribute('data-prevent-clickaway')) return
    else if (current.hasAttribute('data-trigger-clickaway')) {
      const index = stack.findIndex(it => it[0] === current.popperId)
      current.visitable = !current.visitable
      stack[index].handle?.()
      return
    }
    current = current.parentElement
  } while (current)
  stack.forEach(it => {
    it[1].visitable = false
  })
}

export default {
  mounted: update,
  updated: update,
  unmounted: remove,
}
