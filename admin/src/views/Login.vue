 <template>
     <div class="login-container">
         <div class="bg">
             <img src="../assets/bgImg.jpg" width="100%" height="100%"/>
         </div>
         <div class="login">
             <el-card header="后台管理系统" class="login-card">
                 <el-form :model="model" :rules="rules" status-icon>
                     <el-form-item prop="username" style="margin-top: 1rem">
                         <el-input v-model="model.username"  suffix-icon="el-icon-user" placeholder="账号"></el-input>
                     </el-form-item>
                     <el-form-item prop="password" style="margin-top: 2rem">
                         <el-input type="password" placeholder="密码" v-model="model.password" suffix-icon="el-icon-lock" @keyup.enter.native="login()"></el-input>
                     </el-form-item>
                     <el-form-item style="margin-top: 2rem">
                         <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
                     </el-form-item>
                 </el-form>
             </el-card>
         </div>
     </div>
 </template>

 <script>
      export default{
        name: 'login',
        data(){
            const validateUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
          return{
            model:{
                username: '',
                password: ''
            },
              rules: {
                  username: [
                      { validator: validateUser, trigger: 'blur' }
                  ],
                  password: [
                      { validator: validatePass, trigger: 'blur' }
                  ]
              }
          }
        },
        methods:{
          async login(){
            const res=await this.$http.post('login', this.model)
            sessionStorage.token=res.data.token
              sessionStorage.password = this.model.password
            this.$router.push('/')
            this.$message({
              type:'success',
              message:'登录成功'
            })
          }
        }
      }
</script>
<style scoped>
    .login-card{
        background-color: rgba(255, 255, 255, 0.2);
        text-align: center;
    }
    .bg{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
    }
    .login{
        z-index: 1;
        position: absolute;
        width: 320px;
        height: 324px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
