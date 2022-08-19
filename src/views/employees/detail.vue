<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="登录账户设置" name="account">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="user">
            <userInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job">
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail, saveUserDetailById } from '@/api/user.js'
import jobInfo from './components/job-info.vue'
import userInfo from './components/user-info.vue'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      formData: {},
      activeName: Cookies.get('employeeDetailTab') || 'account',
    }
  },

  components: {
    userInfo,
    jobInfo,
  },

  created() {
    this.loadUserDetail()
  },

  methods: {
    async loadUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      this.formData = res
      console.log(res)
    },
    async onSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('更新成功')
    },
    handleTabClick() {
      Cookies.set('employeeDetailTab', this.activeName)
    },
  },
}
</script>

<style scoped lang="less"></style>
