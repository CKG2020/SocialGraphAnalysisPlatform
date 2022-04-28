import request from '@/utils/request'

export default {
  //获取留言板信息
  getBoardInfo () {
    return request({
      url: '/board/showBoardMsg',
      method: 'get',
      // data: queryInfo
    })
  },
  //完善信息时先查询userInfo表单 展现在界面上
  getSelectUserInfo(){
    return request({
      url:'/stu/selectUserInfo',
      method:'get'
    })
  },
//完善个人信息
  updateUserInfo(UserInfo){
      return request({
        url:'/stu/update',
        method:'post',
        data:UserInfo
      })
  },
//获取问卷的题目
  getQuestionnaire(){
    return request({
      url:'/question/show',
      method:'get'

    })
  },
//获取个人account
  getUserAccount(){
    return request({
      url:'/stu/search',
      method:'get'
    })
  },

//获取所有的朋友
  getAllFriends(){
    return  request({
      url:'/friend/getFriends',
      method:'get'
    })
  },
  //获取某用户的userinfo
  getUserInfo(user_account){
    return  request({
      url:'/stu/getByAccount',
      method:'post',
      data:user_account
    })
  },

 //给好友发送留言
  addBoardMsg(BoardMsg){
    return request({
      url: '/board/addBoardMsg',
      method:'post',
      data:BoardMsg
    })
  },


  //修改好友关系
  updateFriendRel(FriendRequest){
    return  request({
      url:'/friend/updateRel',
      method:'post',
      data:FriendRequest
    })

  },

//获取所有用户的UserInfo
  findAll(params){
    return request({
      url:'/admin/findAll',
      method:'get',
      params: params
    })
  },

//得到某一个用户的信息
  findUsersByAccount(params){
    return request({
      url:'/admin/findUsersByAccount',
      method:'get',
      params: params
    })
  },
  //查看我的申请以及好友申请
  getRequest(params){
    return request({
      url:'/friend/getRequest',
      method:'get',
      params: params
    })
  },
  showInfo(params){
    return request({
      url:'/stu/showInfo',
      method:'get',
      params: params
    })
  },

  //发起好友请求
  addRequest(FriendRequest){
    return  request({
      url:'/friend/addRequest',
      method:'post',
      data:FriendRequest
    })
  },

  getAllQuestions(params){
    return request({
      url:'/admin/getAllQuestions',
      method:'get',
      params: params
    })
  },

  getResult(params){
    return request({
      url:'/question/getResult',
      method:'get',
      params: params
    })
  },
  saveSettings(Settings){
    return request({
      url:'/settings/save',
      method:'post',
     data:Settings
    })
  },

  sendAnswers(params){
    return request({
      url:'/question/sendAnswers',
      method:'post',
      params: params
    })
  },

  addMyQuestion(Question){
    return request({
      url:'/admin/addQuestion',
      method:'post',
      data:Question
    })
  },

  getAvailableQuestions(){
    return request({
      url:'/admin/getAvailableQuestions',
      method:'get',
    })
  },
  getQuestionsDetail(params){
    return request({
      url:'/admin/getQuestionsDetail',
      method:'get',
      params: params
    })
  },

  getChatLogsName(){
    return request({
      url:'/admin/getChatLogsName',
      method:'get',
    })
  },

  getChatLog(params){
    return request({
      url:'/admin/getChatLog',
      method:'get',
      params: params
    })
  },

  graphfindAll(){
    return request({
      url:'/admin/graphfindAll',
      method:'get',
    })
  },

  findAllFriendRequest(){
    return request({
      url:'/friend/findAllFriendRequest',
      method:'get',
    })
  },

// 答题情况 admin 分析情况
  finishedPercent(){
    return request({
      url:'/admin/finishedPercent',
      method:'get',
    })
  },


  findMyAllFriendRequest(){
    return request({
      url:'/friend/findMyAllFriendRequest',
      method:'get',
    })

  },


  findFriAllFriendRequest(params){
    return request({
      url:'/friend/findFriAllFriendRequest',
      method:'get',
      params: params
    })

  },
  addQuestionPage(QuestionPage){
    return request({
      url:'/admin/addQuestionPage',
      method:'post',
      data:QuestionPage
    })
  }
  ,
  searchSettings(){
    return request({
      url:'/settings/search',
      method:'get',

    })
  }



}


