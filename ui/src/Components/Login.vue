<template>
  <div>
    <div id="welcome">
      <div id = "messasge">
        {{ test }}
      </div>
    </div>
    <div id = "authorization" v-show="!isLogin">
      <div id="login-form">
        <h1>АВТОРИЗАЦИЯ</h1>
          <fieldset>
              <form action="javascript:void(0);" method="get">
                  <input type="text" required v-model="username" placeholder="Login">
                  <input type="password" required v-model="password" placeholder="Password">
                  <input type="submit" value="ВОЙТИ" @click="enterLogin()" >
              </form>
          </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../Store/index.js'
import {authorization} from './internalFunction.js';
import Vue from 'vue'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      invalidInput: false,
      message: 'Вы не авторизованы!'
    }
  },
  methods: {
    // Пройти авторизация
    async enterLogin () {
      this.invalidInput = await authorization(this.username, this.password, this.invalidInput)
      if (this.invalidInput) {
        alert ("login or password is incorrect!");
        this.username = '';
        this.password = '';
        this. invalidInput = false;
      } else {
        this.$router.push({ path: '/mypage' });
      }
    },
    pressBtnExit(){
      this.$store.commit ('cleanToken', '');
      this.$store.commit ('cleanUserName', '');
      this.$store.commit ('startmessage', 'Вы не авторизованы');
      this.$router.push({ path: '/login' })
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    }
  },
  computed:{
    // Выводимый статус пользователя авторизован/не авторизован
    test(){
      return store.state.startMsg;
    },
    
    // Проверка статуса пользователя авторизован/не авторизован
    isLogin: function() {
      if (this.$store.state.userToken.length && this.$store.state.userToken!=='AuthError') {
        return true
      } else {
        this.username = '';
        this.password = '';
        return false
      }
    }
  }
}
</script>

<style>
  #messasge {
    font-size: 3em;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
  }

  #login-form {
    background-color: #363636;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    margin: 5% auto;
    width: 300px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    -webkit-box-shadow:  0px 10px 20px 0px rgba(0, 0, 0, 0.3);
    box-shadow:  0px 10px 20px 0px rgba(0, 0, 0, 0.3);
  }

  #login-form h1 {
    background-color: #292829;
    border-radius: 5px 5px 0px 0px;
    -moz-border-radius: 5px 5px 0px 0px;
    -webkit-border-radius: 5px 5px 0px 0px;
    color: #fff;
    padding: 20px;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
  }

  #login-form fieldset {
    border: none;
    padding: 20px;
    position: relative;
  }

  #login-form fieldset form {
    overflow: hidden;
    width: 270px;
  }

  #login-form fieldset form input {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    outline: none;
    -webkit-appearance:none;
    width: 260px;
    align: center;
    position: center;
  }

  #login-form fieldset form input[type="text"] {
    border: 1px solid #292829;
    border-radius: 3px 3px 0px 0px;
    -moz-border-radius: 3px 3px 0px 0px;
    -webkit-border-radius: 3px 3px 0px 0px;
    padding: 12px 10px;
    width: 238px;
    -webkit-appearance:none;
  }

  #login-form fieldset form input[type="password"] {
    border: 1px solid #292829;
    border-top: none;
    border-radius: 0px 0px 3px 3px;
    -moz-border-radius: 0px 0px 3px 3px;
    -webkit-border-radius: 0px 0px 3px 3px;
    padding: 12px 10px;
    width: 238px;
    -webkit-appearance:none;
  }

  #login-form fieldset form input[type="submit"] {
    background-color: #ebebeb;
    border: none;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    color: #404040;
    cursor: pointer;
    float: none;
    font-weight: bold;
    margin-top: 20px;
    padding: 12px 12px;
    -webkit-appearance: none;
  }

  #login-form fieldset form input[type="submit"]:hover {
    background-color: #e0e0e0;
  }

  #login-form fieldset form span:before {
    background-color: #c9c9c9;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    content: "?";
    display: inline-block;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    text-align: center;
    width: 20px;
  }

  #login-form fieldset form span {
    font-size: 12px;
    margin-top: 40px;
  }

  #login-form fieldset form span a{
    color: #eb6d1a;
    text-decoration: none;
  }

  #login-form fieldset form span a:hover {
    color: #eb6d1a;
  }
</style>

