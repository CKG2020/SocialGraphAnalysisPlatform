<template>
  <el-container>
    <el-header height="220">
      <div>
        我的好友
      </div>
    </el-header>
    <el-main>
      <el-table
        ref="questionTable"
        highlight-current-row
        :border="true"
        :data="boardInfo"
        tooltip-effect="dark"
        style="width: 100%;">
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
        <el-table-column align="center" label="邮箱">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button round size="small" type="primary" icon="el-icon-info"
                       @click="myFriendDetail(scope.row.user_account)">详情
            </el-button>
            <el-button round size="small" type="danger" icon="el-icon-error" @click="deleteFriend(scope.row.user_account)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    import exam from '@/api/exam'

    const  FriendRequest = {
       account1:'',
        account2:'',
        detail:'',
        addStatus:''
    };
    export default {
        name: 'MyFri',

        data () {
            return {
                boardInfo: [],

            }
        },
        created () {
            this.getAllFriends()


        },
        methods: {
            getAllFriends () {
                exam.getAllFriends().then((resp) => {
                    if (resp.data.code === 666) {
                        this.boardInfo = resp.data.obj
                    } else {
                        this.$notify({
                            title: 'Tips',
                            message: resp.message,
                            type: 'error',
                            duration: 2000
                        })
                    }
                })
            },
            deleteFriend(user_account) {
                FriendRequest.account1=user_account
                FriendRequest.detail='删除'
                FriendRequest.addStatus= -1
                exam.updateFriendRel(FriendRequest).then(response => {
                    if (response.data.code === 666) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                            duration: 1000
                        });
                    } else {
                        this.$message({
                            message: '删除失败!',
                            type: 'warning'
                        });
                        return false;
                    }
                });

            },

           myFriendDetail(user_account){
               this.$router.push({name:'friendDetail',params:{friend_account:user_account}})
           },



        },
        computed: {

        }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/student/examOnline";
</style>
