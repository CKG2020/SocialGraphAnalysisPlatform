<template>
  <div id="app">
    <div class="page-loader" ref="loader">
      <div class="page-loader__spinner">
        <svg viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
    </div>
    <div class="sidebar">
      <div class="card">
        <header>
          <p class="name">{{name}}</p>
        </header>
      </div>
      <div class="list">
        <ul>
          <li>
            <img class="avatar" width="30" height="30" src="../../assets/imgs/group.png">
            <p class="name">系统群聊</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="message" ref="box">
        <ul>
          <li v-for="(item,key) in messageList" :id="key == (messageList.length - 1) ? 'end' : ''">
            <p class="time">
              <span>{{item.userId}}</span>
            </p>
             <div >
              <span class="main-name">来自:{{item.userName}}</span>
              <div class="text">{{item.msg}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="text">
        <el-input
          v-model="form.message" @keyup.native.enter="send"
          type="textarea" :rows="5" placeholder="请输入内容，按 Enter 键发送">
        </el-input>
        <div class="btn">
          <el-button @click="clean" size="mini" type="danger">清空</el-button>
          <el-button @click="send" size="mini" icon="el-icon-position" type="success">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import exam from "../../api/exam";

    export default {
        name: "Chat",
        data() {
            return {
                online: 0,
                websocket: undefined,
                    name: '',
                showMessage:'',
                form: {message: ''},

                messageFormat:{
                    userId:'1629903139122',
                    userName:'',
                    msg:''
                },


               messageList:[],
                ws:"",

            }
        },
        updated() {
            this.scroll()
        },
        mounted() {

            this.$refs.loader.style.display = 'none';
        },
        created() {
            this.init();
            window.addEventListener('beforeunload', e => this.closeWebsocket(e))
        },
        methods: {
            _message(message, type) {
                this.$message({
                    message: message,
                    type: type
                })
            },
            _notify(title, message, type) {
                this.$notify({
                    title: title,
                    message: message,
                    type: type
                });
            },


            init() {


                this.initUser();


                this.initWebSocket();
            },

            initUser() {

                exam.getUserAccount().then(
                    response=>{
                        this.name=response.data.obj
                    }
                )

            },

            initWebSocket() {
                let $this = this;
                // this.websocket = new WebSocket(api.websocket(this.form.id))
                this.websocket = new WebSocket("ws://localhost:8889/websocket");

                //链接发送错误时调用
                this.websocket.onerror = function () {
                    $this._notify('提醒', 'WebSocket链接错误', 'error')
                }
                //链接成功时调用
                this.websocket.onopen = function (event) {
                    $this._notify('提醒', 'WebSocket链接成功', 'success')
                }

                //接收到消息时回调
                 this.websocket.onmessage = function (event) {
                //     let entity = JSON.parse(event.data);
                //     var myDate = new Date();
                //     console.log("xxxxxxxxxxx"+myDate.toLocaleString())
                //     this.time=myDate.toLocaleString()
                //     this.from_name=entity.userName
                //     this.message=entity.msg
                //     console.log("==================")
                //     console.log(this.time)
                //     console.log(this.from_name)
                //     console.log(this.message)
                  let data = JSON.parse(event.data)
                     if(data.userName){
                           $this.messageList.push(data)
                     }
                     else {
                         this.online=data
                         console.log("xxxxxxxxxxxxxxxxxxzzzzzzz"+data)
                         $this._notify('提醒', '当前在线人数:'+data,'info' )
                     }
                     $this.scroll()
                }
                //链接关闭时调用
                this.websocket.onclose = function () {

                    $this._notify('提醒', 'WebSocket链接关闭', 'info')
                }

            },

            //推送消息
            send() {
                if (this.form.message == null || this.form.message.trim() == '') {
                    this._message('请输入消息内容', 'warning')
                    return;
                      }
                else {
                    var myDate = new Date();
                    this.messageFormat.userId=myDate.toLocaleString()
                    this.messageFormat.userName=this.name
                    this.messageFormat.msg=this.form.message

                   let sendMessage= JSON.stringify(this.messageFormat)
                    this.websocket.send(sendMessage)
                }
                this.form.message=''
                this.scroll()
            },

            //清空消息
            clean() {
                this.form.message = ''
            },
            //切换选择窗口
            selectWindow(id) {
                this.current_window_id = id;
                if (!this.current_window_id) {
                    this.initCommonMessage();
                } else {
                    this.initSelfMessage();
                }
            },

            //窗口滚动
            scroll() {
                let box = this.$refs.box
                // box.scrollTop = 10000000
            },

            closeWebsocket(){
                if(this.ws){
                    this.ws.close();
                    let _this=this
                    this.ws.onclose = function(evt) {
                        $this._notify('提醒', 'WebSocket关闭', 'info')
                    };
                }
            }
        },
        beforeDestroy() {
            window.addEventListener('beforeunload', e => this.closeWebsocket(e))
        }

    }
</script>

<style scoped lang="css">
  @import "../../assets/css/chat/main.css";
</style>
