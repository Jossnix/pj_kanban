<template>
    <div @click="hideModalT()">
        <b-modal
          v-model="mTShow"
          centered ref = "mTick"
          size = "lg"
          hide-header
          hide-footer
          style = "color: black;"
          title="Новая карточка"
        >
        <div class = "titleHeadModal"># {{itemTicket.id}}</div>
        <div id = "newTicket">
        <div><input type="text" value="Название" readonly class = "titleInput"></div>
        <div><input type="text" v-model="itemTicket.title" size = "55" class = "inputs"></div>
        <div><input type="text" value="Описание" readonly class = "titleInput"></div>
        <div><textarea v-model="itemTicket.desc" rows = "2" cols = "55" class = "inputs"></textarea></div>
        <div><input type="text" value="Приоритет" readonly class = "titleInput"></div>
        <div>
          <select v-model="itemTicket.prior"  class = "inputs">
            <option disabled value="">{{itemTicket.prior}}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div><input type="text" value="Дата завершения" readonly class = "titleInput"></div>
        <div><input  type = "date" size = "5" v-model="itemTicket.date"  class = "inputs" style="height: 34px; text-align: center"></div>
        <div><input type="text" value="Подзадачи" readonly class = "titleInput"></div>
        <div>
          <div v-for="subItem, indexSub in itemTicket.sub" >
            <input type="text" :value="indexSub+1" readonly size = "2" class = "idSub">
            <input type="text" v-if="editing" v-model="itemTicket.sub[indexSub]" size = "44"  class = "inputs" style = "margin: 2px;">
            <input type="text" v-else :value="subItem" readonly size = "44"  class = "inputs" style = "margin: 2px;">
            <img src="../assets/edit2.png" @click="editSub()" title = "Редактировать">
            <img v-if="editing" src="../assets/add.png" @click="saveEdit()" title = "Сохранить">
            <img v-else src="../assets/dell2.png" @click="dellSub(indexSub)" title = "Удалить">
          </div>
          <input type="text" v-model="newSub" placeholder="Введите подзадачу" size = "52"  class = "inputs">
            <img src="../assets/add.png" @click="addSub()" title = "Добавить">
        </div>
        <div><input type="text" value="Ответственный" readonly class = "titleInput"></div>
        <div>
          <select v-model="ansUser"  class = "inputs">
            <option disabled value="">{{itemTicket.ansigned}}</option>
            <option v-for="itemUser in users">{{itemUser.name}}</option>
          </select>
        </div>
        {{itemTicket.modHist}}
        </div>
        <div id = "FooterSaveCancel">
            <button id = "butSave" @click="pressSave()">Сохранить</button>
            <button id = "butCancelled" @click="pressCancel()">Отменить</button>
            <button id = "butDell" @click="pressDell()">Удалить</button>
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
  props: ['mTShow', 'itemTicket', 'users'],
  data () {
    return {
      editing: false,
      ansUser: '',
      newSub: '',
      resultTicket: {id: 0,
        title:'',
        desc: '',
        prior: '',
        date: '',
        sub: [],
        ansigned: '',
        author: '',
        currentDate: '',
        status: 'Новые',
        visib: true
      }
    }
  },
  methods: {
    hideModalT() {
      this.$store.commit ('setModAddTick', false);
    },
    // Работа с подзадачами
    dellSub(indexItem) {
      if (confirm("Удалить подзадачу №"+(indexItem+1)+" ?"))
      {
        this.itemTicket.sub.splice(indexItem, 1);
      }
    },
    saveEdit() {
      this.editing=false;
    },
    editSub() {
      this.editing=true;
    },
    addSub() {
      if (this.newSub.length) {
        this.itemTicket.sub.push(this.newSub);
        this.newSub =  '';
      } else {
        alert("Введите текст подзадачи.");
      }
    },
    // Отменить создание задачи
    pressCancel() {
      if(confirm("Отменить создание задачи?")){
      console.log("> start pressCancel");
      this.$emit('getActive', true);
      this.ansUser = '';
      }
    },
    // Удалить задачу
    pressDell() {
      if(confirm("Удалить задачу?")){
      console.log("> start pressDell");
      this.$store.commit ('dellTicket', this.itemTicket.id);
      this.$emit('getActive', true);
      this.ansUser = '';
      }
    },
    // Сохранить задачу
    pressSave() {
      if (this.itemTicket.title.length === 0) {
        alert("Введите название задачи");
      } else {
        this.resultTicket.title = this.itemTicket.title;
        if (this.itemTicket.desc.length) {
          this.resultTicket.desc = this.itemTicket.desc;
        }
        if (this.itemTicket.prior.length) {
          this.resultTicket.prior = this.itemTicket.prior;
        } else {
          this.resultTicket.prior = "3"
        }
        this.resultTicket.date = this.itemTicket.date;
        if (this.itemTicket.sub.length) {
          this.resultTicket.sub = this.itemTicket.sub.slice();
        }
        if (this.ansUser.length) {
          this.resultTicket.ansigned = this.ansUser;
          this.ansUser = '';
        } else {
          this.resultTicket.ansigned = "Назначить";
        }
        this.resultTicket.currentDate = new Date();
        this.resultTicket.author = "user";
        this.resultTicket.id = this.itemTicket.id;
        this.resultTicket.status = this.itemTicket.status;
        this.resultTicket.modHist = this.itemTicket.modHist;
        console.log("TICKINFO:"+this.resultTicket);
        this.$store.commit ('modTickets', this.resultTicket);
        this.$emit('getActive', true);
      }
    }
  }
}
</script>

<style>
#newTicket {
  display: grid;
  grid-template-rows: 6fr;
  grid-template-columns:  0.5fr 1fr;
  grid-gap: 0.4vw;
  height: 100%;
  width: 100%;
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

.titleHeadModal {
  font-size: 2em;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  color: black;
}

#butSave {
    cursor: pointer;
    border: none;
    outline: none;
    background: rgb(132, 157, 241);
    color: rgb(19, 17, 17);
    height: 35px;
    border-radius: 4px;
    font-family: 'Arial', Verdana, sans-serif;
}
#butSave:hover {
    background: rgb(36, 219, 82);
    color: rgb(19, 17, 17);
}

#butCancelled {
    cursor: pointer;
    border: none;
    outline: none;
    background: rgb(132, 157, 241);
    color: rgb(19, 17, 17);
    height: 35px;
    border-radius: 4px;
    font-family: 'Arial', Verdana, sans-serif;
}
#butCancelled:hover {
    background: rgb(238, 235, 47);
    color: rgb(19, 17, 17);
}
#butDell {
    cursor: pointer;
    border: none;
    outline: none;
    background: rgb(132, 157, 241);
    color: rgb(19, 17, 17);
    height: 35px;
    border-radius: 4px;
    font-family: 'Arial', Verdana, sans-serif;
}
#butDell:hover {
    background: rgb(231, 68, 68);
    color: rgb(19, 17, 17);
}
#FooterSaveCancel {
  text-align: center;
  margin: 15px;
}
</style>
