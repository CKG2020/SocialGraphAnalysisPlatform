<template>
  <el-row :gutter="20">
    <el-col :span="18" :xs="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="primary" style="margin-left: 5px"  @click="showAddDialog">添加问卷</el-button>
        </div>
        <el-container>
          <el-header>
            <el-select v-model="myvalue" placeholder="请选择查阅的问卷"  @change="showQuestions">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.pageName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-header>
          <el-main>
            <el-table
              ref="multipleTable"
              highlight-current-row
              v-loading="loading"
              :border="true"
              :data="questionInfo"
              tooltip-effect="dark"
              style="width: 100%"
              >
              <el-table-column align="center" label="问题">
                <template slot-scope="scope">
                  {{ scope.row.title }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="答案1">
                <template slot-scope="scope">
                  {{ scope.row.answer1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="答案2">
                <template slot-scope="scope">
                  {{ scope.row.answer2 }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="答案3">
                <template slot-scope="scope">
                  {{ scope.row.answer3 }}
                </template>
              </el-table-column>
            </el-table>


          </el-main>
        </el-container>


        <el-dialog title="添加题目" :visible.sync="addTableVisible" width="50%"
                   center>
          <el-container>
            <el-main>
              <div>
                <el-form ref="elForm" :model="formData1"  size="medium" label-width="100px">

                  <el-form-item label="问题" prop="user_account">
                    <el-input v-model="formData1.title" placeholder="请输入问题" clearable :style="{width: '100%'}">
                    </el-input>
                  </el-form-item>


                  <el-form-item label="答案1" prop="user_pwd">
                    <el-input v-model="formData1.answer1" placeholder="请输入答案1" clearable :style="{width: '100%'}">
                    </el-input>
                  </el-form-item>



                  <el-form-item label="答案2" prop="email">
                    <el-input v-model="formData1.answer2" placeholder="请输入答案2" clearable :style="{width: '100%'}">
                    </el-input>
                  </el-form-item>



                  <el-form-item label="答案3" prop="phone">
                    <el-input v-model="formData1.answer3" placeholder="请输入答案3" clearable :style="{width: '100%'}">
                    </el-input>
                  </el-form-item>
                </el-form>

                <div slot="footer">
                  <el-button type="primary" @click="handleConfirm">确定</el-button>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-dialog>
      </el-card>
    </el-col>
  </el-row>
</template>





<script>
    import exam from "../../api/exam";
    const   firstInfo = {
       qId:0
    };
    export default {
        name: "AddQuestionnaire",
        data() {
            return {
                 options: [],
                 myvalue:'',
                formData1: {
                    title: undefined,
                    answer1: undefined,
                    answer2: undefined,
                    answer3: undefined,
                },
                Question: {
                    title: undefined,
                    answer1: undefined,
                    answer2: undefined,
                    answer3: undefined,
                },
                questionInfo: [],
                queryInfo: {
                    'index': 1,
                    'perPage': 10
                },
                addTableVisible:false,
                total:'',
                loading: true,

                value1: '',
                value2: '',
                value3: '',
            }
        },
        created() {
            this.getAllQuestionnaire()
        },

        methods: {
            getAllQuestionnaire() {
                exam.getAvailableQuestions().then((resp) => {
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
            showQuestions(){
                console.log(this.myvalue)
                firstInfo.qId=this.myvalue

              exam.getQuestionsDetail(firstInfo).then((resp) => {
               if (resp.data.code === 666) {
                   console.log("=================================")
                   this.questionInfo =resp.data.obj
                   this.loading = false
               } else {
                   this.$message({
                       type: 'error',
                       message: '获取问卷失败!',
                       duration: 2000
                   });
               }
           })



            },



            //表格某一行被选中
            handleSelectionChange (val) {
                this.selectedInTable = val
            },
            //分页插件的大小改变
            handleSizeChange (val) {
                this.queryInfo.perPage = val
                this.getAllQuestions()
            },
            //分页插件的页数
            handleCurrentChange (val) {
                this.queryInfo.index = val
                this.getAllQuestions()
            },

            showAddDialog () {
                this.addTableVisible = true
            },
            handleConfirm(){

                var  myquestion=this.formData1.title
                this.Question.title=myquestion
                var myanswer1=this.formData1.answer1
                var myvalue1=this.value1
                this.Question.answer1=myanswer1+"//"+myvalue1

                var myanswer2=this.formData1.answer2
                var myvalue2=this.value2
                this.Question.answer2=myanswer2+"//"+myvalue2

                var myanswer3=this.formData1.answer3
                var myvalue3=this.value3
                this.Question.answer3=myanswer3+"//"+myvalue3

                exam.addMyQuestion(this.Question).then((resp) => {
                    console.log(resp.data.code)
                    if (resp.data.code === 666) {
                        this.$message({
                            type: 'success',
                            message: resp.data.message,
                            duration: 2000
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加题目失败!',
                            duration: 2000
                        });
                    }
                })

                console.log("================="+this.formData2.answer1)
            },


        }
    }
</script>

<style scoped>

</style>
