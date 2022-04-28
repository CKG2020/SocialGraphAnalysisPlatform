<template>
  <div>
    <div id="myEcharts" ref="myEcharts" style="width:1000px;height: 600px"></div>

  </div>

</template>

<script>
    import echarts from "echarts";
    import exam from "../../api/exam";
const friAccount={
 user_account:''
}
    export default {
        name: "Echart",
        data() {
            return {
                // dataArr: [
                //     {
                //         'name': 'per',
                //         // 'category': 'name',
                //         // 'draggable': true,
                //     }, {
                //         'name': 'loc',
                //         // 'category': 'body',
                //         // 'draggable': true
                //     }, {
                //         'name': 'name',
                //         // 'category': 'per',
                //         // 'draggable': true
                //     }, {
                //         'name': '角色',
                //         // 'category': 'time',
                //         // 'draggable': true
                //     }],
                // liArr: [
                //     {
                //         source: 'ckg',
                //         target: 'brh',
                //         relation: '朋友',
                //
                //     },
                //     {
                //         source: 'brh',
                //         target: 'ckg',
                //         relation: '朋友'
                //     },
                //     // {
                //     //     source: 'per',
                //     //     target: '角色'
                //     // }, {
                //     //     source: 'loc',
                //     //     target: 'name'
                //     // }, {
                //     //     source: '角色',
                //     //     target: 'name'
                //     // },
                //
                //
                // ],
                dataArr:[],
                liArr:[],
                mydataArr:[],
                myliArr:[],
                myAnotherArr:[],
                totalLength:0


            }
        },
        created(){
        },
        mounted() {
            exam.graphfindAll().then((resp) => {
                if (resp.data.code === 666) {
                    this.mydataArr = resp.data.obj
                    //测试
                    //定义一个对象
                    //   var student = new Object();
                    //   student.name = "Lanny";
                    //   student.age = "25";
                    //   student.location = "China";
                    //   var json = JSON.stringify(student);
                    var names = [];
                    for(let i=0;i<this.mydataArr.length;i++) {
                        names.push(this.mydataArr[i].user_account)
                    }
                    for(let i=0;i<names.length;i++){
                        this.dataArr[i]={
                            name:names[i],
                        }
                    }
                    exam.findMyAllFriendRequest().then((resp)=>{
                        if (resp.data.code === 666) {
                            this.myliArr = resp.data.obj

                            for(let i=0;i<this.myliArr.length;i++){
                                if (this.myliArr[i].addStatus===0){
                                    this.liArr[i]={
                                        source:this.myliArr[i].account1,
                                        target:this.myliArr[i].account2,
                                        relation: '正在申请对方为朋友'
                                    }
                                }
                                else {
                                    this.liArr[i]={
                                        source:this.myliArr[i].account1,
                                        target:this.myliArr[i].account2,
                                        relation: '朋友'
                                    }
                                }
                            }

                           this.totalLength=this.myliArr.length
                            console.log("oooooooooooo"+this.totalLength)


                            this.drawChart(this.dataArr, this.liArr)
                        }
                    })
                }
                else {
                    this.$notify({
                        title: 'Tips',
                        message: '获取用户数据失败',
                        type: 'error',
                        duration: 2000
                    })
                }
            })

        },
        methods: {

            drawChart(data, line) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById("myEcharts"));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            type: 'graph',
                            layout: 'force',   //因为节点的位置已经有了就不用在这里使用布局了
                            focusNodeAdjacency: false,
                            // legendHoverLink: true,
                            roam: true,   //添加缩放和移动
                            edgeSymbolSize: [4, 8],
                            edgeSymbol: ['circle', 'none'], // 边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头
                            cursor: 'pointer',
                            force: {
                                repulsion: [1000, 2000], //节点之间的斥力因子,支持设置成数组表达斥力的范围
                                edgeLength: [600, 100],
                                // edgeLength: [10, 20],
                                layoutAnimation: true,
                                friction: 0.1, //节点的移动速度。取值范围 0 到 1。
                                // edgeLength: [70, 90], //两个节点之间的距离，这个距离也会受 repulsion影响
                            },
                            label: {
                                show: true, // 图形上的文本标签， 可用于说明图形的一些数据信息， 比如值， 名称等
                                fontSize: 12,
                                color: '#000', //如果设置为 'inherit'，则为视觉映射得到的颜色，如系列色。
                                width: 100,
                                overflow: "break", //文字超出宽度是否截断或者换行。配置width时有效
                            },
                            labelLayout: {
                                moveOverlap: 'shiftX', //在标签重叠的时候是否挪动标签位置以防止重叠。
                                draggable: true, //标签是否可以允许用户通过拖拽二次调整位置。
                            },
                            emphasis: {
                                scale: true, //是否开启高亮后节点的放大效果。
                                focus: 'adjacency'
                            },
                            draggable: true,  //这里设置为false，不然拖拽鼠标和节点有偏移
                            itemStyle: {
                                normal: {
                                    color: "#4592FF",
                                }
                            },
                            categories: [
                                {
                                    name: 'per',
                                    itemStyle: {
                                        normal: {
                                            color: "#009800",
                                        }
                                    }
                                }, {
                                    name: 'name',
                                    itemStyle: {
                                        normal: {
                                            color: "#4592FF",
                                        }
                                    }
                                }, {
                                    name: '角色',
                                    itemStyle: {
                                        normal: {
                                            color: "#ff232b",
                                        }
                                    }
                                }, {
                                    name: 'time',
                                    itemStyle: {
                                        normal: {
                                            color: "#e6dd1c",
                                        }
                                    }
                                }, {
                                    name: 'body',
                                    itemStyle: {
                                        normal: {
                                            color: "#c489e6",
                                        }
                                    }
                                }, {
                                    name: 'sigos',
                                    itemStyle: {
                                        normal: {
                                            color: "#a0e6a5",
                                        }
                                    }
                                }, {
                                    name: 'check',
                                    itemStyle: {
                                        normal: {
                                            color: "#e6bfac",
                                        }
                                    }
                                }, {
                                    name: 'disease',
                                    itemStyle: {
                                        normal: {
                                            color: "#859f89",
                                        }
                                    }
                                }, {
                                    name: 'treatmeot',
                                    itemStyle: {
                                        normal: {
                                            color: "#686767",
                                        }
                                    }
                                }],
                            symbolSize: 100,  //改变节点大小
                            lineStyle: {
                                color: "#ccc",
                                width: 3,
                                opacity: 0.9,
                                curveness: 0.2, //关系线的曲度，支持从 0 到 1 的值，值越大曲度越大。
                            },
                            data: data,
                            links: line,
                            // nodes: [
                            //     { name: '李四'},
                            //     // {category: 1, name: '李四', value: 2},
                            //     //
                            //     // {
                            //     //     category: 1, name: '张三', value: 4, onclick: function focus(param) {
                            //     //         alert(param)
                            //     //     }
                            //     // },
                            //
                            //
                            // ],

                            autoCurveness: 0.01, //多条边的时候，自动计算曲率
                            edgeLabel: {//边的设置
                                show: true,
                                position: "middle",
                                fontSize: 12,
                                formatter: (params) => {
                                    return params.data.relation;
                                },
                            },
                            edgeSymbol: ["circle", "arrow"], //边两边的类型
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);

                // 点击node节点的事件
                myChart.on('click', function (param) {
                    console.log('node节点的数组---->', param.data);  // 打印出param, 可以看到里边有很多参数可以使用
                    // let key = 'symbolSize'
                    // let value = 80
                    //
                    // param.data[key] = value
                    //获取节点点击的数组序号
                    var arrayIndex = param.dataIndex;
                    console.log('arrayIndex---->', arrayIndex);
                    console.log('name---->', param.name);
                    friAccount.user_account=param.name

                    exam.findFriAllFriendRequest(friAccount).then((resp)=>{
                        if (resp.data.code === 666) {
                            this.myAnotherliArr = resp.data.obj
                            for(let i=0;i<this.myAnotherliArr.length;i++){
                                if (this.myAnotherliArr[i].addStatus===0){
                                    this.liArr[i+1+this.totalLength]={
                                        source:this.myAnotherliArr[i].account1,
                                        target:this.myAnotherliArr[i].account2,
                                        relation: '正在申请对方为朋友'
                                    }
                                }
                                else {
                                    this.liArr[i+1+this.totalLength]={
                                        source:this.myAnotherliArr[i].account1,
                                        target:this.myAnotherliArr[i].account2,
                                        relation: '朋友'
                                    }
                                }
                            }
                            drawChart(this.dataArr, this.liArr)
                        }
                    })

                    // if (param.dataType == 'node') {
                    //     alert("点击了节点" + param.name)
                    // } else {
                    //     alert("点击了边" + param.value)
                    // }
                })



            }
        }
    }
</script>

<style scoped>
  .liStyle {
    height: 40px;
    line-height: 40px;
  }
</style>

