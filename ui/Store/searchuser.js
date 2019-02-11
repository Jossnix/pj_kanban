import axios from 'axios'
var async = require('async');

function searchusr({state, dispatch, commit}, querry){
    const url = 'http://localhost:3000/users'
    console.log(querry)
    axios.get(url).then((resp)=>{
        const results = resp.data;
        commit('set', {type: 'results', items: results});
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

function authusr({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/auth'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    axios.post(url,requestData, headers).then((resp)=>{
        const logged = resp.data;
        console.log(logged)
        commit('set', {type: 'logged', items: logged});
    })
    .catch((err)=>{
        console.log(err);
    })
    
}

// Функция для получения токена доступа к данным
async function login({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/login'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url,requestData, headers)
    const uToken = res.data.token;
    const uName = res.data.name;
    localStorage.setItem('name', uName);
    localStorage.setItem('token', uToken);
    commit('set', {type: 'userToken', items: uToken});
    commit('set', {type: 'userName', items: uName});
    return uToken;
}

async function logout({state, dispatch, commit}){
    commit('set', {type: 'userToken', items: ''});
}


function setTable({state, dispatch, commit}, data){
    commit('set', {type: 'tableselected', items: data.tableselected});
}


async function getTables({state, dispatch, commit}){
    const url = 'http://localhost:3000/api/tables'
    let res = await axios.get(url, 
        {headers: 
        {'Authorization':'Bearer ' + this.getters.userToken}})
    const Tables = res.data.tables;
    return Tables;
}

// тестовое получение меню
async function getMainMenu({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/testedmenu'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url, requestData, headers)
    const calcMenu = res.data;
    return calcMenu;
}

// получение информации о процедурах проекта
async function getPcDataForTree({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/pclist'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url, requestData, headers)
    const respPjPcList = res.data.data;
    return respPjPcList;
}

// получение информации о кейсах процедуры
async function getCaseDataForTree({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/caselist'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url, requestData, headers)
    const respCaseList = res.data.data;
    return respCaseList;
}

// получение информации о проектах
async function getPjData({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/showpj'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url, requestData, headers)
    const respPj = res.data.data;
    return respPj;
}

// получение информации о ключах таблицы
async function getKeyInfo({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/getKeyInfo'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url, requestData, headers)
    const keyInfo = res.data;
    let keyTable=[];
    for (var inKey=0; inKey<keyInfo.data.length; inKey++){
        keyTable.push(keyInfo.data[inKey].COLUMN_NAME);
    }
    return keyTable;
}

// получение информации о типах полей
async function getTableInfo({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/getTableInfo'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url, requestData, headers)
    const infoTable = res.data;
    return infoTable;
}

// получения информации о названии таблицы, типах полей и их описании
async function getInfoDescription({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/getInfoDescription'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    let res = await axios.post(url, requestData, headers)
    const infoTable = res.data;
    return infoTable;
}

// обновление данных в бд ref
async function updateItem({state, dispatch, commit}, requestData){
    const url = 'http://localhost:3000/api/updateRefTable'
    const headers ={
        'Access-Control-Allow-Origin': ['*']
    }
    console.log("<<<REQ>>>", requestData);
    let res = await axios.post(url, requestData, headers)
    const infoTable = res.data;
    return infoTable;
}

export {authusr, searchusr, login, logout, getTables, getMainMenu, setTable, getKeyInfo, getTableInfo, updateItem, getPjData, getPcDataForTree, getInfoDescription, getCaseDataForTree};
