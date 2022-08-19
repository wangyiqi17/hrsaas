<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
            >新建角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="180">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button size="small" type="success" @click="showRightDialog"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger" @click="onRemove(row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :page-sizes="[3, 5, 10, 20]"
            layout="sizes, prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
            @size-change="sizeChange"
          >
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="formData.companyAddress" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="formData.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 新建角色弹窗 -->

    <el-dialog
      @close="dialogClose"
      title="新建角色"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addRoleForm"
        :rules="addRoleFormRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限弹窗 -->
    <el-dialog
      @close="dialogClose"
      title="给角色分配权限"
      :visible.sync="setRightsDialog"
      width="50%"
    >
      <el-tree
        default-expand-all
        show-checkbox
        :data="permissions"
        :props="{ label: 'name' }"
        :default-checked-keys="defaultCheckKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRoleApi, removeRoleApi } from '@/api/role'
import { getCompanyInfoApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      defaultCheckKeys: ['1', '1063315016368918528'],
      permissions: [],
      setRightsDialog: false,
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 3,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        description: '',
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      },
      formData: {},
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getPermissions()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    sizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRoleApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },
    async onRemove(id) {
      await removeRoleApi(id)
      this.$message.success('删除成功')
      this.getRoles()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
    },
    showRightDialog() {
      this.setRightsDialog = true
    },
    async getPermissions() {
      const res = await getPermissionList()
      const treePermission = transListToTree(res, '0')
      this.permissions = treePermission
    },
  },
}
</script>

<style scoped lang="less"></style>
