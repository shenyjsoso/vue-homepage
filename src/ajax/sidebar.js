/**
 * 本模块主要用于 左侧菜单栏
 */
import { ajax, redirectAjax } from './ajax.js'

//快速入口系统
async function getQuickEntryByUserId (param) {
    let getQuickEntryByUserId = await ajax.get(redirectAjax(`/api/other/getQuickEntryByUserId`, param))
    return getQuickEntryByUserId
}
//快速入口保存信息
async function saveQuickEntry (param) {
    let saveQuickEntry = await ajax.post(`/api/other/saveQuickEntry`, param)
    return saveQuickEntry
}
//当前用户所拥有的三方列表

async function getAuthorityByName () {
    let getAuthorityByName = await ajax.get(`/api/getAuthorityByName`)
    return getAuthorityByName
}
//快速入口系统顺序修改
async function updateQuickEntry (param) {
    let updateQuickEntry = await ajax.put(`/api/other/updateQuickEntry`, param)
    return updateQuickEntry
}
const sidebar = {
    getQuickEntryByUserId: getQuickEntryByUserId,
    saveQuickEntry:saveQuickEntry,
    getAuthorityByName:getAuthorityByName,
    updateQuickEntry:updateQuickEntry
}

export default sidebar