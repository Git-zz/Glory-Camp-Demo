<template>
    <div class="edit">
        <div style="height: 30px; margin-bottom: 30px; color: #545c64; font-size: 20px; font-weight: bold">
            <i class="el-icon-trophy"></i>
            <span style="margin-left: 8px">{{id ? '编辑' : '新建'}}英雄</span>
        </div>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs type="border-card" value="basic">
                <el-tab-pane label="基本信息" name="basic">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
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
                    <el-form-item label="Banner">
                        <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="res=>$set(model,'banner',res.url)">
                            <!--                        :before-upload="beforeAvatarUpload">-->
                            <img v-if="model.banner" :src="model.banner" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories[0]">
                            <el-option v-for="item of categories"
                                       :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="登场排名">
                        <el-input v-model="model.show"></el-input>
                    </el-form-item>
                    <el-form-item label="胜率排名">
                        <el-input v-model="model.win"></el-input>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate style="margin-top:0.6rem" :max="10" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top:0.6rem" :max="10" show-score v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top:0.6rem" :max="10" show-score v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top:0.6rem" :max="10" show-score v-model="model.scores.survive"></el-rate>
                    </el-form-item>

                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option v-for="item of items"
                                       :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option v-for="item of items"
                                       :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战技巧">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>


                </el-tab-pane>
                <el-tab-pane label="技能" name="skills">
                    <el-button size="small" @click="model.skills.push({ })"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap: wrap; justify-content: space-between">
                        <el-card class="box-card" v-for="(item ,i) in model.skills" :key="i">
                            <div slot="header" class="clearfix">
                                <span>技能详情</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="model.skills.splice(i,1)">X</el-button>
                            </div>
                            <div style="margin-left: -75px">
                                <el-form-item label="名称">
                                    <el-input v-model="item.name"></el-input>
                                </el-form-item>
                                <el-form-item label="图标">
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="uploadUrl"
                                            :headers="getAuthHeaders()"
                                            :show-file-list="false"
                                            :on-success="res=>$set(item,'icon',res.url)">
                                        <img v-if="item.icon" :src="item.icon" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="冷却值">
                                    <el-input v-model="item.delay"></el-input>
                                </el-form-item>
                                <el-form-item label="消耗">
                                    <el-input v-model="item.cost"></el-input>
                                </el-form-item>
                                <el-form-item label="描述">
                                    <el-input type="textarea" v-model="item.description"></el-input>
                                </el-form-item>
                            </div>
                        </el-card>
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="最佳搭档" name="partners">
                    <el-button size="small" @click="model.partners.push({ })"><i class="el-icon-plus"></i>添加英雄</el-button>
                    <el-row type="flex" style="flex-wrap: wrap; justify-content: space-between">
                        <el-card class="box-card" v-for="(item ,i) in model.partners" :key="i">
                            <div slot="header" class="clearfix">
                                <span>英雄详情</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="model.partners.splice(i,1)">X</el-button>
                            </div>
                            <div style="margin-left: -75px">
                                <el-form-item label="英雄">
                                    <el-select v-model="item.hero" filterable>
                                        <el-option v-for="hero in heroes" :key="hero._id"
                                                   :value="hero._id" :label="hero.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="描述">
                                    <el-input type="textarea" v-model="item.description"></el-input>
                                </el-form-item>
                            </div>
                        </el-card>
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="英雄攻略" name="content">
                    <el-button size="small" @click="model.content.push({ })"><i class="el-icon-plus"></i>添加攻略</el-button>
                    <el-row type="flex" style="flex-wrap: wrap; justify-content: space-between">
                        <el-card class="box-card" v-for="(item ,i) in model.content" :key="i" @click.native="getIndex(i)">
                            <div slot="header" class="clearfix">
                                <span>攻略详情</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="model.content.splice(i,1)">X</el-button>
                            </div>
                            <div style="margin-left: -66px">
                                <el-form-item label="名称">
                                    <el-input v-model="item.title"></el-input>
                                </el-form-item>
                                <el-form-item label="封面">
                                    <el-upload
                                            class="avatar-uploader"
                                            :action="uploadUrl"
                                            :headers="getAuthHeaders()"
                                            :show-file-list="false"
                                            :on-success="res=>$set(item,'cover',res.url)">
                                        <img v-if="item.cover" :src="item.cover" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="点击率">
                                    <el-input v-model="item.click"></el-input>
                                </el-form-item>
                                <el-form-item label="视频文件" style="">
                                    <el-upload
                                            class="upload-demo"
                                            drag
                                            :action="uploadUrl"
                                            :headers="getAuthHeaders()"
                                            :on-success="handleSuccess"
                                            :on-remove="handleRemove"
                                            :file-list="fileList[i].file">
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">将视频文件拖到此处，或<em>点击上传</em></div>
                                    </el-upload>
                                </el-form-item>
                            </div>
                        </el-card>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top: 1rem;">
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "HeroEdit",
        props:{
            id:{ }
        },
        data(){
            return{
                index: null,
                categories:[],
                items:[],
                heroes:[],
                model:{
                    categories: [],
                    skills:[],
                    partners:[],
                    content:[],
                    scores:{
                        difficult: 0,
                        skills:0,
                        attack:0,
                        survive: 0
                    }
                },
                fileList: [
                    {
                        file: []
                    },
                    {
                        file: []
                    }
                ]
            }
        },
        methods:{
            async save(){
                let res
                if (this.id){
                    res=await this.$http.put(`rest/heros/${this.id}`,this.model)
                } else {
                    res=await this.$http.post('rest/heros',this.model)
                }
                this.$router.push('/heros/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res=await this.$http.get(`rest/heros/${this.id}`)
                this.model = Object.assign({}, this.model, res.data)
                this.model.content.forEach(ele => {
                    if (typeof (ele.source) == "string") {
                        let i = this.model.content.indexOf(ele)
                        let obj = { name: ele.source, url: ele.source }
                        this.fileList[i].file.push(obj)
                    }
                })
            },
            async fetchCategories(){
                const res=await this.$http.get(`rest/categories`)
                res.data.forEach(ele => {
                    if (ele.parent && ele.parent.name == '英雄分类') {
                        let obj = {
                            _id: ele._id,
                            name: ele.name
                        }
                        this.categories.push(obj)
                    }
                })
            },
            async fetchItems(){
                const res=await this.$http.get(`rest/items`)
                this.items=res.data
            },
            async fetchHeroes(){
                const res=await this.$http.get(`rest/heroes`)
                this.heroes=res.data
            },
            getIndex(i) {
                this.index = i
            },
            handleSuccess(res) {
                if (res.url) {
                    this.$set(this.model.content[this.index], 'source', res.url)
                    let obj = { name: this.model.content[this.index].source, url: this.model.content[this.index].source }
                    this.fileList[this.index].file.push(obj)
                }
            },
            handleRemove(file, fileList) {
                this.model.content[this.index].source = undefined
                this.fileList[this.index].file = []
            }
        },
        created() {
            this.id&&this.fetch()
            this.fetchCategories()
            this.fetchItems()
            this.fetchHeroes()
        }
    }
</script>

<style>
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 450px;
        margin: 10px 0;
    }
</style>
