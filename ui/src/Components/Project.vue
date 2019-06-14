<template>
    <div>
				<div class = "titleHeadProj">Всего задач: {{allCount}} Необходимо назначить: {{allNoAns}} {{needUp}}</div>
        <hr>
        <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
        <div v-for="stage in stages" :slot="stage">
            <h2 v-if="stage==='Новые'">{{ stage }}:   {{counterStateNew}}</h2>
            <h2 v-else-if="stage==='В_работе'">{{ stage }}:   {{counterStateWork}}</h2>
            <h2 v-else-if="stage==='Проверка'">{{ stage }}:   {{counterStateRev}}</h2>
            <h2 v-else-if="stage==='Принято'">{{ stage }}:   {{counterStateAppr}}</h2>
            <h2 v-else-if="stage==='Приостановлено'">{{ stage }}:   {{counterStateHold}}</h2>
            <h2 v-else-if="stage==='Закрыто'">{{ stage }}:   {{counterStateClose}}</h2>
        </div>
        <div v-for="block in blocks" :slot="block.id">
						<div id = "tick" @dblclick="showTicket(block)" v-if="block.visib">
            <div>
            {{ block.title }}
            </div>
            <hr>
            <div style = "text-align: center;" v-if="block.prior==='1'">
            Приоритет: <input type="text" :value="block.prior" readonly style = "width: 1.5em; background: red;" class = "prInput">
            </div>
            <div style = "text-align: center;" v-else-if="block.prior==='2'">
            Приоритет: <input type="text" :value="block.prior" readonly style = "width: 1.5em; background: yellow;" class = "prInput">
            </div>
            <div style = "text-align: center;" v-else-if="block.prior==='3'">
            Приоритет: <input type="text" :value="block.prior" readonly style = "width: 1.5em; background: green;" class = "prInput">
            </div>
            <div style = "text-align: center;">
            Ответственный:
						<input type="text" :value="block.ansigned" readonly size = "12" class = "prInput" style = "background: red;"v-if="block.ansigned==='Назначить'">
            <input type="text" :value="block.ansigned" readonly size = "12" class = "prInput" v-if="block.ansigned!=='Назначить'">
            </div>
						</div>
        </div>
        </kanban-board>
				<sTicket :mTShow="showTick" :itemTicket="dataForShow" :users="gUsers" ref="sTick" @getActive="getActiveState"></sTicket>
    </div>
</template>


<script>
import Vue from 'vue'
import vueKanban from 'vue-kanban'
import showTicketM from './modalForms/mShowTicket'
import store from '../../Store/index.js'

Vue.use(vueKanban)

export default {
  data () {
    return {
			gUsers: [],
      stages: ['Новые', 'В_работе', 'Проверка', 'Принято', 'Приостановлено', 'Закрыто'],
      blocks: [],
			flagUpdate: false,
			showTick: false,
			dataForShow: {}
    }
  },
  methods: {
		// Флаг для отображения модального окна
		getActiveState(state) {
			console.log("> start getActiveState");
			if (state) {
				this.showTick = false;
			}
		},
		// Просмотр карточки
		showTicket(dataTick) {
			this.showTick =! this.showTick;
			this.dataForShow = dataTick;
		},
		// Перемещение блока
		updateBlock(id, status) {
				this.blocks.find(b => b.id === Number(id)).status = status;
				this.blocks.find(b => b.id === Number(id)).ansigned = 'Назначить';
				this.$store.commit ('setBlockTickets', this.blocks);
				this.flagUpdate = true;
		}
  },
	computed: {
		// Счётчики задач
		counterStateNew: function () {
			let counter = this.blocks.filter(x => x.status === 'Новые' && x.visib===true);
			let counterAct = counter.filter(y => y.ansigned !== 'Назначить');
			return(counterAct.length + '/' + counter.length);
		},
		counterStateWork: function () {
			let counter = this.blocks.filter(x => x.status === 'В_работе' && x.visib===true);
			let counterAct = counter.filter(y => y.ansigned !== 'Назначить');
			return(counterAct.length + '/' + counter.length);
		},
		counterStateRev: function () {
			let counter = this.blocks.filter(x => x.status === 'Проверка' && x.visib===true);
			let counterAct = counter.filter(y => y.ansigned !== 'Назначить');
			return(counterAct.length + '/' + counter.length);
		},
		counterStateAppr: function () {
			let counter = this.blocks.filter(x => x.status === 'Принято' && x.visib===true);
			let counterAct = counter.filter(y => y.ansigned !== 'Назначить');
			return(counterAct.length + '/' + counter.length);
		},
		counterStateHold: function () {
			let counter = this.blocks.filter(x => x.status === 'Приостановлено' && x.visib===true);
			let counterAct = counter.filter(y => y.ansigned !== 'Назначить');
			return(counterAct.length + '/' + counter.length);
		},
		counterStateClose: function () {
			let counter = this.blocks.filter(x => x.status === 'Закрыто' && x.visib===true);
			let counterAct = counter.filter(y => y.ansigned !== 'Назначить');
			return(counterAct.length + '/' + counter.length);
		},
		allCount: function () {
			let counter = this.blocks.filter(x => x.visib===true).length;
			return(counter);
		},
		allNoAns: function () {
			let counter = this.blocks.filter(y => y.ansigned === 'Назначить' && y.visib===true).length;
			return(counter);
		},
		needUp: function () {
			if (this.$store.state.rerend){
			return('')
			}
		}
	},
	mounted() {
		this.gUsers = this.$store.getters.getUsers;
		this.blocks = JSON.parse(JSON.stringify(this.$store.getters.getTickets));
	},
	updated() {
		console.log("> start updated");
		if (this.$store.state.rerend) {
		this.gUsers = this.$store.getters.getUsers;
		this.blocks = JSON.parse(JSON.stringify(this.$store.getters.getTickets));
			console.log("> run updated", this.blocks);
			this.flagUpdate = false;
			this.$store.commit ('setRerendFalse');
		}
	}
}

