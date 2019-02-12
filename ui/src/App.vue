<template>
  <div id="app">
    start app
    <login></login>
    <globalComp></globalComp>
  </div>
</template>

<script>
import login from './Components/Login.vue'
import globalComp from './Components/Global.vue'

export default {
  name: 'app',
  components: {
    login,
    globalComp
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
  margin-top: 60px;
}
</style>