<template>
    <div>
        Project!
        <hr>
        <button id = "btnCreate" @click="createTicket()">Создать задачу</button>
        <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
        <div v-for="stage in stages" :slot="stage">
            <h2>{{ stage }}</h2>
        </div>
        <div v-for="block in blocks" :slot="block.id">
            <div>
            <strong>id:</strong> {{ block.id }}
            </div>
            <div>
            {{ block.title }}
            </div>
        </div>
        </kanban-board>
    </div>
</template>


<script>
import Vue from 'vue'
import vueKanban from 'vue-kanban'

Vue.use(vueKanban)

export default {
  data () {
    return {
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      blocks: [
        {
            id: 1,
            status: 'on-hold',
            title: 'Test',
        },
        {
            id: 2,
            status: 'in-progress',
            title: 'Test2',
        },
      ]
    }
  },
  methods: {
      createTicket() {
          alert("Создать новую задачу");
          this.blocks.push({
            id: 3,
            status: 'in-progress',
            title: 'Test3',
        })
      },
      updateBlock(id, status) {
          this.blocks.find(b => b.id === Number(id)).status = status;
      }
  }
}
</script>

<style lang="scss">
  @import './assets/kanban.scss';
</style>