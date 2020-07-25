'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({}, app);
  router.post('/api/sendsms',controller.user.sendsms)//发送验证码
  router.post('/api/zhuce',controller.user.zhuce)//注册
  router.post('/api/login',controller.user.login)//登录
};
