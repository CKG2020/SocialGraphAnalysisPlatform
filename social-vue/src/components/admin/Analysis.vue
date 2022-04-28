<!--<template>-->

<!--  <div id="myChart" :style="{width: '350px', height: '300px'}"></div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: 'hello',-->
<!--        data () {-->
<!--            return {-->
<!--                msg: 'Welcome to Your Vue.js App'-->
<!--            }-->
<!--        },-->
<!--        mounted(){-->
<!--            this.drawLine();-->
<!--        },-->
<!--        methods: {-->
<!--            drawLine(){-->
<!--                // 基于准备好的dom，初始化echarts实例-->
<!--                let myChart = this.$echarts.init(document.getElementById('myChart'))-->
<!--                // 绘制图表-->
<!--                myChart.setOption({-->
<!--                    title: { text: '已完成问卷用户各类社交能力分布情况' },-->
<!--                    tooltip: {},-->
<!--                    xAxis: {-->
<!--                        data: ["A类","B类","C类","D类"]-->
<!--                    },-->
<!--                    yAxis: {},-->
<!--                    series: [{-->
<!--                        name: '数量',-->
<!--                        type: 'bar',-->
<!--                        data: [1, 2, 3, 1]-->
<!--                    }]-->
<!--                });-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <el-row>
  <div id="myChart"></div>
    <el-col>
      <div id="myPieChart"></div>
      <div >共注册人数：<span>{{allCount}}</span>。完成问卷的有：
        <span>{{finishCount}}</span> 人.</div>
      <div>各类人格描述:</div>
        <div>A类型:</div>
        <div>人际交往能力很强，具有合群、同情、爱心、助人的精神</div>
        <div>B类型:</div>
        <div>人际交往能力强</div>
        <div>C类型:</div>
        <div>人际关系有待改善，需要向具有合群、同情、爱心、助人的精神方面努力</div>
        <div>D类型:</div>
        <div>人际交往能力较差，加强学习，多交朋友，多向别人请教人际交往的知识</div>


    </el-col>
  </el-row>
</template>

<script>
    import echarts from 'echarts'	// 引入echarts
    import exam from "../../api/exam";
    const  mydata1=[]
    const  mydata2=[]
    export default {
        name: 'LineChart',
        data () {
            return {
                allCount:0,
                finishCount:0,
                echartsOption: {	// echarts选项，所有绘图数据和样式都在这里设置
                    xAxis: {
                        type: 'category',
                        data: ['A类', 'B类', 'C类', 'D类'],   // x轴数据
                        name: '社交能力分类',   // x轴名称
                        nameTextStyle: {	// x轴名称样式
                            fontWeight: 600,
                            fontSize: 18
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '各类人数所占数量',   // y轴名称
                        nameTextStyle: {	// y轴名称样式
                            fontWeight: 600,
                            fontSize: 18
                        }
                    },
                    tooltip: {   //鼠标放到图上的数据展示样式
                        trigger: 'axis'
                    },
                    series: [{  //series中加入每个bar的数据
                        name: '数量',
                        type: 'bar',
                        barWidth: '50%',
                        // data: [this.countA, this.countB, this.countC, this.countD],
                        data:mydata1,
                    }],
                },
                echartsOption1: {	// echarts选项，所有绘图数据和样式都在这里设置
                    legend: {	//图表上方的图例
                        data: ['A类', 'B类', 'C类', 'D类'],
                        orient: 'horizontal', // 布局方式，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
                        // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                        x: 'right',
                        // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                        y: 'bottom',

                    },
                    tooltip: {   //鼠标放到图上的数据展示样式
                        trigger: 'axis'
                    },
                    series: [{
                        name: '各类人数市值占比',
                        type: 'pie',
                        barWidth: '60%',
                        data:mydata2
                    }],
                }
            }
        },
        created(){
            this.finishedPercent()

        },
        mounted () {


        },

        methods:{
            finishedPercent(){
                exam.finishedPercent().then((resp) => {
                    if (resp.data.code === 666) {
                        this.allCount=resp.data.obj.allCount
                        this.finishCount=resp.data.obj.finishedCount
                        mydata1.push(resp.data.obj.countA)
                        mydata1.push(resp.data.obj.countB)
                        mydata1.push(resp.data.obj.countC)
                        mydata1.push(resp.data.obj.countD)

                        mydata2[0]={
                            value:resp.data.obj.percentA,
                            name:'A类'
                        }
                        mydata2[1]={
                            value:resp.data.obj.percentB,
                            name:'B类'
                        }
                        mydata2[2]={
                            value:resp.data.obj.percentC,
                            name:'C类'
                        }
                        mydata2[3]={
                            value:resp.data.obj.percentD,
                            name:'D类'
                        }
                        let myChart = echarts.init(document.getElementById('myChart'), 'light')	// 初始化echarts, theme为light
                        myChart.setOption(this.echartsOption)	// echarts设置选项

                        let myChart1 = echarts.init(document.getElementById('myPieChart'), 'light')	// 初始化echarts, theme为light
                        myChart1.setOption(this.echartsOption1)	// echarts设置选项
                    } else {
                        this.$notify({
                            title: 'Tips',
                            message: '获取所有用户信息失败',
                            type: 'error',
                            duration: 1000
                        })
                    }
                })
            }

        }
    }
</script>

<style>
  #myChart{
    width: 100%;
    height: 300px;
    margin: 0 auto;
    margin-top: 5%;
  }

  #myPieChart{
    width:50%;
    height: 250px;
    margin: 0 auto;
    margin-top: 5%;
  }
#myDesChart{
    /*width:50%;*/
    /*height: 500px;*/
    /*margin: 0 auto;*/
    /*margin-top: 5%;*/

  class:"el-col el-col-18";
  style:"display: flex; align-items: center; height: 300px;"
  }


</style>
