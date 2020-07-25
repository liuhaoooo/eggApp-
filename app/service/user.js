'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserService extends Service {
    async zhuce(data) {//注册
        const { app } = this;
        let phone = await app.mysql.get('user', { phone: data.phone })
        if (phone) {
            return 2
        } else {
            let result = await app.mysql.insert('user', data)
            return result.affectedRows === 1 ? 0 : 1
        }
    }

    async login(data) {//登录
        const { app, service } = this;
        let user = await app.mysql.get('user', { phone: data.phone })
        if (!user) {
            return { success: 2 }
        } else {
            return new Promise((reslove, reject) => {
                bcrypt.compare(data.password, user.password).then(isMatch => {//匹配密码是否一致
                    if (isMatch) {
                        service.user.settoken(data.phone).then((token, err) => {
                            if (err) { reject(err) }
                            reslove({ token, success: 0 })
                        });
                        return
                    }
                    reslove({ success: 1 })
                })
            })
        }
    }

    async getbcrypt(pwd) {//加密密码
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(pwd, salt);
        return hash;
    }

    async settoken(phone) {//生成token
        const { app } = this
        return new Promise((reslove, reject) => {
            const palyload = { phone };//定义token规则
            jwt.sign(palyload, app.config.secret, { expiresIn: 86400 }, (err, token) => {//生成token          
                if (err) { reject(err) }
                else {
                    reslove(token)
                }
            });
        })
    }
}

module.exports = UserService;
