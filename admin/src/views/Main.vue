<template>
    <el-container style="height: 100vh">
        <el-aside width="200px" style="background-color: #545c64">
            <el-menu router
                     unique-opened
                     :default-active="this.$route.path"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">   <!--:default-openeds="['1']"  默认展开哪一个-->
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-chat-dot-square"></i>内容管理</template>
                    <el-menu-item-group>
                        <template slot="title">装备</template>
                        <el-menu-item index="/items/create">新建装备</el-menu-item>
                        <el-menu-item index="/items/list">装备列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">英雄</template>
                        <el-menu-item index="/heros/create">新建英雄</el-menu-item>
                        <el-menu-item index="/heros/list">英雄列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">新闻</template>
                        <el-menu-item index="/articles/create">新建新闻</el-menu-item>
                        <el-menu-item index="/articles/list">新闻列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">视频</template>
                        <el-menu-item index="/videos/create">新建视频</el-menu-item>
                        <el-menu-item index="/videos/list">视频列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">攻略</template>
                        <el-menu-item index="/ways/create">新建攻略</el-menu-item>
                        <el-menu-item index="/ways/list">攻略列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">赛事</template>
                        <el-menu-item index="/races/create">新建赛事视频</el-menu-item>
                        <el-menu-item index="/races/list">赛事视频列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">比赛</template>
                        <el-menu-item index="/games/create">新建比赛</el-menu-item>
                        <el-menu-item index="/games/list">比赛列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-s-custom"></i>运营管理</template>
                    <el-menu-item-group>
                        <template slot="title">评论</template>
<!--                        <el-menu-item index="/comments/create">新建评论</el-menu-item>-->
                        <el-menu-item index="/comments/list">评论列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
                    <el-menu-item-group>
                        <template slot="title">分类</template>
                        <el-menu-item index="/categories/create">新建分类</el-menu-item>
                        <el-menu-item index="/categories/list">分类列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">用户</template>
<!--                        <el-menu-item index="/users/create">新建用户</el-menu-item>-->
                        <el-menu-item index="/users/list">用户列表</el-menu-item>
<!--                        <el-menu-item index="/admins/create">新建管理员</el-menu-item>-->
<!--                        <el-menu-item index="/admins/list">管理员列表</el-menu-item>-->
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="position: relative">
                <div style="position: absolute; display: flex; right: 0; top: 6px; padding-right: 20px">
                    <div style="margin-right: 10px; margin-top: -3px">{{model.nickname}}</div>
                    <div></div>
                    <div style="">
                        <el-dropdown trigger="click" placement="bottom" @command="handle"
                                     :hide-on-click="false">
                            <el-avatar :size="50" :src="model.avatar" style="cursor: pointer"></el-avatar>
                            <el-dropdown-menu slot="dropdown" style="top: 52px!important;">
                                <el-dropdown-item v-for="item in info" :key="item.id" :command="item.id">{{item.value}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>

            <el-main>
                <router-view :key="$route.path"></router-view>
                <el-dialog title="管理员信息" width="40%"
                           :visible.sync="outerVisible"
                           :before-close="handleClose" center>
                    <el-form :model="form" :rules="rules" status-icon label-width="60px">
                        <el-form-item prop="nickname" label="昵称" required>
                            <el-input v-model="form.nickname" placeholder="请输入昵称" maxlength="10" show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item prop="avatar" label="头像" id="avatar">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="uploadUrl"
                                    :headers="getAuthHeaders()"
                                    :show-file-list="false"
                                    :on-success="res => model.avatar = res.url">
                                <el-avatar shape="square" :size="100" :src="model.avatar"></el-avatar>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="outerVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editInfo">确定</el-button>
                    </div>
                </el-dialog>

<!--                修改密码-->
                <el-dialog title="修改密码" width="30%"
                           :visible.sync="passVisible"
                           :before-close="handleClose" center>
                    <el-form :model="form" :rules="rules" status-icon>
                        <el-form-item prop="oldPass" required>
                            <el-input type="password" v-model="form.oldPass" prefix-icon="el-icon-key" placeholder="请输入原密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="newPass" required>
                            <el-input type="password" v-model="form.newPass" prefix-icon="el-icon-key" placeholder="请输入新密码"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="passVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editPass">确定</el-button>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
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
                form: {
                    oldPass: '',
                    newPass: '',
                    nickname: ''
                },
                info: [
                    {
                        id: 0,
                        value: '查看'
                    },
                    {
                        id: 1,
                        value: '修改密码'
                    },
                    {
                        id: 2,
                        value: '退出'
                    }
                ],
                outerVisible: false,
                passVisible: false,
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
            this.fetch();
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('rest/admins')
                this.model = res.data[0]
            },
            handle(command) {
                if (command == 2) {
                    this.$confirm('是否退出?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                        sessionStorage.clear()
                        this.$router.push('/login')
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消退出'
                        });
                    });
                }else if (command == 0){
                    this.outerVisible = true
                } else {
                    this.passVisible = true
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    done();
                }).catch(_ => {});
            },
            async editInfo() {
                if (this.form.nickname) {
                    this.model.nickname = this.form.nickname
                    const res = await this.$http.put(`/rest/admins/${this.model._id}`, this.model)
                    if (res.status == 200) {
                        this.outerVisible = false
                    }
                } else {
                    this.$message({
                        type:'error',
                        message:'修改失败！'
                    })
                }
            },
            async editPass() {
                if (this.form.newPass) {
                    this.$set(this.model, 'password', this.form.newPass)
                    const res=await this.$http.put(`/rest/admins/${this.model._id}`, this.model)
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
            }
        },
        watch: {
            outerVisible(val) {
                if (val) {
                    this.form.nickname = this.model.nickname
                }
            }
        }
    };
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    /*.el-aside {*/
    /*    color: #333;*/
    /*}*/
    .el-popper{
        margin-top: -19px!important;
    }
    #avatar label {
        margin-top: 39px;
    }
</style>
