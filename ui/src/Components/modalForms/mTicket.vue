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
        <div class = "titleHeadModal">Новая карточка</div>
        <div id = "newTicket">
        <div><input type="text" value="Название" readonly class = "titleInput"></div>
        <div><input type="text" v-model="ticketTitle" size = "55" class = "inputs"></div>
        <div><input type="text" value="Описание" readonly class = "titleInput"></div>
        <div><textarea v-model="ticketDescription" rows = "2" cols = "55" class = "inputs"></textarea></div>
        <div><input type="text" value="Приоритет" readonly class = "titleInput"></div>
        <div>
          <select v-model="selPriorytet"  class = "inputs">
            <option disabled value="">Выберите один из вариантов</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div><input type="text" value="Дата завершения" readonly class = "titleInput"></div>
        <div><input  type = "date" size = "5" v-model="ticketDate"  class = "inputs" style="height: 34px; text-align: center"></div>
        <div><input type="text" value="Подзадачи" readonly class = "titleInput"></div>
        <div>
          <div v-for="subItem, indexSub in subTasks" >
            <input type="text" :value="indexSub+1" readonly size = "2" class = "idSub">
            <input type="text" v-if="editing" v-model="subTasks[indexSub]" size = "44"  class = "inputs" style = "margin: 2px;">
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
          <select v-model="selUser"  class = "inputs">
            <option disabled value="">Выберите один из вариантов</option>
            <option v-for="itemUser in users">{{itemUser.name}}</option>
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
  props: ['mTShow', 'users'],
  data () {
    return {
      editing: false,
      ticketTitle: '',
      ticketDescription: '',
      ticketDate: '',
      selPriorytet: '',
      selUser: '',
      subTasks:[],
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
        visib: true,
        modHist:[]
      }
    }
  },
  methods: {
    hideModalT() {
      this.$store.commit ('setModAddTick', false);
    },
    // Удалить подзадачу
    dellSub(indexItem) {
      if (confirm("Удалить подзадачу №"+(indexItem+1)+" ?"))
      {
        this.subTasks.splice(indexItem, 1);
      }
    },
    // Включить/выключить режим редактирования
    saveEdit() {
      this.editing=false;
    },
    editSub() {
      this.editing=true;
    },
    // Добавить подзадачу
    addSub() {
      if (this.newSub.length) {
        this.subTasks.push(this.newSub);
        this.newSub =  '';
      } else {
        alert("Введите текст подзадачи.");
      }
    },
    // Отмена
    pressCancel() {
      if(confirm("Отменить создание задачи?")){
      console.log("> start pressCancel");
      this.$emit('getActive', true);
      this.ticketTitle= '';
      this.ticketDescription= '';
      this.ticketDate= '';
      this.selPriorytet= '';
      this.selUser= '';
      this.subTasks=[];
      this.newSub= ''
      }
    },
    // Сохранить
    pressSave() {
      if (this.ticketTitle.length === 0) {
        alert("Введите название задачи");
      } else {
        this.resultTicket.title = this.ticketTitle;
        if (this.ticketDescription.length) {
          this.resultTicket.desc = this.ticketDescription;
        }
        if (this.selPriorytet.length) {
          this.resultTicket.prior = this.selPriorytet;
        } else {
          this.resultTicket.prior = "3"
        }
        this.resultTicket.date = this.ticketDate;
        if (this.subTasks.length) {
          this.resultTicket.sub = this.subTasks.slice();
        }
        if (this.selUser.length) {
          this.resultTicket.ansigned = this.selUser;
        } else {
          this.resultTicket.ansigned = "Назначить";
        }
        this.resultTicket.currentDate = new Date();
        this.resultTicket.author = "user";
        this.resultTicket.modHist.push('created');
        console.log("TICKINFO:"+this.resultTicket);
        this.$store.commit ('setAddTickets', this.resultTicket);
        this.$emit('getActive', true);
        this.ticketTitle= '';
        this.ticketDescription= '';
        this.ticketDate= '';
        this.selPriorytet= '';
        this.selUser= '';
        this.subTasks=[];
        this.newSub= ''
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
#FooterSaveCancel {
  text-align: center;
  margin: 15px;
}
</style>
