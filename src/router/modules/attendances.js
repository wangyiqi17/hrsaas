import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  meta:{
    id:"attendances"
  },
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
