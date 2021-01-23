<template>
  <div class="content">
    <div class="top">
      <h1>Avisos</h1>
      <!-- <span>Aqui estarão todos os avisos e mensagens recebidas</span> -->
    </div>
    <ul class="warnings">
      <li 
        v-for="{ description, title } in user.warnings" 
        :key="description"
        :class="title.toLowerCase() == 'aviso' ? 'warning' : 'notification'"
      >
        <span class="material-icons">
          warning
        </span>
        <p>{{ description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Warnings",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped>
.content {
  margin: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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

.warnings {
	display: grid;
	gap: 10px;
}

.warnings li {
	box-shadow: var(--default-shadow);
	border-radius: 10px;
	padding: 20px;
	border-bottom: 3px solid black;
	display: flex;
	gap: 14px;
	align-items: baseline;
}

.warning span {
	color: var(--warning);
}

.warning {
  border-color: var(--warning) !important;
}

.notification span {
  color: var(--notification);
}

.notification {
  border-color: var(--notification) !important;
}

.warnings p {
	font-size: 0.9rem;
	color: #171717;
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

@media (max-width: 724px) {
}
</style>