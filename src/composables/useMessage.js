import {ref} from 'vue'
import {nanoid} from 'nanoid'

export const stack = ref([])

export function remove (id) {
  const index = stack.value.findIndex(it => it.props?.id === id)
  index > -1 && stack.value.splice(index, 1)
}

export function useMessage (props) {
  props.id = nanoid(4)
  stack.value.unshift({props})

  return () => remove(props.id)
}
