<template>
  <div>
    <el-dialog
      @open="onOpen"
      @close="close"
      title="分配角色"
      :visible="visible"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="assignRole">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  data() {
    return {
      checkList: [],
      roles: [],
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    employeesId: {
      type: String,
      required: true,
    },
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    async getRolesList() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetail(this.employeesId)
      this.checkList = roleIds
    },
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      console.log(this.checkList)
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList,
      })
      this.$message.success('分配成功')
      this.close()
    },
  },
}
</script>

<style scoped lang="less"></style>
