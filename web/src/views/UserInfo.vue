<template>
    <div class="userInfo">
        <div class="d-flex ai-center py-3 px-2 border-bottom" style="font-size: 20px">
            <div @click="$router.back(-1)" style="cursor: pointer">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div>个人信息</div>
        </div>
        <div class="bg-white pt-2 px-2">
            <div class="avatar d-flex ai-center border-bottom">
                <div class="flex-1">用户名</div>
                <div class="text-grey-1">{{this.model.username}}</div>
            </div>
            <div class="avatar d-flex ai-center border-bottom">
                <div class="flex-1">密码</div>
                <div class="text-grey-1">修改密码</div>
                <div style="cursor: pointer" @click="passVisible = true"><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="avatar d-flex ai-center border-bottom">
                <div class="flex-1">头像</div>
                <div class="block"><el-avatar shape="square" :size="100" :src="model.avatar"></el-avatar></div>
                <div style="cursor: pointer" @click="avatarVisible = true"><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="avatar d-flex ai-center">
                <div class="flex-1">昵称</div>
                <div class="text-grey-1">{{this.model.nickname}}</div>
                <div style="cursor: pointer" @click="nickVisible = true"><i class="el-icon-arrow-right"></i></div>
            </div>
        </div>

<!--        修改密码弹出框-->
        <el-dialog
                title="修改密码"
                :visible.sync="passVisible"
                width="30%"
                :before-close="handleClose" center>
            <el-form :model="form" :rules="rules" status-icon>
                <el-form-item prop="oldPass" required>
                    <el-input type="password" v-model="form.oldPass" prefix-icon="el-icon-key" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item prop="newPass" required>
                    <el-input type="password" v-model="form.newPass" prefix-icon="el-icon-key" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="passVisible = false">取 消</el-button>
                    <el-button type="primary" @click="postPass">确 定</el-button>
                </span>
        </el-dialog>

<!--        修改头像弹出框-->
        <el-dialog
                title="修改头像"
                :visible.sync="avatarVisible"
                width="30%"
                :before-close="handleClose" center>
            <div style="text-align: center">
                <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :show-file-list="false"
                        :on-success="res => model.avatar = res.url">
                    <el-avatar shape="square" :size="100" :src="model.avatar"></el-avatar>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="avatarVisible = false">取 消</el-button>
                    <el-button type="primary" @click="postAvatar">确 定</el-button>
                </span>
        </el-dialog>

<!--        修改昵称-->
        <el-dialog
                title="修改昵称"
                :visible.sync="nickVisible"
                width="30%"
                :before-close="handleClose" center>
            <el-form :model="form" :rules="rules" status-icon>
                <el-form-item prop="nickname" required>
                    <el-input v-model="form.nickname" placeholder="请输入昵称" maxlength="10" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="nickVisible = false">取 消</el-button>
                    <el-button type="primary" @click="postNick">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data(){
            const validateOld = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原密码'));
                } else if (value !== sessionStorage.password){
                    callback(new Error('密码错误!'));
                } else {
                    callback();
                }
            };
            const validateNew = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    callback();
                }
            };
            const validateNick = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入昵称'));
                } else {
                    callback();
                }
            };
            return {
                model: {},
                comments: [],
                passVisible: false,
                avatarVisible: false,
                nickVisible: false,
                form: {
                    oldPass: '',
                    newPass: '',
                    nickname: ''
                },
                rules: {
                    oldPass: [
                        { validator: validateOld, trigger: 'blur' }
                    ],
                    newPass: [
                        { validator: validateNew, trigger: 'blur' }
                    ],
                    nickname: [
                        { validator: validateNick, trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.fetch()
        },
        methods: {
            async fetch () {
                const res = await this.$http.get('/user/list')
                res.data.forEach(ele => {
                    if (sessionStorage.username == ele.username) {
                        this.model = ele
                    }
                })
                if (!this.model.avatar) {
                    this.model.avatar = require('../assets/images/default.png')
                }
            },
            async postPass() {
                if (this.form.newPass) {
                    this.$set(this.model, 'password', this.form.newPass)
                    const res=await this.$http.put(`/user/${this.model._id}`, this.model)
                    this.passVisible = false
                    if (res.status == 200) {
                        this.$message({
                            type:'error',
                            message:'请重新登入'
                        })
                        this.$router.push('/login')
                    }
                } else {
                    this.$message({
                        type:'error',
                        message:'修改失败！'
                    })
                }
            },
            async postAvatar() {
                const res = await this.$http.put(`/user/${this.model._id}`, this.model)
                if (res.status == 200) {
                    this.avatarVisible = false
                }
            },
            async postNick() {
                if (this.form.nickname) {
                    this.model.nickname = this.form.nickname
                    const res = await this.$http.put(`/user/${this.model._id}`, this.model)
                    if (res.status == 200) {
                        this.nickVisible = false
                    }
                } else {
                    this.$message({
                        type:'error',
                        message:'修改失败！'
                    })
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        },
        watch: {
            nickVisible(val) {
                if (val) {
                    this.form.nickname = this.model.nickname
                }
            }
        }
    }
</script>

<style scoped>
    .avatar{
        height: 116px;
        font-size: 24px;
    }
</style>
