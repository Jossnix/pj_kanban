<template>
    <div>
      <div id = "menuPanel">
        <div id = "blockMenu" v-show = "isLogin">
          <b-button-group>
          <!-- <input type="text" value="Моя страница" readonly @click="goPage('/')">
          <input type="text" value="Проект" readonly @click="goPage('/pj')">
          <input type="text" value="Управление" readonly @click="goPage('/manager')"> -->
          <!-- <span @click="goPage('/')" class="itemMenu">Фильтры</span> -->
          <b-nav-item @click="findDropMenu(item)">Фильтры</b-nav-item>
          <!-- <span @click="goPage('/')" class="itemMenu">Задачи</span> -->
          <!-- <b-dropdown id="dropdown-1" text="Задачи" class="m-md-2"> -->
          <b-nav-item-dropdown id="dropdown-1" text="Задачи">
            <b-dropdown-item>Создать задачу</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown id="dropdown-2" text="Пользователи" class="m-md-2">
            <b-dropdown-item>Создать учётную запись</b-dropdown-item>
            <b-dropdown-item>Изменить учётную запись</b-dropdown-item>
            <b-dropdown-item>Удалить учётную запись</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item @click="findDropMenu(item)">Изменить мои данные</b-nav-item>
          <!-- <span @click="goPage('/')" class="itemMenu">Изменить мои данные</span> -->
          </b-button-group>
          <!-- <span @click="goPage('/')" class="itemMenu">Моя страница</span>
          <span @click="goPage('/pj')" class="itemMenu">Проект</span>
          <span @click="goPage('/manager')" class="itemMenu">Управление</span> -->
                  <!-- фильтры задачи пользователи изменить мои данные -->
        </div>
        <div id = "blockExit" v-show = "isLogin">
          <button id = "btnExit" @click="pressBtnExit()">Выход</button>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import store from '../../Store/index.js'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

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