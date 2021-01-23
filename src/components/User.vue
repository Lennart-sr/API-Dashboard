<template>
  <div class="content">
    <div class="top">
      <h1>Suas informações</h1>
      <!-- <span>Edite suas informações e tenha um resumo sobre o status da API</span> -->
    </div>
    <div class="account">
      <h2>Conta</h2>
      <input type="text" name="user" id="user" v-model="user.user">
      <input type="text" name="cnpj" id="cnpj" v-model="user.cnpj" disabled>
    </div>
    <div class="plan">
      <div>
        <small>PLANO</small>
        <span>{{user.plan.type}}</span>
      </div>
      <div>
        <small>LIMITE</small>
        <span>{{user.plan.max}}</span>
      </div>
    </div>
    <div class="requests" v-if="cData.thisMonth">
      <h2>Pedidos</h2>
      <div>
        <div>
          <h3>Neste mês</h3>
          <span><b>{{cData.thisMonth.requests | format}}</b> Pedidos</span>
          <span><b>{{cData.thisMonth.errors | format}}</b> Falhas</span>
        </div>
        <div>
          <h3>No ano</h3>
          <span><b>{{cData.entire.requests | format}}</b> Pedidos</span>
          <span><b>{{cData.entire.errors | format}}</b> Falhas</span>
        </div>
      </div>
      <div class="payment">
        <h2>
          Pagamento
        </h2>
        <div>
          <div>
            <small>Preço/QR</small>
            <span>R$ {{user.plan.price}}</span>
          </div>
          <div>
            <small><b>Você pagará</b></small>
            <span><b>{{cData.thisMonth.requests | format}}x R$ {{user.plan.price}}</b></span>
          </div>
          <div>
            <small>Total</small>
            <span>R$ {{user.plan.price * cData.thisMonth.requests | format}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import analysticsGraph from "@/mixins/analysticsGraph.js";

export default {
  name: 'Account',
  mixins: [analysticsGraph],
  filters: {
    format(number){
      return new Intl.NumberFormat().format(number)
    }
  },
  computed: {
    ...mapState(['user', 'api'])
  }
}
</script>

<style scoped>
.content {
	margin: auto;
	border-radius: 10px;
	display: grid;
	grid-template-areas: "top top" "account plan" "requests requests";
	gap: 10px;
	width: calc(60% + 100px);
	max-width: 730px;
}

.content span {
	font-size: 1rem;
}

.content b {
	text-transform: uppercase;
}

.content input {
	padding: 6px;
	border: 1px solid #3131311c;
	border-radius: 5px;
	background-color: transparent;
}

.content input:focus {
	background-color: var(--background-primary);
	color: var(--background-secondary);
	font-weight: bold;
}

.account, .plan, .requests {
	box-shadow: var(--default-shadow);
	border-radius: 10px;
	padding: 20px;
	display: grid;
	gap: 10px;
}

.top {
	grid-area: top;
	margin-bottom: 30px;
}

.top h1 {
	font-size: x-large;
}

.top span {
	margin: 10px;
  margin-left: 0;
	display: block;
	font-size: smaller !important;
}

.account {
  grid-area: account;
}

.plan {
	grid-area: plan;
	background-color: var(--background-primary);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0;
	gap: 0;
	text-align: center;
	overflow: hidden;
}

.plan span {
  text-transform: uppercase;
}

.plan div {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.plan div:first-child {
	color: var(--background-secondary);
}

.plan div:last-child {
  background-color: var(--background-secondary);
}

.plan small {
	position: relative;
	left: -25%;
	top: -32%;
	font-size: x-small;
}

.content h2 {
	font-size: medium;
}

.content h3 {
	font-size: x-small;
}

.requests {
	grid-area: requests;
	display: grid;
	gap: 10px;
}

.requests > div {
	display: flex;
	justify-content: center;
	gap: 70px;
	margin-top: 10px;
}

.requests > div div {
	display: grid;
	gap: 10px;
}

.payment {
	flex-direction: column;
	gap: 20px !important;
	margin-top: 40px !important;
}

.payment > div {
	align-self: center;
  width: 50%;
}

.payment > div div {
	display: flex;
	justify-content: space-between;
	align-content: center;
}

.payment b {
  text-transform: none;
}

.payment > div div:nth-child(2) {
	margin: 9px 0 9px 0;
	border: 1px solid #18181830;
	border-left: none;
	border-right: none;
	padding: 10px 0 10px 0;
}

@media(max-width: 724px) {
  .content {
    grid-template-areas: "top top" "account account" "plan plan" "requests requests";
  }

  .plan {
    height: 100px;
  }

  .plan small {
    left: -35%;
    top: -30%;
  }
}
</style>