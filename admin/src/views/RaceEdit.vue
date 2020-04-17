<template>
  <div class="edit">
    <div style="height: 30px; margin-bottom: 30px; color: #545c64; font-size: 20px; font-weight: bold">
      <i class="el-icon-film"></i>
      <span style="margin-left: 8px">{{id ? '编辑' : '新建'}}赛事视频</span>
    </div>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories[0]">
          <el-option v-for="item in categories"
                     :key="item._id"
                     :label="item.name"
                     :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res=>$set(model,'avatar',res.url)">
          <!--                        :before-upload="beforeAvatarUpload">-->
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res=>$set(model,'cover',res.url)">
          <!--                        :before-upload="beforeAvatarUpload">-->
          <img v-if="model.cover" :src="model.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="点击率">
        <el-input v-model="model.click"></el-input>
      </el-form-item>
      <el-form-item label="视频文件" style="width: 486px">
        <el-upload
                class="upload-demo"
                drag
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "RaceEdit",
    props:{
      id:{ }
    },
    data(){
      return{
        model:{
          categories: []
        },
        categories:[],
        fileList: []
      }
    },
    methods:{
      async save(){
        let res
        if (this.id){
          res=await this.$http.put(`rest/races/${this.id}`,this.model)
        } else {
          res=await this.$http.post('rest/races',this.model)
        }
        this.$router.push('/races/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
      async fetch(){
        const res=await this.$http.get(`rest/races/${this.id}`)
        this.model=res.data
        if (this.model.source) {
          let obj = { name: this.model.source, url: this.model.source }
          this.fileList.push(obj)
        }
      },
      async fetchCategories(){
        const res=await this.$http.get(`rest/categories`)
        res.data.forEach(ele => {
          if (ele.parent && ele.parent.name == '赛事视频分类') {
            let obj = {
              _id: ele._id,
              name: ele.name
            }
            this.categories.push(obj)
          }
        })
      },
      handleSuccess(res) {
        this.$set(this.model, 'source', res.url)
        let obj = { name: this.model.source, url: this.model.source }
        this.fileList.push(obj)
      },
      handleRemove(file, fileList) {
        this.model.source = ''
        this.fileList = []
      }
    },
    created() {
      this.id&&this.fetch()
      this.fetchCategories()
    }
  }
</script>

<style scoped>

</style>
