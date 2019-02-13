<template>
    <div>
        Меню
        <button id = "butCancelled" @click="pressBtnExit()">Выход</button>
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
    pressBtnExit(){
      this.$store.commit ('cleanToken', '');
      this.$store.commit ('cleanUserName', '');
      this.$store.commit ('startmessage', 'Вы не авторизованы');
      this.$router.push({ path: '/login' })
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    }
  }
}
</script>
