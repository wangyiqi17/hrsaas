import enLocale from 'element-ui/lib/locale/lang/en'
export default {
    name:"Eng",
    dashboard:{
      calendar:'calendar',
      progress:'progress',
    },
    ...enLocale,
    route:{
      首页:'dashboard',
      员工:"employees",
      审批:"approvals",
      组织架构:"departments",
      考勤:"attendances",
      权限管理:"permission",
      工资:"salary",
      公司设置:"setting",
      社保:"social"
    }
  }