<template>
    <div>
      <div id = "menuPanel">
        <div id = "blockMenu">
          Меню
        </div>
        <div id = "blockExit">
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

<style>
#menuPanel {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100%;
    color: rgb(231, 231, 231);
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