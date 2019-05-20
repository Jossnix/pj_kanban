<template>
    <div>
      <div id = "menuPanel">
        <div id = "blockMenu" v-show = "isLogin">
          <input type="text" value="Моя страница" readonly @click="goPage('/')">
          <input type="text" value="Проект" readonly @click="goPage('/pj')">
          <input type="text" value="Управление" readonly @click="goPage('/manager')">
        </div>
        <div id = "blockExit" v-show = "isLogin">
          <button id = "btnExit" @click="pressBtnExit()">Выход</button>
        </div>
      </div>
    </div>
</template>

<script>
// import Vue from 'vue'
import store from '../../Store/index.js'

export default {
  data () {
    return {
    }
  },
  methods: {
    goPage(pathPage) {
      this.$router.push({ path: pathPage })
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
  computed: {
    // Проверка статуса пользователя авторизован/не авторизован
    isLogin: function() {
      if (this.$store.state.userToken.length && this.$store.state.userToken!=='AuthError') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
#menuPanel {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100%;
    color: rgb(231, 231, 231);
    background: rgba(5, 10, 27, 0.925);
}     

#blockMenu {
    text-align: left;
    margin-left: 10px;
}

#blockExit {
    text-align: right;
    margin-right: 5px;
}

#btnExit {
    cursor: pointer;
    border: none;
    outline: none;
    background: rgb(255, 212, 70);
    border-radius: 4px;
    margin: 5px;
}
</style>