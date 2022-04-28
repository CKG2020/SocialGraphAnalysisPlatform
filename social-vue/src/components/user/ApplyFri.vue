<template>
  <el-row :gutter="20">
    <el-col :span="18" :xs="20">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户信息</span>
        </div>
  <el-container>
    <el-header>
      <el-input v-model="queryInfo.user_account" @blur="getSomeUser" placeholder="搜索账号"
                prefix-icon="el-icon-search"></el-input>
      <el-button type="primary" style="margin-left: 5px" icon="el-icon-plus" @click=" getSomeUser()">搜索</el-button>
      <el-button type="primary" style="margin-left: 5px"  @click="showAddDialog">我的申请</el-button>
      <el-button type="primary" style="margin-left: 5px"  @click="showFriendDialog">好友申请</el-button>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        highlight-current-row
        v-loading="loading"
        :border="true"
        :data="userInfo"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column align="center" label="账号">
          <template slot-scope="scope">
            {{ scope.row.user_account }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">
            {{ scope.row.sname }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button round size="small" type="primary" icon="el-icon-info"
                       @click="findUserDetail(scope.row.user_account)">查看详情
            </el-button>
<!--            <el-button round size="small" type="danger"  @click="updateFriendRequest(scope.row.user_account)">好友状态是否已申请-->
<!--            </el-button>-->

                <el-button v-if="isOrNotPassExam(scope.row.user_account)" round size="small" type="danger" >已添加</el-button>
              <el-button   round size="small" type="danger"   v-if="!isOrNotPassExam(scope.row.user_account)"  @click="addRequest(scope.row.user_account)">提交好友申请</el-button>

          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination style="margin-top: 25px"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.index"
                     :page-sizes="[10, 20, 30, 50]"
                     :page-size="queryInfo.perPage"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>

    </el-main>
    <el-dialog title="我的申请" :visible.sync="addTableVisible" width="50%"
               center>
      <el-container>
        <el-header height="220">
          <div>
            我发起的申请
          </div>
        </el-header>
        <el-main>
          <el-table
            ref="questionTable"
            highlight-current-row
            v-loading="loading"
            :border="true"
            :data="requestFriendInfo"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column align="center" label="申请为好友的用户账号">
              <template slot-scope="scope">
                {{ scope.row.account }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="我申请该用户为好友的理由">
              <template slot-scope="scope">
                {{ scope.row.detail }}
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-dialog>
    <el-dialog title="好友申请" :visible.sync="addVisible" width="50%"
               center>
      <el-container>
        <el-header height="220">
          <div>
            向我发起的好友申请
          </div>
        </el-header>
        <el-main>
          <el-table
            ref="questionTable"
            highlight-current-row
            v-loading="loading"
            :border="true"
            :data="requestFriendInfo"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column align="center" label="申请我为好友的用户账号">
              <template slot-scope="scope">
                {{ scope.row.account }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="申请我为好友的理由">
              <template slot-scope="scope">
                {{ scope.row.detail }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button round size="small" type="primary" icon="el-icon-info"
                           @click="agree(scope.row.account)">同意
                </el-button>
                <el-button round size="small" type="danger" icon="el-icon-error" @click="refuse(scope.row.account)">拒绝
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-dialog>
    <el-dialog title="用户详细信息" :visible.sync="Visible" width="50%"
               center>
      <el-container>
        <el-main>
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="专业" prop="major">
              <el-input v-model="formData.major" placeholder="该用户未填写" readonly clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="该用户未填写" readonly clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="formData.phone"  placeholder="该用户未填写" readonly clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="学校" prop="collage">
              <el-input v-model="formData.collage" placeholder="该用户未填写"  readonly clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="detail">
              <el-input v-model="formData.detail"  placeholder="该用户未填写" readonly clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birth">
              <el-date-picker v-model="formData.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="该用户未填写"
                              :style="{width: '100%'}"readonly clearable></el-date-picker>
            </el-form-item>

          </el-form>
        </el-main>
      </el-container>
    </el-dialog>
    <el-dialog title="申请信息" :visible.sync="add" width="50%"
               center>
      <el-container>
        <el-header height="220">
          <div>
            请输入申请理由
          </div>
        </el-header>
        <el-main>
          <div class="text">
            <el-input
              v-model="form.message" @keyup.native.enter="send"
              type="textarea" :rows="5" placeholder="请输入申请理由">
            </el-input>
            <div class="btn">
              <el-button @click="send(form.message)" size="mini" icon="el-icon-position" type="success">发送</el-button>
            </div>
          </div>

        </el-main>
      </el-container>
    </el-dialog>






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
    const  requestFriend={
        'flag':0
    };
    const  friendAsk={
        'flag':1
    };
    const  FriendRequest = {
        account1:'',
        account2:'',
        detail:'',
        addStatus:''
    };
    const  detailUser={
        account:''
    }
    export default {
        name: 'ApplyFri',
        data () {
            return {
                queryInfo: {
                    'user_account': '',
                    'index': 1,
                    'perPage': 10
                },
                userInfo: [],
                requestFriendInfo:[],
                total: 0,
                loading: true,
                addTableVisible: false,
                addVisible: false,
                Visible: false,
                add: false,
                formData:{
                    'phone':'',
                    'email':'',
                    'collage':'',
                    'major':'',
                    'birth':'',
                    'detail':''
                },
                myAllFriends:[],
                form: {message: ''}
            }
        },
        created () {
            this.getUserInfo()
            this.initMyAllFriends()
        },
        methods: {
            //获取用户信息
            getUserInfo () {
                firstInfo.index=this.queryInfo.index
                firstInfo.perPage=this.queryInfo.perPage
                exam.findAll(firstInfo).then((resp) => {
                    console.log(resp.data.code)
                    if (resp.data.code === 666) {
                        this.userInfo = resp.data.obj
                        this.total = resp.data.totalSize
                        this.loading = false
                    } else {
                        this.$notify({
                            title: 'Tips',
                            message: '获取所有用户信息失败',
                            type: 'error',
                            duration: 2000
                        })
                    }
                })
            },
            getSomeUser(){
                     exam.findUsersByAccount(this.queryInfo).then((resp) => {
                    console.log(resp.data.code)
                     if (resp.data.code === 666) {
                  this.userInfo = resp.data.obj
                    this.total = resp.data.totalSize
                    this.loading = false
          } else {
              this.$notify({
                  title: 'Tips',
                  message: '获取指定用户信息失败',
                  type: 'error',
                  duration: 2000
              })
          }
      })
            },
            findUserDetail(account){
                detailUser.account=account
                exam.showInfo(detailUser).then((resp) => {
                    console.log('==========='+resp.data.code)
                    if (resp.data.code === 666) {
                        this.formData = resp.data.obj
                    } else {
                        this.$notify({
                            title: 'Tips',
                            message: '获取某用户信息失败',
                            type: 'error',
                            duration: 2000
                        })
                    }
                })
                this.Visible = true
            },
            updateFriendRequest(user_account){
                this.$notify({
                    title: 'Tips',
                    message: '改变好友信息成功',
                    type: 'success',
                    duration: 2000
                })

            },
            //表格某一行被选中
            handleSelectionChange (val) {
                this.selectedInTable = val
            },

            //分页插件的大小改变
            handleSizeChange (val) {
                this.queryInfo.perPage = val
                this.getUserInfo()
            },
            //分页插件的页数
            handleCurrentChange (val) {
                this.queryInfo.index = val
                this.getUserInfo()
            },
            //点击添加按钮
            showAddDialog () {
                exam.getRequest(requestFriend).then((resp) => {
                    console.log(resp.data.code)
                    if (resp.data.code === 666) {
                        this.requestFriendInfo = resp.data.obj
                        this.total = resp.data.totalSize
                    } else {
                        this.$notify({
                            title: 'Tips',
                            message: '获取我申请好友的信息失败',
                            type: 'error',
                            duration: 2000
                        })
                    }
                })
                this.addTableVisible = true
            },
            showFriendDialog () {
                exam.getRequest(friendAsk).then((resp) => {
                    console.log(resp.data.code)
                    if (resp.data.code === 666) {
                        this.requestFriendInfo = resp.data.obj
                        this.total = resp.data.totalSize
                    } else {
                        this.$notify({
                            title: 'Tips',
                            message: '获取向我发送申请好友信息失败',
                            type: 'error',
                            duration: 2000
                        })
                    }
                })

                this.addVisible = true
            },
            agree(user_account){
                console.log("==================")
                console.log(user_account)
                console.log("==================")

                FriendRequest.account1=user_account
                FriendRequest.detail=''
                FriendRequest.addStatus= 1
                exam.updateFriendRel(FriendRequest).then(response => {
                    console.log("xxxxxxxxxxxxxxx"+response.data.code)
                    if (response.data.code === 666) {
                        this.$message({
                            type: 'success',
                            message: '多个朋友,多条路!',
                            duration: 1000
                        });
                    } else {
                        this.$message({
                            message: '添加失败!',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            refuse(user_account){
                FriendRequest.account1=user_account
                FriendRequest.detail=''
                FriendRequest.addStatus= 2
                exam.updateFriendRel(FriendRequest).then(response => {
                    console.log("xxxxxxxxxxxxxxx"+response.data.code)
                    if (response.data.code === 666) {
                        this.$message({
                            type: 'success',
                            message: '丢个朋友,丢条路!',
                            duration: 1000
                        });
                    } else {
                        this.$message({
                            message: '拒绝失败!',
                            type: 'warning'
                        });
                        return false;
                    }
                });




            },
            initMyAllFriends(){
              exam.getAllFriends().then((resp) => {
                  if (resp.data.code === 666) {
                      this.myAllFriends = resp.data.obj
                  } else {
                      this.$notify({
                          title: 'Tips',
                          message: '获取某用户信息失败',
                          type: 'error',
                          duration: 2000
                      })
                  }
              })
            },
            addRequest(user_account){
                FriendRequest.account2=user_account
                this.add = true
            },
            send(message){
                FriendRequest.detail=message
                FriendRequest.addStatus=0
                exam.addRequest(FriendRequest).then((resp) => {
                    console.log(resp.data.code)
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

            }
        },
        computed: {
            isOrNotPassExam (user_account) {
                return (user_account) => {
                    let flag = false
                    this.myAllFriends.forEach(item => {
                        if (item.user_account === user_account) {
                            flag = true
                        }
                    })
                    return flag
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/admin/userManage";
</style>
