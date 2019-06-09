<template>
    <div>
        <div class = "titleHead">Новая карточка</div>
        <div id = "newTicket">
        <div><input type="text" value="Название" readonly class = "titleInput"></div>
        <div><input type="text" v-model="ticketTitle" size = "110" class = "inputs"></div>
        <div><input type="text" value="Описание" readonly class = "titleInput"></div>
        <!-- <div><textarea v-model="nodeData.mean" readonly rows = "1" cols = "110" class = "inputText"></textarea></div> -->
        <div><textarea v-model="ticketDescription" rows = "2" cols = "110" class = "inputs"></textarea></div>
        <div><input type="text" value="Приоритет" readonly class = "titleInput"></div>
        <div>
          <select v-model="selPriorytet"  class = "inputs">
            <option disabled value="">Выберите один из вариантов</option>
            <option>Нормально</option>
            <option>Срочно</option>
            <option>Очень срочно</option>
          </select>
        </div>
        <div><input type="text" value="Дата завершения" readonly class = "titleInput"></div>
        <div><input  type = "date" size = "5" v-model="ticketDate"  class = "inputs" style="height: 34px; text-align: center"></div>
        <div><input type="text" value="Подзадачи" readonly class = "titleInput"></div>
        <div>
          <div v-for="subItem, indexSub in subTasks" >
            <input type="text" :value="indexSub+1" readonly size = "2" class = "idSub">
            <input type="text" :value="subItem" readonly size = "90"  class = "inputs" style = "margin: 2px;">
            <!-- <button id = "btnCreate" @click="editSub(indexSub)">-</button> -->
            <img src="../assets/edit2.png" @click="editSub(indexSub)" title = "Редактировать">
            <img src="../assets/dell2.png" @click="dellSub(indexSub)" title = "Удалить">
            <!-- <button id = "btnCreate" @click="dellSub(indexSub)"><img src="../assets/dell2.png" /></button><img src="../assets/dell2.png" @click="dellSub(indexSub)"/> -->
          </div>
          <input type="text" v-model="newSub" placeholder="Введите подзадачу" size = "96"  class = "inputs">
          <!-- <button id = "btnCreate" @click="addSub()">+</button> -->
            <img src="../assets/add.png" @click="addSub()" title = "Добавить">
        </div>
        <div><input type="text" value="Ответственный" readonly class = "titleInput"></div>
        <div>
          <select v-model="selUser"  class = "inputs">
            <option disabled value="">Выберите один из вариантов</option>
            <option>Иванов</option>
            <option>Петров</option>
            <option>Сидоров</option>
          </select>
        </div>
        </div>
        <div id = "FooterSaveCancel">
            <button id = "butSave" @click="pressSave()">Сохранить</button>
            <button id = "butCancelled" @click="pressCancel()">Отменить</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      ticketTitle: '',
      ticketDescription: '',
      ticketDate: '',
      selPriorytet: '',
      selUser: '',
      subTasks:['подзадача1', 'подзадача2'],
      newSub: '',
      resultTicket: {title:'',
        desc: '',
        prior: '',
        date: '',
        sub: [],
        ansigned: '',
        author: '',
        currentDate: '',
        status: 'Новые'
      }
    }
  },
  methods: {
    dellSub(indexItem) {
      if (confirm("Удалить подзадачу №"+(indexItem+1)+" ?"))
      {
        this.subTasks.splice(indexItem, 1);
      }
    },
    addSub() {
      if (this.newSub.length) {
        this.subTasks.push(this.newSub);
        this.newSub =  '';
      } else {
        alert("Введите текст подзадачи.");
      }
    },
    pressCancel() {
      this.$router.push({ path: "/manager" })
    },
    pressSave() {
      if (this.ticketTitle.length) {
        this.resultTicket.title = this.ticketTitle;
      } else {
        alert("Введите название задачи");
      }
      if (this.ticketDescription.length) {
        this.resultTicket.desc = this.ticketDescription;
      }
      if (this.selPriorytet.length) {
        this.resultTicket.prior = this.selPriorytet;
      }
      this.resultTicket.date = this.ticketDate;
      if (this.subTasks.length) {
        this.resultTicket.sub = this.subTasks.slice();
      }
      if (this.selUser.length) {
        this.resultTicket.prior = this.selUser;
      }
      this.resultTicket.currentDate = new Date();
      this.resultTicket.author = "user";
      console.log("TICKINFO:"+this.resultTicket);
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

.titleHead {
  font-size: 2em;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
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