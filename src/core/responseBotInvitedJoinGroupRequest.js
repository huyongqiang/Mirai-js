const errCode = require('../util/errCode');
const axios = require('axios');
const { URL } = require('url');
const errorHandler = require('../util/errorHandler');

/**
 * FIXME: 目前被邀请入群不会触发 BotInvitedJoinGroupRequestEvent 事件
 * 该功能未经测试
 * @description 响应机器人被邀请入群请求
 * @param {string} baseUrl    mirai-api-http server 的地址
 * @param {string} sessionKey 会话标识
 * @param {number} eventId    响应申请事件的标识
 * @param {number} fromId     邀请人（好友）的QQ号
 * @param {number} groupId    被邀请进入群的群号
 * @param {number} operate    响应的操作类型
 * @param {string} message    回复的信息
 * @returns {void}
 */
module.exports = async ({ baseUrl, sessionKey, eventId, fromId, groupId, operate, message = '' }) => {
    try {
        // 拼接 url
        const url = new URL('/resp/botInvitedJoinGroupRequestEvent', baseUrl).toString();

        // 请求
        let { data: { code, msg: serverMessage } } = await axios.post(url, {
            sessionKey, eventId, fromId, groupId,
            operate, message
        });

        // 抛出 mirai 的异常，到 catch 中处理后再抛出
        if (code in errCode) {
            throw new Error(serverMessage);
        }
    } catch (error) {
        errorHandler(error);
    }
};