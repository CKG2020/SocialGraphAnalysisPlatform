<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="用户名" prop="user_account">
        <el-input v-model="formData.user_account" placeholder="请输入用户名" readonly clearable
                  prefix-icon='el-icon-user' :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="sname">
        <el-input v-model="formData.sname" placeholder="请输入姓名" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="sage">
        <el-input v-model="formData.sage" placeholder="请输入年龄" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="formData.gender" size="medium">
          <el-radio v-for="(item, index) in genderOptions" :key="index" :label="item.value"
                    :disabled="item.disabled">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="专业" prop="major">
        <el-input v-model="formData.major" placeholder="请输入专业" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号码" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="学校" prop="collage">
        <el-input v-model="formData.collage" placeholder="请输入学校" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="个性签名" prop="detail">
        <el-input v-model="formData.detail" placeholder="请输入个性签名" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birth">
        <el-date-picker v-model="formData.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" placeholder="请选择生日" clearable></el-date-picker>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import exam  from "../../api/exam";
  const UserInfo = {
      user_account: '',
      sname: '',
      sage:'',
      phone:'',
      email:'',
      collage:'',
      major:'',
      birth:'',
      gender:'',
      detail:'',
  };
    export default {
        name:'formData',
        components: {},
        props: [],
        data() {
            return {
                formData: Object.assign({}, UserInfo),
                rules: {
                    user_account: [],
                    sname: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    sage: [{
                        required: true,
                        message: '请输入年龄',
                        trigger: 'blur'
                    }],
                    gender: [{
                        required: true,
                        message: '性别不能为空',
                        trigger: 'change'
                    }],
                    major: [{
                        required: true,
                        message: '请输入专业',
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    }],
                    collage: [{
                        required: true,
                        message: '请输入学校',
                        trigger: 'blur'
                    }],
                    detail: [{
                        required: true,
                        message: '请输入个性签名',
                        trigger: 'blur'
                    }],
                    birth: [{
                        required: true,
                        message: '请选择生日',
                        trigger: 'change'
                    }],
                },
                genderOptions: [{
                    "label": "女",
                    "value": 1
                }, {
                    "label": "男",
                    "value": 0
                }],
            }
        },
        computed: {},
        watch: {},
        created() {
            this.initFrom()
        },
        mounted() {},
        methods: {
            submitForm() {
                this.$refs['elForm'].validate(valid => {
                    if (valid) {
                        this.$confirm('是否要提交修改?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            exam.updateUserInfo(this.formData).then(response=>{
                             if (response.data.code===666){
                                this.$message({
                                    type: 'success',
                                    message: '提交成功!',
                                    duration:1000
                                });
                             }
                            })
                        });
                    } else {
                        this.$message({
                            message: '提交失败!',
                            type: 'warning'
                        });
                        return false;
                    }
                })
            },
            resetForm() {
                this.$refs['elForm'].resetFields()
            },
            initFrom(){
                exam.getSelectUserInfo().then((resp) => {
                    this.formData=resp.data.obj

                })

            }
        },



    }



</script>
<style>
</style>
