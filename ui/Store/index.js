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
        userToken: ''
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