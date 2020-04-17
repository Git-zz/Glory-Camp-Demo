<template>
    <div class="register">
        <div class="bg">
            <img src="../assets/images/bgImg.jpg" width="100%" height="100%"/>
        </div>
        <div class="msg">
            <el-card header="用户注册" class="register-card" shadow="always">
                <el-form :model="form" :rules="rules" status-icon>
                    <el-form-item prop="username" required>
                        <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" required>
                        <el-input type="password" v-model="form.password" prefix-icon="el-icon-key" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass" required>
                        <el-input type="password" v-model="form.checkPass" prefix-icon="el-icon-key" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="nickname" required>
                        <el-input v-model="form.nickname" prefix-icon="el-icon-magic-stick" placeholder="请输入昵称" maxlength="10" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="registerForm" style="width: 100%">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            const validateUser = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                } else if (this.users.find(item => item.username == value) !== undefined) {
                    callback(new Error('用户名已存在'));
                } else {
                    callback();
                }
            };
            const validateNick = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('昵称不能为空'));
                } else if (this.users.find(item => item.nickname == value) !== undefined) {
                    callback(new Error('昵称已存在'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                users: [],
                form:{
                    username: '',
                    password: '',
                    checkPass: '',
                    nickname: ''
                },
                rules: {
                    username: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    nickname: [
                        { validator: validateNick, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
          this.$http.get('/user/list').then((data) => {
              this.users = data.data
          }).catch(err => {
              console.log(err)
          })
        },
        methods: {
            registerForm() {
                this.$http.post('/register', this.form).then((data) => {
                    sessionStorage.clear();
                    this.$router.push('/login')
                    this.$message({
                        type:'success',
                        message:'注册成功'
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .register-card{
        background-color: rgba(255, 255, 255, 0.2);
        text-align: center;
        color: #008080;
        font-size: 18px;
        font-weight: bolder;
    }
    .bg{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
    }
    .msg{
        z-index: 1;
        position: absolute;
        width: 320px;
        height: 324px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
    }
</style>
