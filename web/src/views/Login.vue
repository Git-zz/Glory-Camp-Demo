<template>
    <div class="login" >
        <div class="bg">
            <img src="../assets/images/bgImg.jpg" width="100%" height="100%"/>
        </div>
        <div class="msg">
            <el-card header="用户登录" class="login-card">
                <el-form :model="model" :rules="rules" status-icon>
                    <el-form-item prop="username" style="margin-top: 2rem">
                        <el-input v-model="model.username" suffix-icon="el-icon-user" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" style="margin-top: 3rem">
                        <el-input type="password" placeholder="密码" v-model="model.password" suffix-icon="el-icon-key" @keyup.enter.native="login()"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 3rem">
                        <el-button type="primary" @click="login" style="width: 45%" round>登录</el-button>
                        <el-button type="success" @click="register" style="width: 45%; margin-left: 10%" round>注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            const validateUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入用户名'));
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
                model: {
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
            register() {
                sessionStorage.token = 'register'
                this.$router.push('/register')
            },
            async login(){
                if (this.model.username && this.model.password) {
                    const res=await this.$http.post('login', this.model)
                    sessionStorage.token=res.data.token
                    this.$router.push('/')
                    this.$store.commit('set_userInfo', this.model)
                    this.$message({
                        type:'success',
                        message:'登录成功'
                    })
                } else {
                    this.$message({
                        type:'error',
                        message:'用户名或密码不能为空！'
                    })
                }
            }
        }

    }
</script>

<style scoped>
    .bg{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
    }
    .login-card{
        background-color: rgba(255, 255, 255, 0.2);
        text-align: center;
        color: #008080;
        font-size: 16px;
        font-weight: bold;
    }
    .msg{
        z-index: 1;
        position: absolute;
        width: 320px;
        height: 324px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
