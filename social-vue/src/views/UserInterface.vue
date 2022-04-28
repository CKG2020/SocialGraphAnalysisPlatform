<template>
  <div class="main">
    <el-container>
      <el-aside width="200px" style="padding-top: 50px; height: 100vh">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-sunny"></i>个人中心</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="mesboard"><i class="el-icon-ice-cream-round"></i>留言板</el-menu-item>
              <el-menu-item index="1-2" @click="information"><i class="el-icon-lollipop"></i>完善信息</el-menu-item>
              <el-menu-item index="1-3" @click="questions"><i class="el-icon-lollipop"></i>问卷调查</el-menu-item>
              <el-menu-item index="1-4" @click="chat"><i class="el-icon-lollipop"></i>聊天室</el-menu-item>
              <el-menu-item index="1-5" @click="result"><i class="el-icon-lollipop"></i>分析结果</el-menu-item>

            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-sunny"></i>好友分析</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="myFri"><i class="el-icon-ice-cream-round"></i>我的好友</el-menu-item>
              <el-menu-item index="1-2" @click="applyFri"><i class="el-icon-lollipop"></i>好友申请</el-menu-item>
              <el-menu-item index="1-3" @click="unknown"><i class="el-icon-lollipop"></i>我的社交图谱</el-menu-item>

            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-sunny"></i>权限管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="setting"><i class="el-icon-ice-cream-round"></i>设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AiApprove",
  data() {
    return {
      title: '社交与图谱分析平台'
    }
  },
  methods: {
    //个人中心
    mesboard() {
      this.$router.push('/mesboard')
    },
    information() {
      this.$router.push('/information')
    },
    questions() {
      this.$router.push('/questions')
    },
    chat() {
      this.$router.push('/chat')
    },
    result() {
      this.$router.push('/result')
    },
    //好友分析
    myFri() {
      this.$router.push('/myFri')
    },
    applyFri() {
      this.$router.push('/applyFri')
    },
    unknown() {
      this.$router.push('/unknown')
    },
    //权限管理
    setting() {
      this.$router.push('/settings')
    }
  }
}
</script>

<style scoped>
</style>
