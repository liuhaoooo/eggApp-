/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1595656595801_769';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {};
  //token凭证
  config.secret = "liuhao"
  //MySQL数据库
  config.mysql = {
    client: {
      host: '101.37.25.179',
      port: '3306',
      user: 'liuhao',
      password: '321123aaa',
      database: 'rnApp',
    },
    app: true,
    agent: false,
  };
  //redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  }
  //关闭csrf
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [
      ""
    ]
  };
  //修改端口号
  config.cluster = {
    listen: {
      path: '',
      port: 8000,
      hostname: '127.0.0.1',
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
