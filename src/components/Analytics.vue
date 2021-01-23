<template>
  <div class="content">
    <!-- <div class="top">
      <h1>Dashboard</h1>
      <small>Seja bem vindo novamente {{user.user}}</small>
    </div> -->
    <div class="checkOption" v-if="questionOption.active">
      <div>
        <span>Aviso</span>
        <small>Você tem certeza que deseja <b>{{questionOption.message}}</b> essa opção?</small>
      </div>
      <div>
        <button @click="checkOption({ el: $event.target, option: false })">Não</button>
        <button @click="checkOption({ el: $event.target, option: true })">Sim</button>
      </div>
    </div>

    <div class="config">
      <div class="token" @click="copyToken">
        <span>API Token</span>
        <input type="text" v-model="api.token">
      </div>
      <div class="option" v-if="user.plan.max != 'ILIMITADO'">
        <label class="switch">
          <input
            type="checkbox"
            v-model="user.ulimit"
            value="limit"
            id="limit"
            @change="checkOption({ el: $event.target })"
          />
          <span class="slider"></span>
        </label>
        <span>Manter API ativa após ultrapassar o limite.</span>
      </div>
    </div>
    <div class="status" v-if="cData.thisMonth">
      <div class="pedidosBox">
        <span class="material-icons"> trending_up </span>
        <div>
          <span>Pedidos</span>
          <small>{{cData.thisMonth.requests}}/<b>{{user.plan.max}}</b></small>
        </div>
      </div>
      <div class="falhasBox">
        <span class="material-icons"> trending_down </span>
        <div>
          <span>Falhas</span>
          <small>{{cData.thisMonth.errors}}</small>
        </div>
      </div>
      <div class="graph">
        <canvas id="graph"></canvas>
        <span class="material-icons trackChanges" @click="getApi"> update </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import analysticsGraph from "@/mixins/analysticsGraph.js";
import fetchUser from "@/mixins/fetchUser.js";

export default {
  name: 'Analystics',
  data() {
    return {
      questionOption: {
        active: false,
        value: '',
        message: ''
      },
    };
  },
  mixins: [analysticsGraph, fetchUser],
  computed: {
    ...mapState(['user', 'api'])
  },
  methods: {
    checkOption({ el, option }) {
      if(el.checked){
        this.questionOption = {
          active: !this.questionOption.active,
          value: el.value,
          message: 'ATIVAR'
        }
      }else if(el.checked === false){
        this.questionOption = {
          active: !this.questionOption.active,
          value: el.value,
          message: 'DESATIVAR'
        }
      }else if(option){
        this.questionOption.active = !this.questionOption.active;
        this.updateUser()
      }else{
        const input = document.getElementById(this.questionOption.value);
        this.questionOption.active = !this.questionOption.active;
        input.checked = !input.checked
      }
    },
    copyToken(){
      const copyText = document.querySelector(".token input");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");  
    }
  },
  mounted(){
    if(this.cData.thisMonth)
      this.Chart()
  }
};
</script>

<style scoped>

.content {
	display: flex;
	gap: 20px;
	margin: auto;
  flex-direction: column;
}

.graph {
  box-shadow: var(--secondary-shadow);
  border-radius: 15px;
  width: 540px;
  padding: 21px;
  display: flex;
  grid-area: graph;
}

.status {
  display: grid;
  grid-template-areas: "pedidos falhas" "graph graph";
  gap: 20px;
}

.pedidosBox,
.falhasBox {
  box-shadow: var(--secondary-shadow);
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pedidosBox > span,
.falhasBox > span {
  font-size: 40px;
}

.pedidosBox span,
.falhasBox span {
  font-weight: bold;
}

.pedidosBox > div,
.falhasBox > div {
  display: grid;
  text-align: center;
  gap: 3px;
}

.pedidosBox {
  grid-area: pedidos;
  border-left: 3px solid var(--background-primary);
  justify-content: space-around;
}

.falhasBox {
  grid-area: falhas;
  border-left: 3px solid rgb(108, 108, 108);
  justify-content: space-around;
}

.pedidosBox span.material-icons {
	color: var(--background-primary);
}

.falhasBox span.material-icons {
	color: rgb(108, 108, 108);
}

.config {
	box-shadow: var(--secondary-shadow);
	border-radius: 10px;
	padding: 30px;
	display: flex;
	align-items: center;
	flex-direction: column;
}

.option span {
	padding-left: 10px;
	font-size: smaller;
}

.trackChanges {
	position: relative;
	top: -16px;
	right: 7px;
	cursor: pointer;
	height: max-content;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  min-width: 40px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #bbb7b7;
  border-radius: 34px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider::before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 4px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--text-secondary);
}

input:checked + .slider::before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

.checkOption {
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  background-color: var(--background-secondary);
  width: 280px;
  height: 200px;
  box-shadow: var(--default-shadow);
  border-radius: 13px;
  padding: 15px;
  display: grid;
  align-items: center;
  text-align: center;
}

.checkOption span {
  font-weight: bold;
  font-size: larger;
}

.checkOption small {
  display: block;
  padding-top: 8px;
}

.checkOption button {
  background-color: transparent;
  border: 1px solid var(--background-tertiary);
  color: var(--background-tertiary);
  padding: 10px 35px 10px 35px;
  border-radius: 33px;
  margin: 8px;
  margin-top: 0;
  margin-bottom: 0;
  font-weight: bold;
  cursor: pointer;
}

.checkOption button:last-child {
  background-color: red;
  color: white;
  border-color: red;
}

.option {
	display: flex;
	gap: 7px;
	align-items: center;
}

.token {
	display: flex;
	flex-direction: column;
	width: -moz-available;
	padding: 10px;
	border-radius: 5px;
}

.token input {
	padding: 7px;
	border: 1px solid #e3e3e3;
	border-radius: 5px;
	margin: 10px 0px 10px 0px;
	text-overflow: ellipsis;
	overflow: hidden;
}

.token span, .plan span {
	font-weight: bold;
	font-size: smaller;
}

@media(max-width: 724px){
  .content {
    margin: 0;
  }

  .trackChanges element {
    right: 0;
    top: 0;
  }

  .graph {
    width: 100%;
  }

  #graph {
    max-width: 100%;
    width: 100vw !important;
  }
}

@media (max-width: 1023px) {
  .content {
    height: 100vh;
    justify-content: center;
  }

}
</style>