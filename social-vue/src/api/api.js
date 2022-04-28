let API = {
  //应用表
  api: {
    //登陆接口
    login: '/doLogin',
    //注册接口
    register: '/stu/doRegistry',
    //查询留言板信息
    getBoardInfo: '/board/showBoardMsg',
    //完善个人信息
    updateUserInfo:'/stu/update',
    //获取问卷题目
    getQuestionnaire:'/question/show',
    //获取登录用户的账号
    getUserAccount:'/stu/search',
    //获取所有朋友
    getAllFriends:'/friend/getFriends',
    //根据账号获取某好友用户的userinfo  好友用户信息均可以看
    getUserInfo:'/stu/getByAccount',
    //给好友发送留言
    addBoardMsg:'/board/addBoardMsg',
    //修改好友关系 包括删除 添加好友
    updateFriendRel:'/friend/updateRel',
    //获取所有的用户信息
    findUsers:'/admin/findAll',
    //搜索得到某一个用户的信息
    findUsersByAccount:'/admin/findUsersByAccount',
    //查看好友申请信息
    getRequest:'/friend/getRequest',
    //有权限的查看非好友用户信息
    showInfo:'/stu/showInfo',
    //发起好友请求
    addRequest:'/friend/addRequest',
//获取所有问题
    getAllQuestions:'/admin/getAllQuestions',
    //获取结果评价
    getResult:'/question/getResult',

    saveSettings:'/settings/save',
    searchSettings:'/settings/search',



    sendAnswers:'/question/sendAnswers',

    addMyQuestion:'/admin/addQuestion',

    getAvailableQuestions:'/admin/getAvailableQuestions',

    getQuestionsDetail:'/admin/getQuestionsDetail',

    getChatLogsName:'/admin/getChatLogsName',

    getChatLog:'/admin/getChatLog',

    graphfindAll:'/admin/graphfindAll',

    findAllFriendRequest:'/friend/findAllFriendRequest',

    finishedPercent:'/admin/finishedPercent',

    findMyAllFriendRequest:'/friend/findMyAllFriendRequest',

    findFriAllFriendRequest:'/friend/findFriAllFriendRequest',

    addQuestionPage:'/admin/addQuestionPage',



  },
}

export default {
  API: API,
}
