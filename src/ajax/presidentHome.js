/**
 * 本模块主要用于 院长首页
 */
import { ajax, redirectAjax } from './ajax.js'


// //医院收入
// async function getHospitalIncome (param) {
//     let getHospitalIncome = await ajax.post(redirectAjax(`/api/monitor/getHospitalIncome`, param))
//     return getHospitalIncome
// }
// //住院疾病诊断TOP10
// async function getBzFx (param) {
//     let getBzFx = await ajax.post(redirectAjax(`/api/monitor/getBzFx`, param))
//     return getBzFx
// }
// //门诊疾病诊断TOP10
// async function getMzBzFx (param) {
//     let getMzBzFx = await ajax.post(redirectAjax(`/api/monitor/getMzBzFx`, param))
//     return getMzBzFx
// }
// //接诊人次
// async function getJzRcFx (param) {
//     let getJzRcFx = await ajax.post(redirectAjax(`/api/monitor/getJzRcFx`, param))
//     return getJzRcFx
// }
// //在院人数,床位使用率
// async function getPateintRcAndBeds (param) {
//     let getPateintRcAndBeds = await ajax.post(redirectAjax(`/api/monitor/getPateintRcAndBeds`, param))
//     return getPateintRcAndBeds
// }


//疾病统计TOP10
async function getAllBzFx (param) {
    let getAllBzFx = await ajax.get(redirectAjax(`/api/monitor/getAllBzFx`, param))
    return getAllBzFx
}
//顶部：今天医院信息，
async function getBasicHospitalInfo (param) {
    let getBasicHospitalInfo = await ajax.get(redirectAjax(`/api/monitor/getBasicHospitalInfo`, param))
    return getBasicHospitalInfo
}

//医院收入
async function getHospitalIncome (param) {
    let getHospitalIncome = await ajax.get(redirectAjax(`/api/monitor/getHospitalIncome`, param))
    return getHospitalIncome
}

//手术统计TOP10,测试日期2020-05-09
async function getOperationTop (param) {
    let getOperationTop = await ajax.get(redirectAjax(`/api/monitor/getOperationTop`, param))
    return getOperationTop
}
const presidentHome = {
    getAllBzFx: getAllBzFx,
    getBasicHospitalInfo:getBasicHospitalInfo,
    getHospitalIncome:getHospitalIncome,
    getOperationTop:getOperationTop,
 

}

export default presidentHome