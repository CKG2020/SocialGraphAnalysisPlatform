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
        <el-dialog title="添加问卷" :visible.sync="addTableVisible" width="50%"
                   center>
          <el-container>
            <el-main>
              <div>
                <div>已经选择的题目数量：<span>{{this.ids.length}}</span></div>
                <el-table
                  ref="multipleTable"
                  highlight-current-row
                  v-loading="loading"
                  :border="true"
                  :data="questionInfo"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55" align="center" />
                  <el-table-column align="center" label="题号">
                    <template slot-scope="scope">
                      {{ scope.row.id }}
                    </template>
                  </el-table-column>
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
                <el-pagination style="margin-top: 25px"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="queryInfo.index"
                               :page-sizes="[10, 20, 30, 50]"
                               :page-size="queryInfo.perPage"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
                <div slot="footer">
                  <el-button type="primary" @click="handleConfirm">确定</el-button>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-dialog>



        <el-dialog  :visible.sync="tableVisible" width="50%"
                   center>
              <div>
                <el-form ref="elForm" :model="questionnaireTitle"  size="medium" label-width="100px">
                  <el-form-item label="问卷的名称:" prop="user_account">
                    <el-input v-model="questionnaireTitle" placeholder="请输入问卷名称" clearable :style="{width: '50%'}">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer">
                  <el-button type="primary" @click="myhandleConfirm">确定</el-button>
                </div>
              </div>
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
    const   myfirstInfo = {
        'index': 1,
        'perPage': 10
    };

     const  questionPage={
         questionList:'',
         pageName:'',
         available:true
     };

    export default {
        name: "AddQuestionnaire",
        data() {
            return {
                questionnaireTitle:'',
                 options: [],
                 myvalue:'',
                questionInfo: [],
                queryInfo: {
                    'index': 1,
                    'perPage': 50
                },
                addTableVisible:false,
                tableVisible:false,
                total:'',
                loading: true,
                value1: '',
                value2: '',
                value3: '',
                ids:[]
            }
        },
        created() {
            this.getAllQuestionnaire()
            this.getAllQuestions()
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
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                // this.single = selection.length!=1
                // this.multiple = !selection.length
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

                this.tableVisible = true

          },
            myhandleConfirm(){
                questionPage.pageName =this.questionnaireTitle

                questionPage.questionList="["+this.ids.toString()+"]"

            exam.addQuestionPage(questionPage).then((resp) => {
                if (resp.data.code === 666) {
                    this.$message({
                        type: 'success',
                        message: resp.data.message,
                        duration: 1000
                    });

        } else {
            this.$message({
                type: 'error',
                message: resp.data.message,
                duration: 1000
            });
        }
    })




            },
            getAllQuestions() {
                myfirstInfo.index=this.queryInfo.index
                myfirstInfo.perPage=this.queryInfo.perPage
                exam.getAllQuestions(myfirstInfo).then((resp) => {
                    console.log(resp.data.code)
                    if (resp.data.code === 666) {
                        this.questionInfo =resp.data.obj
                        this.total = resp.data.totalSize
                        this.loading = false
                    } else {
                        this.$message({
                            type: 'error',
                            message: '获取题目失败!',
                            duration: 1000
                        });
                    }
                })
            },



        },


    }
</script>

<style scoped>

</style>
