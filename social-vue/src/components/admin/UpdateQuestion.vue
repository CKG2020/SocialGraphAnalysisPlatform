<template>
  <el-row :gutter="20">
    <el-col :span="18" :xs="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>题库信息</span>
        </div>
        <el-container>
          <el-header>
            <el-button type="primary" style="margin-left: 5px"  @click="showAddDialog">添加题目</el-button>
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
              @selection-change="handleSelectionChange">
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
                        <el-select v-model="value1" placeholder="请选择分值">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="答案2" prop="email">
                        <el-input v-model="formData1.answer2" placeholder="请输入答案2" clearable :style="{width: '100%'}">
                        </el-input>
                        <el-select v-model="value2" placeholder="请选择分值">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>


                      <el-form-item label="答案3" prop="phone">
                        <el-input v-model="formData1.answer3" placeholder="请输入答案3" clearable :style="{width: '100%'}">
                        </el-input>
                        <el-select v-model="value3" placeholder="请选择分值">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>

                      </el-form-item>
                    </el-form>

                    <div slot="footer">
                      <el-button type="primary" @click="handleConfirm">确定</el-button>
                    </div>
                  </div>
                </el-main>
              </el-container>
            </el-dialog>
          </el-main>
        </el-container>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
    import exam from "../../api/exam";
    const   firstInfo = {
        'index': 1,
        'perPage': 10
    };
    export default {
        name: "UpdateQuestion",
        data() {
            return {
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
                options: [{
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }],
                value1: '',
                value2: '',
                value3: '',
            }
        },
        created() {
            this.getAllQuestions()
        },

        methods: {
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
            getAllQuestions() {
                firstInfo.index=this.queryInfo.index
                firstInfo.perPage=this.queryInfo.perPage
                exam.getAllQuestions(firstInfo).then((resp) => {
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

        }
    }
</script>

<style scoped>

</style>
