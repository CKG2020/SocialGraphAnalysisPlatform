<template>
  <div>
    <p class="title">{{ list3[0].title }}</p>
    <div>
      <label><input v-model="x0" type="radio" value=1 @change="getRadioVal">{{ list3[0].answer1.split("//")[0] }}</label>
      <label><input v-model="x0" type="radio" value=2 @change="getRadioVal">{{ list3[0].answer2.split("//")[0] }}</label>
      <label><input v-model="x0" type="radio" value=3 @change="getRadioVal">{{ list3[0].answer3.split("//")[0] }}</label>
    </div>

<!--    <p class="title">{{ list3[0].title }}</p>-->
<!--    <el-radio-group @change="hand(item,index)" >-->
<!--      <el-radio  v-model="x0" :lable=1>{{ list3[0].answer1 }}</el-radio>-->
<!--      <el-radio  v-model="x0" :lable=2>{{ list3[0].answer2}}</el-radio>-->
<!--      <el-radio  v-model="x0" :lable=3>{{ list3[0].answer3 }}</el-radio>-->
<!--    </el-radio-group>-->
<!--      <div v-for="(item, index) of list3" :key="index" style="margin-bottom: 10px">-->
    <p class="title">{{ list3[1].title }}</p>
    <div>
      <label><input v-model="x1" type="radio" value=1 @change="getRadioVal">{{ list3[1].answer1.split("//")[0] }}</label>
      <label><input v-model="x1" type="radio" value=2 @change="getRadioVal">{{ list3[1].answer2.split("//")[0] }}</label>
      <label><input v-model="x1" type="radio" value=3 @change="getRadioVal">{{ list3[1].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{ list3[2].title }}</p>
    <div>
      <label><input v-model="x2" type="radio" value=1 @change="getRadioVal">{{ list3[2].answer1.split("//")[0] }}</label>
      <label><input v-model="x2" type="radio" value=2 @change="getRadioVal">{{ list3[2].answer2.split("//")[0] }}</label>
      <label><input v-model="x2" type="radio" value=3 @change="getRadioVal">{{ list3[2].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{ list3[3].title }}</p>
    <div>
      <label><input v-model="x3" type="radio" value=1 @change="getRadioVal">{{ list3[3].answer1.split("//")[0] }}</label>
      <label><input v-model="x3" type="radio" value=2 @change="getRadioVal">{{ list3[3].answer2.split("//")[0] }}</label>
      <label><input v-model="x3" type="radio" value=3 @change="getRadioVal">{{ list3[3].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{ list3[4].title }}</p>
    <div>
      <label><input v-model="x4" type="radio" value=1 @change="getRadioVal">{{ list3[4].answer1.split("//")[0] }}</label>
      <label><input v-model="x4" type="radio" value=2 @change="getRadioVal">{{ list3[4].answer2.split("//")[0] }}</label>
      <label><input v-model="x4" type="radio" value=3 @change="getRadioVal">{{ list3[4].answer3.split("//")[0] }}</label>
    </div>

    <p class="title">{{ list3[5].title }}</p>
    <div>
      <label><input v-model="x5" type="radio" value=1 @change="getRadioVal">{{ list3[5].answer1.split("//")[0] }}</label>
      <label><input v-model="x5" type="radio" value=2 @change="getRadioVal">{{ list3[5].answer2.split("//")[0] }}</label>
      <label><input v-model="x5" type="radio" value=3 @change="getRadioVal">{{ list3[5].answer3.split("//")[0] }}</label>
    </div>

    <p class="title">{{ list3[6].title }}</p>
    <div>
      <label><input v-model="x6" type="radio" value=1 @change="getRadioVal">{{ list3[6].answer1.split("//")[0] }}</label>
      <label><input v-model="x6" type="radio" value=2 @change="getRadioVal">{{ list3[6].answer2.split("//")[0] }}</label>
      <label><input v-model="x6" type="radio" value=3 @change="getRadioVal">{{ list3[6].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{ list3[7].title }}</p>
    <div>
      <label><input v-model="x7" type="radio" value=1 @change="getRadioVal">{{ list3[7].answer1.split("//")[0] }}</label>
      <label><input v-model="x7" type="radio" value=2 @change="getRadioVal">{{ list3[7].answer2.split("//")[0] }}</label>
      <label><input v-model="x7" type="radio" value=3 @change="getRadioVal">{{ list3[7].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{ list3[8].title }}</p>
    <div>
      <label><input v-model="x8" type="radio" value=1 @change="getRadioVal">{{ list3[8].answer1.split("//")[0] }}</label>
      <label><input v-model="x8" type="radio" value=2 @change="getRadioVal">{{ list3[8].answer2.split("//")[0] }}</label>
      <label><input v-model="x8" type="radio" value=3 @change="getRadioVal">{{ list3[8].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{ list3[9].title }}</p>
    <div>
      <label><input v-model="x9" type="radio" value=1 @change="getRadioVal">{{ list3[9].answer1.split("//")[0] }}</label>
      <label><input v-model="x9" type="radio" value=2 @change="getRadioVal">{{ list3[9].answer2.split("//")[0]}}</label>
      <label><input v-model="x9" type="radio" value=3 @change="getRadioVal">{{ list3[9].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{ list3[10].title }}</p>
    <div>
      <label><input v-model="x10" type="radio" value=1 @change="getRadioVal">{{ list3[10].answer1.split("//")[0] }}</label>
      <label><input v-model="x10" type="radio" value=2 @change="getRadioVal">{{ list3[10].answer2.split("//")[0] }}</label>
      <label><input v-model="x10" type="radio" value=3 @change="getRadioVal">{{ list3[0].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{ list3[11].title }}</p>
    <div>
      <label><input v-model="x11" type="radio" value=1 @change="getRadioVal">{{ list3[11].answer1.split("//")[0] }}</label>
      <label><input v-model="x11" type="radio" value=2 @change="getRadioVal">{{ list3[11].answer2.split("//")[0] }}</label>
      <label><input v-model="x11" type="radio" value=3 @change="getRadioVal">{{ list3[11].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{list3[12].title }}</p>
    <div>
      <label><input v-model="x12" type="radio" value=1 @change="getRadioVal">{{ list3[12].answer1.split("//")[0] }}</label>
      <label><input v-model="x12" type="radio" value=2 @change="getRadioVal">{{ list3[12].answer2.split("//")[0] }}</label>
      <label><input v-model="x12" type="radio" value=3 @change="getRadioVal">{{ list3[12].answer3.split("//")[0] }}</label>
    </div>

    <p class="title">{{list3[13].title }}</p>
    <div>
      <label><input v-model="x13" type="radio" value=1 @change="getRadioVal">{{ list3[13].answer1.split("//")[0] }}</label>
      <label><input v-model="x13" type="radio" value=2 @change="getRadioVal">{{ list3[13].answer2.split("//")[0] }}</label>
      <label><input v-model="x13" type="radio" value=3 @change="getRadioVal">{{ list3[13].answer3.split("//")[0] }}</label>
    </div>

    <p class="title">{{list3[14].title }}</p>
    <div>
      <label><input v-model="x14" type="radio" value=1 @change="getRadioVal">{{ list3[14].answer1.split("//")[0] }}</label>
      <label><input v-model="x14" type="radio" value=2 @change="getRadioVal">{{ list3[14].answer2.split("//")[0] }}</label>
      <label><input v-model="x14" type="radio" value=3 @change="getRadioVal">{{ list3[14].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{list3[15].title }}</p>
    <div>
      <label><input v-model="x15" type="radio" value=1 @change="getRadioVal">{{ list3[15].answer1.split("//")[0] }}</label>
      <label><input v-model="x15" type="radio" value=2 @change="getRadioVal">{{ list3[15].answer2.split("//")[0] }}</label>
      <label><input v-model="x15" type="radio" value=3 @change="getRadioVal">{{ list3[15].answer3.split("//")[0] }}</label>
    </div>


    <p class="title">{{list3[16].title }}</p>
    <div>
      <label><input v-model="x16" type="radio" value=1 @change="getRadioVal">{{ list3[16].answer1.split("//")[0] }}</label>
      <label><input v-model="x16" type="radio" value=2 @change="getRadioVal">{{ list3[16].answer2.split("//")[0] }}</label>
      <label><input v-model="x16" type="radio" value=3 @change="getRadioVal">{{ list3[16].answer3.split("//")[0] }}</label>
    </div>
    <p class="title">{{list3[17].title }}</p>
    <div>
      <label><input v-model="x17" type="radio" value=1 @change="getRadioVal">{{ list3[17].answer1.split("//")[0] }}</label>
      <label><input v-model="x17" type="radio" value=2 @change="getRadioVal">{{ list3[17].answer2.split("//")[0] }}</label>
      <label><input v-model="x17" type="radio" value=3 @change="getRadioVal">{{ list3[17].answer3.split("//")[0] }}</label>
    </div>
    <p class="title">{{list3[18].title }}</p>
    <div>
      <label><input v-model="x18" type="radio" value=1 @change="getRadioVal">{{ list3[18].answer1.split("//")[0] }}</label>
      <label><input v-model="x18" type="radio" value=2 @change="getRadioVal">{{ list3[18].answer2.split("//")[0] }}</label>
      <label><input v-model="x18" type="radio" value=3 @change="getRadioVal">{{ list3[18].answer3.split("//")[0] }}</label>
    </div>
    <p class="title">{{list3[19].title }}</p>
    <div>
      <label><input v-model="x19" type="radio" value=1 @change="getRadioVal">{{ list3[19].answer1.split("//")[0] }}</label>
      <label><input v-model="x19" type="radio" value=2 @change="getRadioVal">{{ list3[19].answer2.split("//")[0] }}</label>
      <label><input v-model="x19" type="radio" value=3 @change="getRadioVal">{{ list3[19].answer3.split("//")[0] }}</label>
    </div>
<!--        <div class="applist" v-for="(item,index) in list3" :key="index">-->
<!--              <p>{{item.title}}</p>-->
<!--                <el-radio-group v-model="form.radioArray[index]" @change="hand(item,index)" >-->
<!--                  <el-radio :lable="1">{{ item.answer1 }}</el-radio>-->
<!--                  <el-radio :lable="2">{{ item.answer2}}</el-radio>-->
<!--                  <el-radio :lable="3">{{ item.answer3 }}</el-radio>-->
<!--                </el-radio-group>-->
<!--    &lt;!&ndash;      <i class="icon-span" :class="{'icon-span-select' : index==current}" 	@click="check(item,index)"></i>&ndash;&gt;-->
    <el-row>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-row>
        </div>


</template>

<script>
  import exam from "../../api/exam";
  const myscore={
      score:0,
  }
  export default {
          name:"Question",
        data(){
            return {
                x0:1,
                x1:1,
                x2:1,
                x3:1,
                x4:1,
                x5:1,
                x6:1,
                x7:1,
                x8:1,
                x9:1,
                x10:1,
                x11:1,
                x12:1,
                x13:1,
                x14:1,
                x15:1,
                x16:1,
                x17:1,
                x18:1,
                x19:1,
                list3:[],

            }

        },
      created() {
          this.getinfo2()
      },
        methods: {
            //单选数据
            hand(item,index){
                // console.log("ooooooooooooooo"+this.xx)
                // console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz"+this.form.radioArray[index])
                // let aa={id:id,answer:this.form.radioArray[index]}
                // this.value.push(aa)
                // for (var i = 0; i < this.value.length; i++) {
                //     for (var j = i + 1; j < this.value.length; j++) {
                //         if (this.value[i].id == this.value[j].id) {
                //             this.value.splice(i, 1);
                //             j--;
                //         }
                //     }
                // }
            },
            getRadioVal() {
                // console.log(this.x0);
            },
            getinfo2(){
                exam.getQuestionnaire().then((resp) => {
                        this.list3=resp.data.obj
                       //  console.log(this.list3)
                       //  console.log("============================")
                       //   console.log(this.list3[0].answer1)
                       //  //
                       //  // var  msg="ddd//1";
                       //  // var nowmsg=msg.split("//");
                       //  // console.log(nowmsg[0])
                       // console.log( this.list3[0].answer1.split("//")[0])

                })
            },
            submitForm(){
                var  score=Number(this.x0)+Number(this.x1)+Number(this.x2)+Number(this.x3)+Number(this.x4)+Number(this.x5)+Number(this.x6)+Number(this.x7)+Number(this.x9)+Number(this.x10)
                           +Number(this.x11)+Number(this.x12)+Number(this.x13)+Number(this.x15)+Number(this.x16)+Number(this.x17)+Number(this.x18)+Number(this.x19)
                console.log("oooooooooooooooooooooooo"+score)
                  myscore.score=score
                exam.sendAnswers(myscore).then((resp) => {
                    if (resp.data.code === 666) {
                        this.$notify({
                            title: 'Success',
                            message: resp.data.message,
                            type: 'success',
                            duration: 2000
                        })
                    } else {
                        this.$notify({
                            title: 'Tips',
                            message: '获取所有用户信息失败',
                            type: 'error',
                            duration: 2000
                        })
                    }

                })


            }

        },
    };
</script>

<style scoped>
  .box {
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 20px;
    margin-bottom: 2px;
    padding-left: 40px;
    font-size: 16px;
    border-bottom: 1px #ccc solid;

  }
  .title {
    line-height: 25px;
    margin-bottom: 2px;
    border: solid #ccc 1px;
    background-color: #1989fa;
    font-size: 16px;
    color: #fff;


  }
</style>
