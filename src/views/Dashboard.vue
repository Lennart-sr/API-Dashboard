<template>
  <Authenticate v-if="!user.cnpj"></Authenticate>
  <div v-else-if="user.cnpj && !api.token">
    <ul class="loading">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import Authenticate from "@/components/Authenticate.vue";
import { mapState } from "vuex";

export default {
  name: 'Dashboard',
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['user', 'api'])
  },
  components: {
    Authenticate,
  }
};
</script>