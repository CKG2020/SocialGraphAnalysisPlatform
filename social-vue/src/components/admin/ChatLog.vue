<template>
  <el-row :gutter="20">
    <el-col :span="18" :xs="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>查看聊天日志</span>
        </div>
        <el-container>
          <el-header>
            <el-select v-model="myvalue" placeholder="请选择查阅的聊天日志"  @change="showLog">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-header>
          <el-main>
         <div>
           {{message}}
         </div>
          </el-main>
        </el-container>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  import exam from "../../api/exam";
  const logName={
         fileName:''
  }
    export default {
        name: "ChatLog",
        data(){
            return{
                options:[],
                myvalue: '',
                message: '',
            }

        },
        created() {
       this.getLogName()
        },
        methods:{
            getLogName(){
                exam.getChatLogsName().then((resp) => {
                    if (resp.data.code === 666) {
                        this.options =resp.data.obj
                        this.loading = false
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取问卷失败!',
                            duration: 1000
                        });
                    }
                })
            },
            showLog(){
                logName.fileName=this.myvalue
                exam.getChatLog(logName).then((resp) => {
                    if (resp.data.code === 666) {
                        this.message =resp.data.message
                        console.log("==============================")
                        console.log(resp.data.message)
                        console.log("==============================")

                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取日志失败!',
                            duration: 1000
                        });
                    }
                })
            }

        }
    }
</script>

<style scoped>

</style>
