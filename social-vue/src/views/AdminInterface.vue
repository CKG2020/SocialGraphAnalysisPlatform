<template>
  <div class="main">
    <el-container>
      <el-aside width="200px" style="padding-top: 50px; height: 100vh">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title" ><i class="el-icon-sunny"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="userManage"><i class="el-icon-ice-cream-round"></i>基本信息</el-menu-item>
<!--              <el-menu-item index="1-2" @click="information"><i class="el-icon-lollipop"></i>完善信息</el-menu-item>-->
<!--              <el-menu-item index="1-3" @click="questions"><i class="el-icon-lollipop"></i>问卷调查</el-menu-item>-->
<!--              <el-menu-item index="1-4" @click="chat"><i class="el-icon-lollipop"></i>聊天室</el-menu-item>-->
<!--              <el-menu-item index="1-5" @click="result"><i class="el-icon-lollipop"></i>分析结果</el-menu-item>-->

            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-sunny"></i>问卷管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-2" @click="analysis"><i class="el-icon-lollipop"></i>综合分析</el-menu-item>
              <el-menu-item index="1-3" @click="updateQuestion"><i class="el-icon-lollipop"></i>更新题库</el-menu-item>
              <el-menu-item index="1-3" @click="addQuestionnaire"><i class="el-icon-lollipop"></i>添加问卷</el-menu-item>

            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-sunny"></i>聊天记录日志追踪</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="watchChat"><i class="el-icon-ice-cream-round"></i>监控聊天</el-menu-item>
              <el-menu-item index="1-2" @click="chatLog"><i class="el-icon-lollipop"></i>聊天记录日志追踪</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title" ><i class="el-icon-sunny"></i>用户图谱分析</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="graphAnalysis"><i class="el-icon-ice-cream-round"></i>简单图谱分析</el-menu-item>
<!--              <el-menu-item index="1-2" @click="applyFri"><i class="el-icon-lollipop"></i>聊天记录日志追踪</el-menu-item>-->
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

    userManage() {
      this.$router.push('/userManage')
    },

    analysis() {
      this.$router.push('/analysis')
    },
    updateQuestion() {
      this.$router.push('/updateQuestion')
    },
    addQuestionnaire() {
      this.$router.push('/addQuestionnaire')
    },

    watchChat() {
      this.$router.push('/watchChat')
    },
    chatLog() {
      this.$router.push('/chatLog')
    },
    graphAnalysis() {
      this.$router.push('/graphAnalysis')
    },


  }
}
</script>

<style scoped>
</style>
