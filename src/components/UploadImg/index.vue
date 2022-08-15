<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0,0,0,0.8)"
      :file-list="fileList"
      action="#"
      :http-request="onRequest"
      list-type="picture-card"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
      :limit="1"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// AKID3xd6MM6pJxPccNuCk7F8wfBTbX1IJ6h7
// GHArLbeS1NXcUBewznNjtpaBbrvlMjsn
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKID3xd6MM6pJxPccNuCk7F8wfBTbX1IJ6h7',
  SecretKey: 'GHArLbeS1NXcUBewznNjtpaBbrvlMjsn',
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      loading: false,
      fileList: [],
      previewImgDialog: false,
      imgUrl: '',
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'nhls-pp-1313341670' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('亲，上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
      console.log(this.fileList)
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '格式的图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超过2mb')
        return false
      }
    },
  },
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