Vue.component('sTicket', showTicketM)
</script>

<style lang="scss">

$ease-out: all .3s cubic-bezier(0.23, 1, 0.32, 1);
$new: rgb(214, 68, 251);
$in-progress: #2A92BF;
$needs-review: rgb(184, 149, 23);
$approved: #00B961;
$on-hold: #FB7D44;
$closed: rgb(107, 11, 11);

* {
	box-sizing: border-box;
}

body {
	background: #33363D;
	color: white;
	font-family: 'Lato';
	font-weight: 300;
	line-height: 1.5;
	-webkit-font-smoothing: antialiased;
}

ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

.drag-container {
	max-width: 1200px;
	min-width: 1000px;
	margin: 20px auto;
}

.drag-list {
	display: flex;
	align-items: flex-start;
	
	@media (max-width: 1200px) {
		display: block;
	}
}

.drag-column {
	flex: 1;
	margin: 0 10px;
	position: relative;
	background: rgba(black, 0.2);
	overflow: hidden;
	
	@media (max-width: 690px) {
		margin-bottom: 30px;
	}
	
	h2 {
		font-size: 0.8rem;
		margin: 0;
		text-transform: uppercase;
		font-weight: 600;
	}
	
	&-Новые {
		.drag-column-header,
		.is-moved,
		.drag-options {
			background: $new;
		}
	}

	&-Приостановлено {
		.drag-column-header,
		.is-moved,
		.drag-options {
			background: $on-hold;
		}
	}
	
	&-В_работе {
		.drag-column-header,
		.is-moved,
		.drag-options {
			background: $in-progress;
		}
	}
	
	&-Проверка {
		.drag-column-header,
		.is-moved,
		.drag-options{
			background: $needs-review;
		}
	}
	
	&-Принято {
		.drag-column-header,
		.is-moved,
		.drag-options {
			background: $approved;
		}
	}
	
	&-Закрыто {
		.drag-column-header,
		.is-moved,
		.drag-options {
			background: $closed;
		}
	}
}

.drag-column-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
}

.drag-inner-list {
	min-height: 50px;
}

.drag-item {
	margin: 10px;
	height: 170px;
	background: rgba(black, 0.4);
	transition: $ease-out;
	text-align: center;
	
	&.is-moving {
		transform: scale(1.5);
		background: rgba(black, 0.8);
	}
	
}

.drag-header-more {
	cursor: pointer;
}

.drag-options {
	position: absolute;
	top: 44px;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 10px;
	transform: translateX(100%);
	opacity: 0;
	transition: $ease-out;
	
	&.active {
		transform: translateX(0);
		opacity: 1;
	}
	
	&-label {
		display: block;
		margin: 0 0 5px 0;
		
		input {
			opacity: 0.6;
		}
		
		span {
			display: inline-block;
			font-size: 0.9rem;
			font-weight: 400;
			margin-left: 5px;
		}
	}
}

/* Dragula CSS  */

.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
	list-style-type: none;
}

.gu-hide {
  display: none !important;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.gu-transit {
  opacity: 0.2;
}


.section {
	padding: 20px;
	text-align: center;
	
	a {
		color: white;
		text-decoration: none;
		font-weight: 300;
	}
	
	h4 {
		font-weight: 400;
		a {
			font-weight: 600;
		}
	}
}

.prInput {
    border-radius: 9px;
    border: 3px solid rgba(0, 0, 0, 0.925);
    outline: none;
    background: rgba(221, 228, 253, 0.925);
    text-align: center;
    height: 1.5em;
}

.titleHeadProj {
  font-size: 2em;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
</style>
