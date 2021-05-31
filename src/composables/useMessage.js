import {ref} from 'vue'
import {nanoid} from 'nanoid'

export const stack = ref([])

export function remove (id) {
  const index = stack.value.findIndex(it => it.id === id)
  index > -1 && stack.value.splice(index, 1)
}

export function useMessage (props) {
  const id = nanoid(4)
  stack.value.push({id, ...props})

  return () => remove(id)
}
