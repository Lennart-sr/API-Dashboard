<template>
  <div class="container">
    <transition mode="out-in">

      <div class="logBox" key=1 v-if="registred">
        <div class="messageBox">
          <h1>Bem vindo de volta!</h1>
          <small>Para fazer o login, insira suas informações abaixo</small>
        </div>
        <div class="logInputs">
          <input type="text" name="cnpj" id="cnpj" placeholder="CNPJ" maxlength="14" minlength="14" v-model="tempUser.cnpj">
          <input type="password" name="password" id="password" placeholder="Senha" v-model="tempUser.password">
        </div>
        <div class="logButtons">
          <small @click="registred = !registred">Cadastrar-se</small>
          <button @click="getUser">Login</button>
        </div>
      </div>

      <div class="logBox" key=2 v-else>
        <div class="messageBox">
          <h1>Crie uma conta</h1>
          <small>Insira seus dados pessoais e comece a jornada conosco</small>
        </div>
        <div class="logInputs">
          <input type="text" name="username" id="username" placeholder="Usuário" v-model="tempUser.user">
          <input type="number" name="cnpj" id="cnpj" placeholder="CNPJ" maxlength="14" minlength="14" v-model="tempUser.cnpj">
          <input type="password" name="password" id="password" placeholder="Senha" v-model="tempUser.password">
        </div>
        <div class="logButtons">
          <small @click="registred = !registred">Fazer login</small>
          <button @click="createUser">Cadastrar</button>
        </div>
      </div>
    </transition>
    <div class="imageBox"></div>

  </div>
</template>

<script>
import fetchUser from '@/mixins/fetchUser.js';

export default {
  name: 'Authenticate',
  mixins: [fetchUser]
}
</script>

<style scoped>
.container {
	display: flex;
	flex-basis: content;
	box-shadow: var(--default-shadow);
	background: var(--background-primary);
	border-radius: 10px;
	overflow: hidden;
	height: 80%;
	transform: translate(0, 0);
	margin: auto;
}

.container img {
	width: 400px;
}

.messageBox {
	color: var(--text-primary);
	text-align: center;
}

.logBox {
	width: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 25px;
	gap: 70px;
	background-color: var(--background-primary);
}

.messageBox h1 {
	margin: 5px;
  margin-bottom: 10px;
}

.messageBox small {
	font-size: initial;
	color: var(--default-subtitle);
}

.logInputs input {
	background-color: transparent;
	transition: all 0.3s;
	padding: 15px;
	width: -moz-available;
	border-radius: 5px;
	color: var(--text-primary);
	border: 1px solid white;
	-webkit-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.logInputs input:nth-child(2) {
	margin-top: 20px;
	margin-bottom: 20px;
}

.logInputs input[type=password] {
  margin-bottom: 0;
}

.logInputs input:focus, .logButtons button:hover {
  background-color: var(--background-secondary);
  color: var(--text-secondary);
  font-weight: bold;
}

.logButtons {
	color: var(--text-primary);
	text-align: center;
}

.logButtons button {
	border: 1px solid white;
	background-color: transparent;
	border-radius: 30px;
	padding: 10px 75px 10px 75px;
	cursor: pointer;
	transition: all 0.3s;
	display: block;
	margin-top: 10px;
	color: var(--text-primary);
}

.logButtons small {
  cursor: pointer;
}

.imageBox {
	background-image: url(../assets/pablita-522.png);
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	background-color: var(--background-secondary);
	width: 400px;
	border: 20px solid var(--background-secondary);
}

.v-enter,
.v-leave-to {
  transform: translate3d(0,-20px,0);
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all .3s;
}

@media (max-width: 724px) {
  .container {
    height: auto;
    flex-direction: column-reverse;
  }

  .imageBox {
    height: 200px;
  }

  .logBox {
    gap: 50px;
  }
}

</style>