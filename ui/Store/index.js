import Vue from 'vue'
import Vuex from 'vuex'
import {searchusr, login, logout} from './searchuser.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const strore = new Vuex.Store({
    state:{
        users: [
        {name: 'Иванов', rol: 'User'},
        {name: 'Ищенко', rol: 'Manager'},
        {name: 'Петров', rol: 'User'},
        {name: 'Сидоров', rol: 'User'}
        ],
        startMsg:'',
        logged: false,
        userToken: '',
        user: {},
        tickets: [],
        maxId:0,
        rerend: false
    },
    getters:{
        results(state){
            return state.results
        },
        logged(state){
            return state.logged
        },
        userToken(state){
            return state.userToken
        },
        userName(state){
            return state.user
        },
        getTickets(state){
            return state.tickets;
        },
        getUsers(state){
            return state.users;
        }
    },
    mutations:{
        set(state, {type, items}){
            state[type] = items;
        },
        cleanToken(state,tokenData){
            state.userToken=tokenData
        },
        cleanUserName(state,cUserName){
            state.user=cUserName
        },
        startmessage(state,value){
            state.startMsg=value
        },
        setBlockTickets(state, value) {
            state.tickets=JSON.parse(JSON.stringify(value))
            state.rerend = true;
        },
        setAddTickets(state, value) {
            state.maxId+=1;
            value.id = state.maxId;
            state.tickets.push(JSON.parse(JSON.stringify(value)));
            state.rerend = true;
        },
        modTickets(state, value) {
            let indexTarget;
            indexTarget = state.tickets.findIndex(item => item.id === value.id);
            state.tickets.splice(indexTarget, 1, JSON.parse(JSON.stringify(value)));
            state.rerend = true;
        },
        setRerendFalse(state){
            state.rerend = false;
        },
        setRerendTrue(state){
            state.rerend = true;
        },
        dellTicket(state, id){
            let indexTarget;
            indexTarget = state.tickets.findIndex(item => item.id === id);
            state.tickets.splice(indexTarget, 1);
            state.rerend = true;
        },
        setFilter(state, fData){
            if (fData.prior === 'Все'){
                state.tickets.forEach(item1 => item1.visib = true);
            }
            if (fData.ans === 'Все'){
                state.tickets.forEach(item4 => item4.visib = true);
            }
            if (fData.prior !== 'Все') {
                state.tickets.filter(item2 => item2.prior !== fData.prior).forEach(item3 => item3.visib = false);
            }
            if (fData.ans !== 'Все'){
                state.tickets.filter(item5 => item5.ansigned !== fData.ans).forEach(item6 => item6.visib = false);
            }
            state.rerend = true;
        }
    },
    actions:{
        search:searchusr,
        login:login,
        logout:logout
    },
    plugins: [createPersistedState()]
})

export default strore;