import {RouteRecordRaw} from 'vue-router'

export default [
  {
    path: 'cell-table',
    component: () => import('../views/documents/cell-table.vue'),
  },
  {
    path: 'row-table',
    component: () => import('../views/documents/row-table.vue')
  }
] as RouteRecordRaw[]
