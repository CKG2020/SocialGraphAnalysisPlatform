<template>
<div class="app-container">
  <el-row :gutter="20">
    <el-col :span="18" :xs="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>好友信息</span>
        </div>
        <div>
          <el-form ref="elForm" :model="formData"  size="medium" label-width="80px">
            <el-form-item label="用户名" prop="user_account">
              <el-input v-model="formData.user_account"  readonly clearable
                        prefix-icon='el-icon-user' :style="{width: '50%'}"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="sname">
              <el-input v-model="formData.sname"  readonly clearable :style="{width: '50%'}"></el-input>
            </el-form-item>

            <el-form-item label="专业" prop="major">
              <el-input v-model="formData.major" readonly clearable :style="{width: '50%'}"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email"  readonly clearable :style="{width: '50%'}"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="formData.phone"  readonly  clearable :style="{width: '50%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="学校" prop="collage">
              <el-input v-model="formData.collage"  readonly clearable :style="{width: '50%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birth">
              <el-date-picker v-model="formData.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              readonly clearable    :style="{width: '50%'}"  clearable></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
 <div>
 </div>

    <el-col :span="18" :xs="20">
      <el-card>
        <div slot="header" class="clearfix">
          <span>给好友留言</span>
        </div>
        <div class="text">
          <el-input
            v-model="form.message" @keyup.native.enter="send"
            type="textarea" :rows="5" placeholder="请输入内容，按 Enter 键发送">
          </el-input>
          <div class="btn">
            <el-button @click="clean" size="mini" type="danger">清空</el-button>
            <el-button @click="send" size="mini" icon="el-icon-position" type="success">发送</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
</div>
</template>

<script>
    import exam  from "../../api/exam";

    const UserInfo = {
                user_account: '',
                sname: '',
                phone:'',
                email:'',
                collage:'',
                major:'',
                birth:'',
            };
    const BoardMsg ={
            user_account: '',
           from_name:'',
         from_account:'',
        board_text:'',
        date_time:''
    }

    export default {
        name: "FriendDetail",

        data() {
            return {
                formData: Object.assign({}, UserInfo),
                form: {message: ''},

            };
        },
        created() {
            this.initFrom()
        },
        methods: {
            initFrom() {
                console.log(this.$route.params.friend_account)
                exam.getUserInfo(this.$route.params.friend_account).then((resp) => {
                    this.formData = resp.data.obj
                })
            },
            clean() {
                this.form.message = ''
            },
            send() {
                BoardMsg.board_text = this.form.message;
                var date = new Date();
                BoardMsg.date_time = date.toLocaleString();
                BoardMsg.user_account = this.$route.params.friend_account;
                exam.addBoardMsg(BoardMsg).then(response => {
                    if (response.data.code === 666) {
                        this.$message({
                            type: 'success',
                            message: '留言成功!',
                            duration: 1000
                        });
                    } else {
                        this.$message({
                            message: '留言失败!',
                            type: 'warning'
                        });
                        return false;
                    }
                });

            },


        }

    }

</script>
