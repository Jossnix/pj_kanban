<template>
    <div>
      <div id = "menuPanel">
        <div id = "blockMenu" v-show = "isLogin">
          <b-navbar type="dark">
          <b-navbar-nav>
          <!-- <b-nav-item @click="findDropMenu(item)">Фильтры</b-nav-item> -->
          <b-nav-item-dropdown id="dropdown-0" text="Фильтры">
            <b-dropdown-form style="text-align: center;">
              <b-form-group label="Приоритет">
                <b-form-select v-model="fPrior">
                  <option>Все</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </b-form-select>
              </b-form-group>
              <b-form-group label="Ответственный">
                <b-form-select v-model="fAns">
                  <option>Все</option>
                  <option>Назначить</option>
                  <option v-for="itemUser in gUsers">{{itemUser.name}}</option>
                </b-form-select>
              </b-form-group>
              <b-button variant="outline-primary" size="sm" @click="onFilter">Применить</b-button>
            </b-dropdown-form>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown id="dropdown-1" text="Задачи">
            <b-dropdown-item @click="showModal()">Создать задачу</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown id="dropdown-2" text="Пользователи">
            <b-dropdown-item @click="showModalUser()">Создать учётную запись</b-dropdown-item>
            <b-dropdown-item>Изменить учётную запись</b-dropdown-item>
            <b-dropdown-item>Удалить учётную запись</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown id="dropdown-0" text="Изменить пароль">
            <b-dropdown-form style="text-align: center; width: 200px;">
              <b-form-group label="Введите старый пароль">
                <b-form-input type="password" v-model="oldPass"></b-form-input>
              </b-form-group>
              <b-form-group label="Введите новый пароль">
                <b-form-input type="password" v-model="newPass"></b-form-input>
              </b-form-group>
              <b-form-group label="Повторите новый пароль">
                <b-form-input type="password" v-model="newPass2"></b-form-input>
              </b-form-group>
              <b-button variant="outline-primary" size="sm" @click="onPass">Применить</b-button>
            </b-dropdown-form>
          </b-nav-item-dropdown>
            <!-- <b-dropdown-item>Удалить учётную запись</b-dropdown-item> -->
          </b-navbar-nav>
          </b-navbar>
        </div>
        <div id = "blockExit" v-show = "isLogin">
          <button id = "btnExit" @click="pressBtnExit()">Выход</button>
        </div>
      </div>
      <mTicket :mTShow="showTicketAdd" :users="gUsers" ref="modalTick" @getActive="getActiveState"></mTicket>
      <mUser :mUShow="showUserAdd" ref="modalUser" @getActiveUser="getActiveStateUser"></mUser>
    </div>
</template>

<script>
import Vue from 'vue'
import store from '../../Store/index.js'
import BootstrapVue from 'bootstrap-vue'
import modTicket from './modalForms/mTicket'
import modUser from './modalForms/mUser'

Vue.use(BootstrapVue);

export default {
  data () {
    return {
      gUsers: [],
      showTicketAdd: false,
      showUserAdd: false,
      fPrior:'',
      fAns:'',
      oldPass:'',
      newPass:'',
      newPass2:''
    }
  },
  methods: {
    getActiveState(state) {
      console.log("> start getActiveState");
      if (state) {
        this.showTicketAdd = false;
      }
    },
    getActiveStateUser(state) {
      console.log("> start getActiveStateUser");
      if (state) {
        this.showUserAdd = false;
      }
    },
    showModal() {
      console.log("> start showModal");
      this.gUsers = this.$store.getters.getUsers;
      this.showTicketAdd =! this.showTicketAdd;
    },
    showModalUser() {
      console.log("> start showModal");
      this.showUserAdd =! this.showUserAdd;
    },
    pressBtnExit(){
      this.$store.commit ('cleanToken', '');
      this.$store.commit ('cleanUserName', '');
      this.$store.commit ('startmessage', 'Вы не авторизованы');
      this.$router.push({ path: '/login' })
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    },
    onFilter(){
      let filterData = {
      prior: this.fPrior,
      ans: this.fAns
      }
      this.$store.commit ('setFilter', filterData);
    },
    onPass() {
      alert(this.oldPass);
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
  },
  mounted() {
    this.gUsers = this.$store.getters.getUsers;
	},
}
Vue.component('mTicket', modTicket)
Vue.component('mUser', modUser)
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
