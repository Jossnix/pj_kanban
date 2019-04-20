<template>
  <div id="app">
    <div id = "globalDiv">
        <!-- <div id = "headDiv">
          <cMenu v-show = "isLogin"></cMenu>
        </div> -->
        <div id = "footDiv">
          Содержимое
          <login></login>
          <div id="cont">
              <router-view></router-view>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import login from './Components/Login.vue'
import cMenu from './Components/Menu.vue'

export default {
  name: 'app',
  components: {
    login,
    cMenu
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
#globalDiv {
  display: grid;
  grid-template-rows: repeat (2, 1fr);
  grid-template-columns: 1fr;
  grid-gap: 0.2vw;
  height: 100%;
  width: 100%;
  background: rgba(205, 215, 252, 0.925);
  padding: 0px;
}
#headDiv {
  height: 100%;
  width: 100%;
  background: rgba(5, 10, 27, 0.925);
  padding: 0px;
}
</style>
