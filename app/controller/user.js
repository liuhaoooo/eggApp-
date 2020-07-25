'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    /**
     * 发送验证码
     * @param:{ phone }
     */
    async sendsms() {
        const { ctx, service } = this;
        let { phone } = ctx.request.body;
        let res = await service.aliyunsms.sendsms(phone, 'SMS_174022746')
        ctx.body = res ? { success: true, msg: '发送成功' } : { success: false, msg: '发送失败' }
    }
    /**
     * 注册
     * @param{ phone, code, password }
     */
    async zhuce() {
        const { ctx, service } = this;
        let { phone, code, password } = ctx.request.body
        let isok = await service.aliyunsms.checkcode(phone, 'SMS_174022746', code)
        if (isok) {
            let data = {
                password: await service.user.getbcrypt(password),
                phone
            }
            let res = await service.user.zhuce(data)
            switch (res) {
                case 0:
                    ctx.body = {
                        success: true,
                        msg: '注册成功'
                    }
                    return
                case 1:
                    ctx.body = {
                        success: false,
                        msg: '注册失败'
                    }
                    return
                case 2:
                    ctx.body = {
                        success: false,
                        msg: '该手机号已被注册'
                    }
                    return
            }
        } else {
            ctx.body = {
                msg: '验证码错误',
                success: false
            }
        }

    }
    /**
     * 登录
     * @param{ phone, password }
     */
    async login() {
        const { ctx, service } = this;
        let { phone, password } = ctx.request.body
        let data = {
            phone,
            password
        }
        let res = await service.user.login(data)
        switch (res.success) {
            case 0:
                ctx.body = {
                    success: true,
                    msg: '登录成功',
                    token: res.token
                }
                return
            case 1:
                ctx.body = {
                    success: false,
                    msg: '账号或密码错误'
                }
                return
            case 2:
                ctx.body = {
                    success: false,
                    msg: '该手机号未注册'
                }
                return
        }
    }
}

module.exports = UserController;
