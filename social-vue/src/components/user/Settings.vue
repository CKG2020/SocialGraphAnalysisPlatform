<template>
  <el-row :gutter="20">
    <el-col :span="18" :xs="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人设置</span>
        </div>
        <el-container>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="是否接受好友申请" prop="receive_friend">
        <el-switch
          v-model="formData.receive_friend"
          active-value=true
          inactive-value=false
          @change="handleStatusChange1(formData.receive_friend)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否向陌生人展示个人信息" prop="show_board">
        <el-switch
          v-model="formData.show_board"
          active-value=true
          inactive-value=false
          @change="handleStatusChange2(formData.show_board)"
        ></el-switch>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>

      </el-form-item>
    </el-form>
  </div>
        </el-container>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

    import exam from "../../api/exam";

    export default {

        data() {
            return {
                formData: {
                    receive_friend: true,
                    show_board: true,
                    receive_board:false,
                    send_notice:false
                },
                rules: {},
            }
        },
        computed: {},
        watch: {},
        created() {

        },
        mounted() {},
        methods: {
            submitForm() {
                this.$refs['elForm'].validate(valid => {
                    if (!valid) return
                    // TODO 提交表单

                    exam.saveSettings(this.formData).then((resp) => {

                        if (resp.data.code === 666) {
                            this.$notify({
                                title: 'Tips',
                                message: resp.data.message,
                                type: 'success',
                                duration: 2000
                            })
                        } else {
                            this.$notify({
                                title: 'Tips',
                                message: resp.data.message,
                                type: 'error',
                                duration: 2000
                            })
                        }
                    })
                })
            },
            handleStatusChange1(myparams){
              this.formData.receive_friend=myparams
            },
            handleStatusChange2(myparams){
                this.formData.show_board=myparams
            }

        }
    }

</script>
<style>
</style>
