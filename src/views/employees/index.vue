<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="AddEmployees"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                :src="row.staffPhoto"
                alt=""
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button
                type="text"
                size="small"
                @click="showAssignDialog(row.id)"
                >角色</el-button
              >
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :total="total"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
    <add-employees
      @add-success="getEmployeesList"
      :visible.sync="showAddEmployees"
    />
    <el-dialog title="头像二维码" :visible.sync="ercodeDialog" width="30%">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <assign-role
      :employeesId="currentEmployeesId"
      :visible.sync="showAssignRole"
    ></assign-role>
  </div>
</template>

<script>
// import { export_json_to_excel } from '@/vender/Export2Excel'
import { getEmployeesInfoApi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import AddEmployees from './components/add-employees.vue'
import QRcode from 'qrcode'
import AssignRole from './components/assign-role.vue'
const { exportExcelMapPath, hireType } = employees
export default {
  name: 'Employees',
  data() {
    return {
      currentEmployeesId: '',
      showAssignRole: false,
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 5,
      },
      showAddEmployees: false,
      ercodeDialog: false,
    }
  },
  components: {
    AddEmployees,
    AssignRole,
  },

  created() {
    this.getEmployeesList()
  },

  methods: {
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.employees = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    formatFormOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async onRemove(id) {
      await this.$confirm('是否删除该员工？')
      await delEmployee(id)
      this.$message.success('删除成功')
      this.getEmployeesList()
    },
    AddEmployees() {
      this.showAddEmployees = true
    },
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesInfoApi({
        page: 1,
        size: this.total,
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户还未设置头像')
      this.ercodeDialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, staffPhoto)
      })
    },
    showAssignDialog(id) {
      this.showAssignRole = true
      this.currentEmployeesId = id
    },
  },
}
</script>

<style scoped lang="less"></style>
