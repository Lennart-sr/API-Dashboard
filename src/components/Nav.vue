<template>
  <nav class="contracted" v-if="user.cnpj">
    <span class="material-icons menuBtn" @click="anim"
      >keyboard_arrow_right</span
    >
    <router-link to="/">
      <span class="material-icons">home</span>
      <small style="display: none">Home</small>
    </router-link>
    <router-link to="/dashboard">
      <span class="material-icons">analytics</span>
      <small style="display: none">Dashboard</small>
    </router-link>
    <router-link :to="{ name: 'User' }">
      <span class="material-icons">face</span>
      <small style="display: none">Usuário</small>
    </router-link>
    <router-link :to="{ name: 'Warnings' }">
      <span class="material-icons">info</span>
      <small style="display: none">Avisos</small>
    </router-link>
  </nav>
  <nav class="contracted" v-else>
    <span class="material-icons menuBtn" @click="anim"
      >keyboard_arrow_right</span
    >
    <router-link to="/">
      <span class="material-icons">home</span>
      <small style="display: none">Home</small>
    </router-link>
    <router-link to="/dashboard">
      <span class="material-icons">analytics</span>
      <small style="display: none">Dashboard</small>
    </router-link>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Nav",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    anim() {
      const buttons = document.querySelectorAll("nav small");
      const nav = document.querySelector("nav");
      const menuBtn = document.querySelector(".menuBtn");

      if (nav.classList.contains("contracted")) {
        buttons.forEach((r) => (r.style.display = "block"));
        menuBtn.innerHTML = "keyboard_arrow_left";

        setTimeout(() => {
          nav.classList.remove("contracted");
        }, 100);
      } else {
        nav.classList.add("contracted");
        menuBtn.innerHTML = "keyboard_arrow_right";

        setTimeout(() => {
          buttons.forEach((r) => (r.style.display = "none"));
        }, 800);
      }
    },
  },
};
</script>

<style scoped>

nav {
	padding: 10px;
	display: flex;
	flex-direction: column;
	background-color: var(--background-primary);
	justify-content: center;
	gap: 40px;
	max-width: 200px;
	transition: max-width 0.7s ease-in-out;
}

nav a {
	color: var(--text-primary);
	text-decoration: none;
	padding: 5px;
	display: flex;
	align-items: center;
	gap: 7px;
	overflow: hidden;
}

nav small {
  font-size: 0.9em;
}

nav > div:first-child {
  padding: 8px;
  color: white;
  font-size: smaller;
}

.menuBtn {
  color: var(--background-secondary);
  position: absolute;
	cursor: pointer;
  top: 15px;
}

.active, nav a:hover {
	background-color: var(--background-secondary);
	color: var(--background-primary);
	border-radius: 10px;
}

.contracted .active, .contracted a:hover {
  padding: 5px 3px 5px 3px;
}

.contracted {
  max-width: 50px;
}

@media (max-width: 724px) {
  nav {
    flex-direction: row-reverse;
    gap: 30px;
		max-width: 100%;
  }

  .contracted {
    max-width: 100%;
    max-height: 50px;
  }

  .contracted span {
    display: block !important;
  }

  .menuBtn {
    top: 12px;
    left: 0px;
  }

  nav > a span {
    display: none !important;
  }
}
</style>