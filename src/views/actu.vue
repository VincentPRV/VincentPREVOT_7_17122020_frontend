<template>
  <div v-if="userConnected" class="actu">
    <Header />
    <h1>VOUS ETES SUR ACTU</h1>
    <div v-if="userConnected">TEST 1 - 2 TEST</div>
    <div v-else>OUPS OUPS OUPS</div>
  </div>
  <div v-else>
    <router-link to="/"
      >Merci de vous connecter pour naviguer sur Groupomania
    </router-link>
  </div>
</template>

<script>
import Header from "@/components/header.vue";

export default {
  name: "Actu",
  components: {
    Header,
  },
  props: {},

  data: () => {
    return {
      userConnected: sessionStorage.getItem("userConnected"),
    };
  },

  methods: {},

  mounted: () => {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
