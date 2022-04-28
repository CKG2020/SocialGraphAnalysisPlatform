<template>
  <el-container>
    <el-main>
      <el-card class="box-card" shadow="always">
        <div slot="header" class="card-header">
          <p>社交与图谱分析平台</p>
        </div>

        <div>
          <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" :status-icon="true" label-width="100px">
            <el-form-item prop="user_account">
              <el-input prefix-icon="el-icon-user" v-model="loginForm.user_account" placeholder="账号"></el-input>
            </el-form-item>

<!--            <el-form-item prop="user_pwd">-->
<!--              <el-input prefix-icon="el-icon-lock" v-model="loginForm.user_pwd" placeholder="密码"-->
<!--                        show-user_pwd></el-input>-->
<!--            </el-form-item>-->

            <el-form-item  prop="user_pwd">
              <el-input v-model="loginForm.user_pwd" placeholder="请输入密码" clearable show-password
                       ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login($refs['loginForm'])" icon="el-icon el-icon-s-promotion">登录
              </el-button>
              <el-button type="warning" @click="toRegisterPage" icon="el-icon el-icon-circle-plus">注册</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-card>
    </el-main>

    <Footer></Footer>
  </el-container>
</template>

<script>
import Footer from '@/components/Footer'
import LoginFunc from '@/function-namespace/auth/LoginFunc'

export default {
  name: 'Login',
  components: { Footer },
  data () {
    return {
      ...LoginFunc
    }
  },
  created () {

  },
  mounted () {


  },
}
</script>

<style scoped lang="scss">
@import "../../assets/css/auth/login";

</style>
