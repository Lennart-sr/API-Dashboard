<template>
  <main id="app">
		<Nav></Nav>
    <router-view/>
  </main>
</template>

<script>

export default {
	components: {
		Nav: () => import('@/components/Nav.vue')
	}
}

</script>
<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: Comfortaa, sans-serif;
	scrollbar-width: thin;
	scrollbar-color: #1818182b #fff0;
	list-style-type: none;
}

:root {
	--default-shadow: 0 0 30px #c5c5c587;
	--secondary-shadow: 0 0 15px #e9e9e9;
	--background-primary: #ff6c33;
	--background-secondary: white;
	--background-tertiary: #181818;
	--text-primary: white;
	--text-secondary: #ff6c33;
	--default-subtitle: #f7f7f7;
	--warning: #fb8c00;
	--notification: #2196f3;
}

body {
	height: 100vh;
}

#app {
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	min-height: 100vh;
}

.alert {
	color: var(--background-secondary);
	margin-top: 4px;
	display: block;
}

.loading {
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  display: flex;
  margin: 0;
  padding: 0;
}

.loading li {
  list-style: none;
  width: 40px;
  height: 40px;
  background: var(--background-primary);
  border-radius: 50%;
  animation: ani 1.6s ease-in-out infinite;
}

.loading li:nth-child(1){
  animation-delay: -1.4s;
}

.loading li:nth-child(2){
  animation-delay: -1.2s;
}

.loading li:nth-child(3){
  animation-delay: -1s;
}

.loading li:nth-child(4){
  animation-delay: -0.8s;
}

@keyframes ani {
  0%, 40%, 100% {
    transform: scale(0.2);
  }
  20% {
    transform: scale(0.6);
  }
}

.v-enter,
.v-leave-to {
  transform: translate3d(-20px, 0, 0);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

@media (max-width: 724px) {
	#app {
		flex-direction: column;
	}
}

</style>
