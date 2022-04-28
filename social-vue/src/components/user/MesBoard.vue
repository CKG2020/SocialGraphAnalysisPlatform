<template>
  <el-container>
    <el-header height="220">
      <div>
        留言板
      </div>
    </el-header>

    <el-main>
      <el-table
        ref="questionTable"
        highlight-current-row
        v-loading="loading"
        :border="true"
        :data="boardInfo"
        tooltip-effect="dark"
        style="width: 100%;">
        <el-table-column align="center" label="留言用户">
          <template slot-scope="scope">
            {{ scope.row.from_account }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="留言内容">
          <template slot-scope="scope">
            {{ scope.row.board_text }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="留言时间">
          <template slot-scope="scope">
            {{ scope.row.date_time }}
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    import exam from '@/api/exam'


    export default {
        name: 'MesBoard',
        data () {
            return {
                boardInfo: [],

            }
        },
        created () {
            this. getBoardInfo()


        },
        methods: {
              getBoardInfo () {
                exam.getBoardInfo().then((resp) => {
                    console.log("ooooooooo"+resp.data.code)
                    if (resp.data.code === 666) {
                        console.log("ooooooooo"+resp.data.obj)
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


        },
        computed: {

        }
    }
</script>

<style scoped lang="scss">
  @import "../../assets/css/student/examOnline";
</style>
