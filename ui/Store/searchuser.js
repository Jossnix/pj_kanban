import axios from 'axios'

// Функция для получения списка пользователей
function searchusr({state, dispatch, commit}, querry){
    const url = 'http://localhost:3000/users'
    console.log(querry)
    axios.get(url).then((resp)=>{
        const results = resp.data;
        commit('set', {type: 'users', items: results});
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
    const fUser = res.data.fUser;
    localStorage.setItem('name', uName);
    localStorage.setItem('token', uToken);
    localStorage.setItem('token', fUser);
    commit('set', {type: 'userToken', items: uToken});
    commit('set', {type: 'userName', items: uName});
    commit('set', {type: 'fUser', items: fUser});
    return uToken;
}

async function logout({state, dispatch, commit}){
    commit('set', {type: 'userToken', items: ''});
}

export {authusr, searchusr, login, logout};
