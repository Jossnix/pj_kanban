import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {searchusr, login, logout} from './searchuser.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const strore = new Vuex.Store({
    state:{
        startMsg:'',
        logged: false,
        userToken: '',
        tickets: [
        //     {
        //     id: 10,
        //     status: 'Новые',
        //     title: 'Из Vuex',
        //     ansigned: 'Иванов',
		// 	prior: '1',
		// 	visib: true
        // }
        ],
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
            return state.userName
        },
        getTickets(state){
            console.log("get:tickets::", state.tickets);
            return state.tickets;
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
            state.userName=cUserName
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
            console.log("><TICKETS:", state.tickets)
            state.rerend = true;
        },
        modTickets(state, value) {
            let indexTarget;
            indexTarget = state.tickets.findIndex(item => item.id === value.id);
            console.log("VALUE:",indexTarget,  value);
            state.tickets.splice(indexTarget, 1, JSON.parse(JSON.stringify(value)));
            console.log("><TICKETS:", state.tickets)
            state.rerend = true;
        },
        setRerendFalse(state){
            state.rerend = false;
        },
        setRerendTrue(state){
            state.rerend = true;
        },
        setFilter(state, fData){
            if (fData.prior === 'Все'){
                state.tickets.forEach(item => item.visib = true);
            } else {
                state.tickets.find(item => item.prior !== fData.prior).visib = false;
            }
            if (fData.ans === 'Все'){
                state.tickets.forEach(item => item.visib = true);
            } else {
                state.tickets.find(item => item.ansigned !== fData.ans).visib = false;
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