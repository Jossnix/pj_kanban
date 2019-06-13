<template>
    <div>
      <div id = "menuPanel">
        <div id = "blockMenu" v-show = "isLogin">
          <b-navbar type="dark">
          <b-navbar-nav>
          <b-nav-item @click="findDropMenu(item)">Фильтры</b-nav-item>
          <b-nav-item-dropdown id="dropdown-1" text="Задачи">
            <b-dropdown-item @click="showModal()">Создать задачу</b-dropdown-item>
            <!-- <b-dropdown-item @click="$bvMadal.show('mTick')">Создать задачу</b-dropdown-item> -->
          </b-nav-item-dropdown>
          <b-nav-item-dropdown id="dropdown-2" text="Пользователи">
            <b-dropdown-item>Создать учётную запись</b-dropdown-item>
            <b-dropdown-item>Изменить учётную запись</b-dropdown-item>
            <b-dropdown-item>Удалить учётную запись</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item @click="findDropMenu(item)">Изменить пароль</b-nav-item>
            <!-- <b-dropdown-item>Удалить учётную запись</b-dropdown-item> -->
          </b-navbar-nav>
          </b-navbar>
        </div>
        <div id = "blockExit" v-show = "isLogin">
          <button id = "btnExit" @click="pressBtnExit()">Выход</button>
        </div>
      </div>
      <mTicket :mTShow="showTicketAdd" ref="modalTick" @getActive="getActiveState"></mTicket>
    </div>
</template>

<script>
import Vue from 'vue'
import store from '../../Store/index.js'
import BootstrapVue from 'bootstrap-vue'
import modTicket from './modalForms/mTicket'

Vue.use(BootstrapVue);

export default {
  data () {
    return {
      showTicketAdd: false
    }
  },
  methods: {
    getActiveState(state) {
      console.log("> start getActiveState");
      if (state) {
        this.showTicketAdd = false;
      }
    },
    showModal() {
      console.log("> start showModal");
      // this.$refs['mTick'].show();
      // this.$store.commit ('setModAddTick', true);
      this.showTicketAdd =! this.showTicketAdd;
      // this.$bvMadal.show('mTick');
    },
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
    // showTicketAdd: function() {
    //   alert(store.getters.getModAddTick);
    //   return store.getters.getModAddTick;
    // },

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
Vue.component('mTicket', modTicket)
</script>

<style>
#menuPanel {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1.5fr 0.5fr;
    align-items: center;
    width: 100%;
    color: rgb(231, 231, 231);
    background: rgba(5, 10, 27, 0.925);
}     

#blockMenu {
    text-align: left;
    margin-left: 10px;
}

.itemMenu {
  cursor: pointer;
  margin: 10px;
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
