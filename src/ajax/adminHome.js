/**
 * 本模块主要用于 管理员首页
 */
import { ajax, redirectAjax } from './ajax.js'


//平台服务器状态
async function findServerState () {
    let findServerState = await ajax.get(`/api/ipms/findServerState`)
    return findServerState
}
//异常消息
async function findErrorMsg (param) {
    let findErrorMsg = await ajax.get(redirectAjax(`/api/ipms/findErrorMsg`, param))
    return findErrorMsg
}
//监控消息数量
async function findMonitorMsgAmount (param) {
    let findMonitorMsgAmount = await ajax.get(redirectAjax(`/api/ipms/findMonitorMsgAmount`, param))
    return findMonitorMsgAmount
}
//消息总量
async function findMsgTotal (param) {
    let findMsgTotal = await ajax.get(redirectAjax(`/api/ipms/findMsgTotal`, param))
    return findMsgTotal
}
//EMPI、MDM、ETL信息
async function findOtherInfo (param) {
    let findOtherInfo = await ajax.get(redirectAjax(`/api/ipms/findOtherInfo`, param))
    return findOtherInfo
}


const adminHome = {
    findErrorMsg: findErrorMsg,
    findMonitorMsgAmount:findMonitorMsgAmount,
    findMsgTotal:findMsgTotal,
    findServerState:findServerState,
    findOtherInfo:findOtherInfo

 

}

export default adminHome