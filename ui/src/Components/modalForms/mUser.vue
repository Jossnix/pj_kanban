<template>
    <div @click="hideModalT()">
        <b-modal
          v-model="mUShow"
          centered ref = "mTick"
          size = "lg"
          hide-header
          hide-footer
          style = "color: black;"
          title="Новый пользователь"
        >
        <div class = "titleHeadUser">Новый пользователь</div>
        <div id = "newUser">
        <div><input type="text" value="Логин" readonly class = "titleInput"></div>
        <div><input type="text" v-model="login" size = "40" class = "inputs"></div>
        <div><input type="text" value="Пароль" readonly class = "titleInput"></div>
        <div><input type="password" v-model="pass1" size = "40" class = "inputs"></div>
        <div><input type="text" value="Подтвердите пароль" readonly class = "titleInput"></div>
        <div><input type="password" v-model="pass2" size = "40" class = "inputs"></div>
        <div><input type="text" value="Имя" readonly class = "titleInput"></div>
        <div><input type="text" v-model="desc" size = "40" class = "inputs"></div>
        <div><input type="text" value="Роль" readonly class = "titleInput"></div>
        <div>
          <select v-model="selRole"  class = "inputs">
            <option disabled value="">Выберите один из вариантов</option>
            <option>Пользователь</option>
            <option>Менеджер</option>
          </select>
        </div>
        </div>
        <div id = "FooterSaveCancel">
            <button id = "butSave" @click="pressSave()">Сохранить</button>
            <button id = "butCancelled" @click="pressCancel()">Отменить</button>
        </div>
        </b-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import vueKanban from 'vue-kanban'
import store from '../../../Store/index.js'

Vue.use(vueKanban)
export default {
  props: ['mUShow'],
  data () {
    return {
      login: '',
      pass1: '',
      pass2: '',
      desc: '',
      selRole: '',
      resultUser: {
        login: '',
        pass: '',
        desc: '',
        role: ''
      }
    }
  },
  methods: {
    hideModalT() {
      alert("good");
      this.$store.commit ('setModAddTick', false);
    },
    showModal() {
      console.log("> start showModal");
      this.$refs.mTick.show()
    },
    pressCancel() {
      if(confirm("Отменить создание задачи?")){
      console.log("> start pressCancel");
      this.$emit('getActiveUser', true);
      this.ticketTitle= '';
      this.ticketDescription= '';
      this.ticketDate= '';
      this.selPriorytet= '';
      this.selUser= '';
      this.subTasks=[];
      this.newSub= ''
      }
    },
    pressSave() {
      if (this.login.length) {
        this.resultUser.login = this.login;
      } else {
        alert("Введите логин");
      }
      if (this.pass1.length) {
        if (this.pass2.length) {
          if (this.pass1 === this.pass2) {
            this.resultUser.pass = this.pass1;
          } else {
            alert("Пароли не совпадают")
          }
        } else {
          alert("Подтвердите пароль")
        }
      } else {
        alert("Введите пароль")
      }
      this.resultUser.desc = this.desc;
      if (this.selRole.length) {
        this.resultUser.role = this.selRole;
      } else {
        alert("Выберите роль");
      }
      console.log("USERINFO:"+this.resultUser);
      this.$emit('getActiveUser', true);
      this.login= '';
      this.pass1= '';
      this.pass2= '';
      this.desc= '';
      this.selRole= '';
      this.resultUser= {
        login: '',
        pass: '',
        desc: '',
        role: ''
      }
    }
  }
}
</script>

<style>
#newUser {
  display: grid;
  grid-template-rows: 6fr;
  grid-template-columns:  0.5fr 1fr;
  grid-gap: 0.4vw;
  height: 100%;
  width: 100%;
  /* background: rgba(172, 143, 240, 0.925); */
  padding: 0px;
  align-items: center;
}

.titleInput {
    border-radius: 3px;
    border: 3px solid rgba(205, 215, 252, 0.925);
    outline: none;
    background: rgba(221, 228, 253, 0.925);
    text-align: center;
}

.idSub {
    border-radius: 3px;
    border: 3px solid rgba(150, 162, 206, 0.925);
    outline: none;
    background: rgba(253, 233, 221, 0.925);
    text-align: center;
}

.inputs {
    border-radius: 3px;
    border: 3px solid rgba(150, 162, 206, 0.925);
    outline: none;
    text-align: left;
}

.titleHeadUser {
  font-size: 2em;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  color: black;
}

#butSave {
    cursor: pointer;
    /* border: 2px solid rgb(36, 219, 82);; */
    border: none;
    outline: none;
    background: rgb(132, 157, 241);
    color: rgb(19, 17, 17);
    height: 35px;
    border-radius: 4px;
    font-family: 'Arial', Verdana, sans-serif;
    /* font-weight: bold; */
}
#butSave:hover {
    /* border: none; */
    background: rgb(36, 219, 82);
    color: rgb(19, 17, 17);
}

#butCancelled {
    cursor: pointer;
    /* border: 2px solid rgb(231, 68, 68);; */
    border: none;
    outline: none;
    background: rgb(132, 157, 241);
    color: rgb(19, 17, 17);
    height: 35px;
    border-radius: 4px;
    font-family: 'Arial', Verdana, sans-serif;
    /* font-weight: bold; */
}
#butCancelled:hover {
    /* border: none; */
    background: rgb(231, 68, 68);
    color: rgb(19, 17, 17);
}
#FooterSaveCancel {
  text-align: center;
  margin: 15px;
}
</style>
