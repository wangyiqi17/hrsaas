<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <TreeTools @add="showAddDept" :isRoot='true' :treeNode="company" />
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- 这是作用域插槽 -->
          <!-- v-slot 获取组件内部slot提供的数据 -->
          <template v-slot="{ data }">
            <TreeTools @add="showAddDept" @remove='loadDepts' @edit="showEdit" :treeNode="data" />
          </template>
        
        </el-tree>
      </el-card>
    </div>

    <!-- 添加部门弹层 -->
    <add-dept ref="addDept" @add-success="loadDepts" :visible.sync="dialogVisible" :currentNode="currentNode" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  data() {
    return {
      defaultProps: { label: 'name' },
      company:{
         name:'传智教育', manager:'负责人' 
      },
      currentNode:{},
      dialogVisible: false,
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      loading:"false"
    }
  },
  components:{
    TreeTools,
    AddDept
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      loading = "true"
      const res = await getDeptsApi()
      this.treeData = transListToTree(res.depts, '')
      loading = "false"
    },
    showAddDept(val) {
      this.dialogVisible=true,
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogVisible=true
      this.$refs.addDept.getDeptById(val.id)
    }
  },
}
</script>

<style scoped>
.el-card {
  padding: 30px  140px;
  font-size:14px;
}
</style></style>
