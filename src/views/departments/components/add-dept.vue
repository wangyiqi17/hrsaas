<template>
  <!-- 灰色弹层是el-dialog组件内部的 -->
  <!-- 组件内部点击灰色遮罩 在修改visible -->
  <!-- this.$emit('update:visible', false) -->

  <!-- .sync 修饰符的作用 -->
  <!-- :visible="visible" 父向子传值 -->
  <!-- @update:visible="visible = $event" -->
  <el-dialog
    @close="onClose"
    :title="dialogTitle"
    :visible="visible"
    width="50%"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 100%"
          placeholder="请选择部门负责人"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="请选择活动区域"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptApi,
  getDeptByIdApi,
  editDeptsApi,
} from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        const filtersDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id,
        )
        const isRepeat = filtersDepts.some((item) => item.name === value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        // console.log(this.currentNode)
        if (!this.currentNode.children) return callback()
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value,
        )
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }

    const checkDeptCode = async (rule, value, cb) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? cb(new Error('部门编码重复')) : cb()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: checkDeptName, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { validator: checkDeptCode, trigger: 'blur' },
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请选择活动区域', trigger: 'blur' },
        ],
      },
      employees: [],
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    async getEmployeesList() {
      const res = await getEmployeesApi()
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      }
    },
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          await editDeptsApi(this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          this.formData.pid = this.currentNode.id
          await addDeptApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (err) {
        this.$message.error('新增部门失败')
      }
    },

    async getDeptById(id) {
      // console.log(id)
      this.formData = await getDeptByIdApi(id)
    },
  },
  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
}
</script>
