<template>
  <el-row :gutter="20">
    <el-col :span="18" :xs="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>综合分析</span>
        </div>
        <el-container>
  <div>
    <div>您的：</div>
      <div class="result_div">聊天活跃度：<span>{{active}}</span>。在所有人当中排名：第
        <span>{{activeRank}}</span> 名</div><div>您有：
        <span>{{friendCount}}</span>
      位好友，您看起来：
      <span>{{friendDetail}}</span>
   </div>
      <div>您经常：<span>{{boardDetail}}</span></div>
      <div>通过您的日常交流，您是一位：<span>{{dailyDetail}} </span></div>
      <div>您所发表的偏正向言论：<span>{{positive}}</span>
        条，负向言论：<span>{{negative}}</span>
        条，总发言数：<span>{{msgCount}} </span>条</div>
      <div style="display: flex;"><div>综合分析：</div><div><div>评分：<span>{{rate}}</span>
      </div><div>得分：<span>{{score}}</span></div>
        <div>描述：<span>{{detail}}</span>
      </div>
      </div>
      </div>
    </div>

        </el-container>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>

import exam from "../../api/exam";
    export default {
        name: "Result",
        data () {
            return {
                active:'',
                activeRank:'',
                friendCount:'',
                friendDetail:'',
                boardDetail:'',
                dailyDetail:'',
                positive:'',
                negative:'',
                msgCount:'',
                rate:'',
                score:'',
                detail:'',
            }
        },
        created () {

            this.myinit()
        },
        methods:{
            myinit(){
                // exam.getUserAccount().then((resp) => {
                //         console.log(resp.data.code)
                //         if (resp.data.code === 666) {
                //             this.user_account=resp.obj
                //
                //             exam
                //         }
                //     })
                exam.getResult().then((resp) => {
                    console.log(resp.data.code)
                    if (resp.data.code === 666) {
                        let resultMsg= resp.data.obj
                        // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx"+resultMsg.active)
                        this.active=resultMsg.active
                        this.activeRank=resultMsg.activeRank
                        this.friendCount=resultMsg.friendCount
                        this.friendDetail=resultMsg.friendDetail
                        this.boardDetail=resultMsg.boardDetail
                        this.dailyDetail=resultMsg.dailyDetail
                        this.positive=resultMsg.positive
                        this.negative=resultMsg.negative
                        this.msgCount=resultMsg.msgCount
                        this.rate=resultMsg.rate
                        this.score=resultMsg.score
                        this.detail=resultMsg.detail

                    } else {
                        this.$notify({
                            title: 'Tips',
                            message: '获取信息失败',
                            type: 'error',
                            duration: 2000
                        })
                    }
                })
            }


        }

    }
</script>




<style scoped>
  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    /*overflow-x: hidden*/
  }
</style>
